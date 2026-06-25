export type ContactField =
  | 'name'
  | 'email'
  | 'company'
  | 'eventType'
  | 'date'
  | 'location'
  | 'guestCount'
  | 'budget'
  | 'message'

export type ContactFormInput = {
  name: string | number | null | undefined
  email: string | number | null | undefined
  company: string | number | null | undefined
  eventType: string | number | null | undefined
  date: string | number | null | undefined
  location: string | number | null | undefined
  guestCount: string | number | null | undefined
  budget: string | number | null | undefined
  message: string | number | null | undefined
  website?: string | number | null | undefined
}

export type ContactFormState = {
  name: string
  email: string
  company: string
  eventType: string
  date: string
  location: string
  guestCount: string
  budget: string
  message: string
  website: string
}

export type ContactErrors = Record<ContactField | 'website', boolean>
