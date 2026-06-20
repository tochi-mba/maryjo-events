var FIELD_MAP = {
  name: { title: 'Name', required: true, types: ['TEXT'] },
  email: { title: 'Email', required: true, types: ['TEXT'] },
  company: { title: 'Company', required: false, types: ['TEXT'] },
  eventType: { title: 'Event type', required: true, types: ['LIST', 'MULTIPLE_CHOICE'] },
  date: { title: 'Approximate date', required: true, types: ['DATE'] },
  location: { title: 'Location', required: true, types: ['TEXT'] },
  guestCount: { title: 'Guest count', required: true, types: ['TEXT'] },
  budget: { title: 'Budget range', required: false, types: ['LIST', 'MULTIPLE_CHOICE'] },
  message: { title: 'Tell me what you need', required: true, types: ['PARAGRAPH_TEXT'] },
  consent: { title: 'Consent', required: true, types: ['CHECKBOX', 'TEXT'] }
}

var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
var GUEST_COUNT_PATTERN = /^[1-9]\d*$/
var MINIMUM_MESSAGE_LENGTH = 20
var MAXIMUM_MESSAGE_LENGTH = 800

function doPost(event) {
  try {
    var payload = parsePayload(event)
    var diagnostic = payload.diagnostic === 'json'

    if (text(payload.website)) {
      return renderFailure('Your enquiry could not be submitted.', diagnostic)
    }

    var validationErrors = getContactErrors(payload)
    if (validationErrors.length) {
      return renderFailure(
        'Please go back and check the required enquiry details.',
        diagnostic,
        { validationErrors: validationErrors }
      )
    }

    var settings = getSettings()
    var form = FormApp.openById(settings.FORM_ID)
    submitGoogleFormResponse(form, payload)
    sendNotificationEmail(settings.NOTIFICATION_EMAIL, payload)

    if (diagnostic) {
      return renderJson({
        ok: true,
        message: 'Smoke test submitted.',
        thankYouUrl: settings.THANK_YOU_URL,
        notificationEmail: settings.NOTIFICATION_EMAIL
      })
    }

    return renderRedirect(settings.THANK_YOU_URL)
  } catch (error) {
    console.error(error && error.stack ? error.stack : error)
    return renderFailure(
      'The enquiry service is not configured correctly yet.',
      event && event.parameter && event.parameter.diagnostic === 'json',
      { error: String(error && error.message ? error.message : error) }
    )
  }
}

function parsePayload(event) {
  var payload = {}

  if (event && event.parameter) {
    Object.keys(event.parameter).forEach(function (key) {
      payload[key] = event.parameter[key]
    })
  }

  return payload
}

function getSettings() {
  var properties = PropertiesService.getScriptProperties().getProperties()
  var missing = ['FORM_ID', 'NOTIFICATION_EMAIL', 'THANK_YOU_URL'].filter(function (key) {
    return !text(properties[key])
  })

  if (missing.length) {
    throw new Error('Missing script properties: ' + missing.join(', '))
  }

  return properties
}

function getContactErrors(input) {
  var errors = []
  var values = normalizedPayload(input)

  if (!values.name) errors.push('name')
  if (!EMAIL_PATTERN.test(values.email)) errors.push('email')
  if (!values.eventType) errors.push('eventType')
  if (!values.date || isPastDate(values.date)) errors.push('date')
  if (!values.location) errors.push('location')
  if (!GUEST_COUNT_PATTERN.test(values.guestCount)) errors.push('guestCount')
  if (values.message.length < MINIMUM_MESSAGE_LENGTH || values.message.length > MAXIMUM_MESSAGE_LENGTH) {
    errors.push('message')
  }
  if (!hasConsent(input.consent)) errors.push('consent')

  return errors
}

function normalizedPayload(input) {
  return {
    name: text(input.name),
    email: text(input.email),
    company: text(input.company),
    eventType: text(input.eventType),
    date: text(input.date),
    location: text(input.location),
    guestCount: text(input.guestCount),
    budget: text(input.budget),
    message: text(input.message),
    consent: hasConsent(input.consent) ? 'Yes' : ''
  }
}

function submitGoogleFormResponse(form, input) {
  var values = normalizedPayload(input)
  var itemsByTitle = getItemsByTitle(form)
  var response = form.createResponse()

  Object.keys(FIELD_MAP).forEach(function (fieldName) {
    var config = FIELD_MAP[fieldName]
    var item = itemsByTitle[config.title]

    if (!item) {
      throw new Error('Google Form is missing question: ' + config.title)
    }

    var itemType = String(item.getType())
    if (config.types.indexOf(itemType) === -1) {
      throw new Error('Google Form question "' + config.title + '" has unsupported type: ' + itemType)
    }

    var value = values[fieldName]
    if (!value && !config.required) {
      return
    }

    response.withItemResponse(createItemResponse(item, itemType, value))
  })

  response.submit()
}

function getItemsByTitle(form) {
  var itemsByTitle = {}

  form.getItems().forEach(function (item) {
    var title = item.getTitle()
    if (title) {
      itemsByTitle[title] = item
    }
  })

  return itemsByTitle
}

function createItemResponse(item, itemType, value) {
  if (itemType === String(FormApp.ItemType.TEXT)) {
    return item.asTextItem().createResponse(value)
  }

  if (itemType === String(FormApp.ItemType.PARAGRAPH_TEXT)) {
    return item.asParagraphTextItem().createResponse(value)
  }

  if (itemType === String(FormApp.ItemType.DATE)) {
    return item.asDateItem().createResponse(parseDate(value))
  }

  if (itemType === String(FormApp.ItemType.LIST)) {
    var listItem = item.asListItem()
    assertChoiceExists(item.getTitle(), value, listItem.getChoices())
    return listItem.createResponse(value)
  }

  if (itemType === String(FormApp.ItemType.MULTIPLE_CHOICE)) {
    var multipleChoiceItem = item.asMultipleChoiceItem()
    assertChoiceExists(item.getTitle(), value, multipleChoiceItem.getChoices())
    return multipleChoiceItem.createResponse(value)
  }

  if (itemType === String(FormApp.ItemType.CHECKBOX)) {
    var choices = item.asCheckboxItem().getChoices()
    if (!choices.length) {
      throw new Error('Consent checkbox question needs at least one choice.')
    }
    return item.asCheckboxItem().createResponse([choices[0].getValue()])
  }

  throw new Error('Unsupported Google Form item type: ' + itemType)
}

function sendNotificationEmail(recipient, input) {
  var values = normalizedPayload(input)
  var subject = 'New Mary-Jo event enquiry from ' + values.name
  var body = [
    'New enquiry from maryjo-events.com',
    '',
    'Name: ' + values.name,
    'Email: ' + values.email,
    'Company: ' + optional(values.company),
    'Event type: ' + values.eventType,
    'Approximate date: ' + values.date,
    'Location: ' + values.location,
    'Guest count: ' + values.guestCount,
    'Budget range: ' + optional(values.budget),
    '',
    'Message:',
    values.message,
    '',
    'Consent: ' + values.consent
  ].join('\n')

  MailApp.sendEmail({
    to: recipient,
    replyTo: values.email,
    subject: subject,
    body: body,
    name: 'Mary-Jo Events Website'
  })
}

function renderRedirect(url) {
  var safeUrl = escapeHtml(url)
  return HtmlService.createHtmlOutput(
    '<!doctype html><html><head>' +
      '<meta charset="utf-8">' +
      '<meta http-equiv="refresh" content="0; url=' + safeUrl + '">' +
      '<script>window.location.replace(' + JSON.stringify(url) + ');</script>' +
      '</head><body><p>Thank you. Redirecting...</p></body></html>'
  )
}

function renderError(message) {
  return HtmlService.createHtmlOutput(
    '<!doctype html><html><head><meta charset="utf-8"></head><body><p>' +
      escapeHtml(message) +
      '</p></body></html>'
  )
}

function renderFailure(message, diagnostic, details) {
  if (diagnostic) {
    return renderJson(Object.assign({ ok: false, message: message }, details || {}))
  }

  return renderError(message)
}

function renderJson(data) {
  return ContentService.createTextOutput(JSON.stringify(data, null, 2)).setMimeType(ContentService.MimeType.JSON)
}

function parseDate(value) {
  var parts = text(value).split('-')
  if (parts.length !== 3) {
    throw new Error('Invalid date: ' + value)
  }

  return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]))
}

function isPastDate(value) {
  var date = parseDate(value)
  var today = new Date()
  today.setHours(0, 0, 0, 0)
  return date < today
}

function hasConsent(value) {
  return value === true || value === 'true' || value === 'on' || value === 'Yes'
}

function text(value) {
  return String(value == null ? '' : value).trim()
}

function optional(value) {
  return value || 'Not provided'
}

function assertChoiceExists(title, value, choices) {
  var allowedValues = choices.map(function (choice) {
    return choice.getValue()
  })

  if (allowedValues.indexOf(value) === -1) {
    throw new Error(
      'Google Form question "' +
        title +
        '" does not have a choice for "' +
        value +
        '". Allowed choices: ' +
        allowedValues.join(', ')
    )
  }
}

function escapeHtml(value) {
  return text(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
