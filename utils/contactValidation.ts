export type ContactValidationInput = {
  name: string
  email: string
  message: string
  consent: boolean
}

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function getContactErrors(input: ContactValidationInput) {
  return {
    name: input.name.trim().length === 0,
    email: !emailPattern.test(input.email.trim()),
    message: input.message.trim().length < 10,
    consent: !input.consent
  }
}

export function isContactValid(input: ContactValidationInput) {
  return !Object.values(getContactErrors(input)).some(Boolean)
}
