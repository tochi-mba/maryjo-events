<template>
  <form
    class="contact-form"
    :action="formAction"
    method="post"
    novalidate
    @submit="handleSubmit"
  >
    <div class="honeypot-field" aria-hidden="true">
      <label for="website">Website</label>
      <input
        id="website"
        v-model.trim="form.website"
        name="website"
        type="text"
        autocomplete="off"
        tabindex="-1"
      >
    </div>

    <div class="form-grid">
      <div class="form-field" :class="{ 'is-invalid': showError('name') }">
        <div class="field-label">
          <label for="name">Name</label>
          <button v-if="showError('name')" class="field-help" type="button" aria-label="Show field guidance" :data-tooltip="fieldMessages.name">
            <Info :size="15" aria-hidden="true" />
          </button>
        </div>
        <span id="name-guidance" class="sr-only">{{ fieldMessages.name }}</span>
      <input
        id="name"
        v-model.trim="form.name"
        name="name"
        autocomplete="name"
        :aria-invalid="showError('name')"
        aria-describedby="name-guidance"
        @blur="touch('name')"
      >
      </div>

      <div class="form-field" :class="{ 'is-invalid': showError('email') }">
        <div class="field-label">
          <label for="email">Email</label>
          <button v-if="showError('email')" class="field-help" type="button" aria-label="Show field guidance" :data-tooltip="fieldMessages.email">
            <Info :size="15" aria-hidden="true" />
          </button>
        </div>
        <span id="email-guidance" class="sr-only">{{ fieldMessages.email }}</span>
        <input
          id="email"
          v-model.trim="form.email"
          name="email"
          type="email"
        autocomplete="email"
        :aria-invalid="showError('email')"
        aria-describedby="email-guidance"
        @blur="touch('email')"
      >
      </div>

      <div class="form-field" :class="{ 'is-invalid': showError('company') }">
        <div class="field-label">
          <label for="company">Company</label>
          <button v-if="showError('company')" class="field-help" type="button" aria-label="Show field guidance" :data-tooltip="fieldMessages.company">
            <Info :size="15" aria-hidden="true" />
          </button>
        </div>
        <span id="company-guidance" class="sr-only">{{ fieldMessages.company }}</span>
        <input
          id="company"
          v-model.trim="form.company"
          name="company"
          autocomplete="organization"
          :aria-invalid="showError('company')"
          aria-describedby="company-guidance"
          @blur="touch('company')"
        >
      </div>

      <div class="form-field" :class="{ 'is-invalid': showError('eventType') }">
        <div class="field-label">
          <label for="eventType">Event type</label>
          <button v-if="showError('eventType')" class="field-help" type="button" aria-label="Show field guidance" :data-tooltip="fieldMessages.eventType">
            <Info :size="15" aria-hidden="true" />
          </button>
        </div>
        <span id="eventType-guidance" class="sr-only">{{ fieldMessages.eventType }}</span>
        <select
          id="eventType"
          v-model="form.eventType"
          name="eventType"
          :aria-invalid="showError('eventType')"
          aria-describedby="eventType-guidance"
          @blur="touch('eventType')"
        >
          <option value="">Choose the closest fit</option>
          <option v-for="option in eventTypeOptions" :key="option">{{ option }}</option>
        </select>
      </div>

      <div class="form-field" :class="{ 'is-invalid': showError('date') }">
        <div class="field-label">
          <label for="date">Approximate date</label>
          <button v-if="showError('date')" class="field-help" type="button" aria-label="Show field guidance" :data-tooltip="fieldMessages.date">
            <Info :size="15" aria-hidden="true" />
          </button>
        </div>
        <span id="date-guidance" class="sr-only">{{ fieldMessages.date }}</span>
        <input
          id="date"
          v-model="form.date"
          name="date"
          type="date"
          :min="today"
          :aria-invalid="showError('date')"
          aria-describedby="date-guidance"
          @blur="touch('date')"
        >
      </div>

      <div class="form-field" :class="{ 'is-invalid': showError('location') }">
        <div class="field-label">
          <label for="location">Location</label>
          <button v-if="showError('location')" class="field-help" type="button" aria-label="Show field guidance" :data-tooltip="fieldMessages.location">
            <Info :size="15" aria-hidden="true" />
          </button>
        </div>
        <span id="location-guidance" class="sr-only">{{ fieldMessages.location }}</span>
        <input
          id="location"
          v-model.trim="form.location"
          name="location"
          autocomplete="address-level2"
          :aria-invalid="showError('location')"
          aria-describedby="location-guidance"
          @blur="touch('location')"
        >
      </div>

      <div class="form-field" :class="{ 'is-invalid': showError('guestCount') }">
        <div class="field-label">
          <label for="guestCount">Guest count</label>
          <button v-if="showError('guestCount')" class="field-help" type="button" aria-label="Show field guidance" :data-tooltip="fieldMessages.guestCount">
            <Info :size="15" aria-hidden="true" />
          </button>
        </div>
        <span id="guestCount-guidance" class="sr-only">{{ fieldMessages.guestCount }}</span>
        <input
          id="guestCount"
          v-model.trim="form.guestCount"
          name="guestCount"
          type="number"
          min="1"
          step="1"
          inputmode="numeric"
          :aria-invalid="showError('guestCount')"
          aria-describedby="guestCount-guidance"
          @blur="touch('guestCount')"
        >
      </div>

      <div class="form-field" :class="{ 'is-invalid': showError('budget') }">
        <div class="field-label">
          <label for="budget">Budget range</label>
          <button v-if="showError('budget')" class="field-help" type="button" aria-label="Show field guidance" :data-tooltip="fieldMessages.budget">
            <Info :size="15" aria-hidden="true" />
          </button>
        </div>
        <span id="budget-guidance" class="sr-only">{{ fieldMessages.budget }}</span>
        <input
          id="budget"
          v-model.trim="form.budget"
          name="budget"
          type="number"
          min="1"
          step="100"
          inputmode="numeric"
          placeholder="5000"
          :aria-invalid="showError('budget')"
          aria-describedby="budget-guidance"
          @blur="touch('budget')"
        >
      </div>
    </div>

    <div class="form-field message-field" :class="{ 'is-invalid': showError('message') }">
      <div class="field-label">
        <label for="message">Tell me what you need</label>
        <button v-if="showError('message')" class="field-help" type="button" aria-label="Show field guidance" :data-tooltip="fieldMessages.message">
          <Info :size="15" aria-hidden="true" />
        </button>
      </div>
      <span id="message-guidance" class="sr-only">{{ fieldMessages.message }}</span>
      <textarea
        id="message"
        v-model.trim="form.message"
        name="message"
        rows="6"
        maxlength="800"
        :aria-invalid="showError('message')"
        aria-describedby="message-guidance message-count"
        @blur="touch('message')"
      />
      <p id="message-count" class="character-count" aria-live="polite">
        {{ messageLength }}/800 characters
      </p>
    </div>

    <p v-if="submissionError" class="submission-error" role="status" aria-live="polite">
      {{ submissionError }}
    </p>

    <button
      class="button button--primary"
      type="submit"
      :disabled="isSubmitting"
      @pointerdown="touchAllRequiredFields"
      @click="touchAllRequiredFields"
    >
      <Send :size="18" aria-hidden="true" />
      {{ isSubmitting ? 'Sending enquiry...' : 'Send enquiry' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { Info, Send } from 'lucide-vue-next'
import { computed, reactive, ref } from 'vue'
import {
  contactFieldMessages,
  contactRequiredFields,
  createContactFormState,
  eventTypeOptions
} from '~/utils/contactForm'
import { getContactErrors } from '~/utils/contactValidation'

const props = defineProps<{
  formAction: string
  successPath: string
}>()

const form = reactive(createContactFormState())
const isSubmitting = ref(false)
const submissionError = ref('')

const touched = reactive<Record<string, boolean>>({})
const fieldMessages = contactFieldMessages

const errors = computed(() => getContactErrors(form))

const isValid = computed(() => !Object.values(errors.value).some(Boolean))
const messageLength = computed(() => form.message.trim().length)
const today = new Date().toISOString().slice(0, 10)
function touch(field: keyof typeof fieldMessages) {
  touched[field] = true
}

function showError(field: keyof typeof fieldMessages) {
  return touched[field] && errors.value[field]
}

async function handleSubmit(event: SubmitEvent) {
  touchAllRequiredFields()

  if (!isValid.value) {
    event.preventDefault()
    submissionError.value = ''
    return
  }

  event.preventDefault()

  if (isSubmitting.value) {
    return
  }

  const formElement = event.currentTarget
  if (!(formElement instanceof HTMLFormElement)) {
    return
  }

  isSubmitting.value = true
  submissionError.value = ''

  try {
    await fetch(formAction.value, {
      method: 'POST',
      mode: 'no-cors',
      body: formBody(formElement)
    })

    window.location.assign(successPath.value)
  } catch {
    submissionError.value = 'Something went wrong while sending your enquiry. Please try again.'
    isSubmitting.value = false
  }
}

const formAction = computed(() => props.formAction || '/thank-you')
const successPath = computed(() => props.successPath || '/thank-you')

function formBody(formElement: HTMLFormElement) {
  const body = new URLSearchParams()

  new FormData(formElement).forEach((value, key) => {
    body.append(key, String(value))
  })

  return body
}

function touchAllRequiredFields() {
  contactRequiredFields.forEach((field) => {
    touched[field] = true
  })
}
</script>
