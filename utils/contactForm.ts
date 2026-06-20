import type { ContactField, ContactFormState } from '~/types/contact'

export const contactFieldMessages: Record<ContactField, string> = {
  name: 'Add the name Mary-Jo should reply to.',
  email: 'Use an email address Mary-Jo can reply to.',
  eventType: 'Choose the option that is closest to your event.',
  date: 'Pick the likely event date. It can be approximate for now.',
  location: 'Add the town, city, venue, or region if you know it.',
  guestCount: 'Use numbers only, even if it is an estimate.',
  message: 'Share at least 20 characters about what you need. You have up to 800.',
  consent: 'Confirm that Mary-Jo can use these details to reply.'
}

export const contactRequiredFields = Object.keys(contactFieldMessages) as ContactField[]

export const eventTypeOptions = [
  'Conference',
  'Leadership retreat',
  'Award night',
  'Product launch',
  'Team away day',
  'Networking evening'
] as const

export const budgetOptions = ['Under 5k', '5k to 15k', '15k to 30k', '30k plus'] as const

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
    consent: false,
    website: ''
  }
}
