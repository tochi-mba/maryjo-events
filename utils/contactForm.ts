import type { ContactField, ContactFormState } from '~/types/contact'

export const contactFieldMessages: Record<ContactField, string> = {
  name: 'Add the name Mary-Jo should reply to.',
  email: 'Use an email address Mary-Jo can reply to.',
  company: 'Add the company or organisation connected to the event.',
  eventType: 'Choose the option that is closest to your event.',
  date: 'Pick the likely event date. It can be approximate for now.',
  location: 'Add the town, city, venue, or region if you know it.',
  guestCount: 'Use numbers only, even if it is an estimate.',
  budget: 'Enter an estimated budget amount in GBP, using numbers only.',
  message: 'Share at least 20 characters about what you need. You have up to 800.'
}

export const contactRequiredFields = Object.keys(contactFieldMessages) as ContactField[]

export const eventTypeOptions = [
  'Award night',
  'Product launch',
  'Team away day',
] as const

export function createContactFormState(): ContactFormState {
  return {
    name: '',
    email: '',
    company: '',
    eventType: '',
    date: '',
    location: '',
    guestCount: '',
    budget: '',
    message: '',
    website: ''
  }
}
