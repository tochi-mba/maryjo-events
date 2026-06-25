import { describe, expect, it } from 'vitest'
import { getContactErrors, isContactValid } from '../../utils/contactValidation'

describe('contact validation', () => {
  it('requires all visible fields', () => {
    expect(
      getContactErrors({
        name: '',
        email: 'not-an-email',
        company: '',
        eventType: '',
        date: '',
        location: '',
        guestCount: '',
        budget: '',
        message: 'Too short'
      })
    ).toEqual({
      name: true,
      email: true,
      company: true,
      eventType: true,
      date: true,
      location: true,
      guestCount: true,
      budget: true,
      message: true,
      website: false
    })
  })

  it('accepts a complete enquiry', () => {
    expect(
      isContactValid({
        name: 'Ava',
        email: 'ava@example.com',
        company: 'Ava Studio',
        eventType: 'Product launch',
        date: '2099-06-19',
        location: 'London',
        guestCount: '80',
        budget: '5000',
        message: 'I need help planning a leadership retreat.',
        website: ''
      })
    ).toBe(true)
  })

  it('rejects honeypot submissions', () => {
    expect(
      isContactValid({
        name: 'Ava',
        email: 'ava@example.com',
        company: 'Ava Studio',
        eventType: 'Product launch',
        date: '2099-06-19',
        location: 'London',
        guestCount: '80',
        budget: '5000',
        message: 'I need help planning a product launch for around 80 guests.',
        website: 'https://spam.example'
      })
    ).toBe(false)
  })
})
