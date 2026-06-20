export type ContactValidationInput = {
  name: string | number | null | undefined
  email: string | number | null | undefined
  eventType: string | number | null | undefined
  date: string | number | null | undefined
  location: string | number | null | undefined
  guestCount: string | number | null | undefined
  message: string | number | null | undefined
  consent: boolean | string | null | undefined
  website?: string | number | null | undefined
}

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const guestCountPattern = /^[1-9]\d*$/
const minimumMessageLength = 20
const maximumMessageLength = 800

function text(value: string | number | null | undefined) {
  return String(value ?? '').trim()
}

function hasConsent(value: boolean | string | null | undefined) {
  return value === true || value === 'true' || value === 'on'
}

function isPastDate(value: string) {
  if (!value) return false

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const selected = new Date(`${value}T00:00:00`)
  return Number.isNaN(selected.getTime()) || selected < today
}

export function getContactErrors(input: ContactValidationInput) {
  const name = text(input.name)
  const email = text(input.email)
  const eventType = text(input.eventType)
  const date = text(input.date)
  const location = text(input.location)
  const guestCount = text(input.guestCount)
  const message = text(input.message)
  const website = text(input.website)

  return {
    name: name.length === 0,
    email: !emailPattern.test(email),
    eventType: eventType.length === 0,
    date: date.length === 0 || isPastDate(date),
    location: location.length === 0,
    guestCount: !guestCountPattern.test(guestCount),
    message: message.length < minimumMessageLength || message.length > maximumMessageLength,
    consent: !hasConsent(input.consent),
    website: website.length > 0
  }
}

export function isContactValid(input: ContactValidationInput) {
  return !Object.values(getContactErrors(input)).some(Boolean)
}
