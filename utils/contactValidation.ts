import type { ContactErrors, ContactFormInput } from '~/types/contact'

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

export function getContactErrors(input: ContactFormInput): ContactErrors {
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

export function isContactValid(input: ContactFormInput) {
  return !Object.values(getContactErrors(input)).some(Boolean)
}
