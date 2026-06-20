export type ContactField = 'name' | 'email' | 'eventType' | 'date' | 'location' | 'guestCount' | 'message' | 'consent'

export type ContactFormInput = {
  name: string | number | null | undefined
  email: string | number | null | undefined
  company?: string | number | null | undefined
  eventType: string | number | null | undefined
  date: string | number | null | undefined
  location: string | number | null | undefined
  guestCount: string | number | null | undefined
  budget?: string | number | null | undefined
  message: string | number | null | undefined
  consent: boolean | string | null | undefined
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
  consent: boolean
  website: string
}

export type ContactErrors = Record<ContactField | 'website', boolean>
