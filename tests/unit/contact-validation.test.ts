import { describe, expect, it } from 'vitest'
import { getContactErrors, isContactValid } from '../../utils/contactValidation'

describe('contact validation', () => {
  it('requires name, valid email, useful message, and consent', () => {
    expect(
      getContactErrors({
        name: '',
        email: 'not-an-email',
        eventType: '',
        date: '',
        location: '',
        guestCount: '',
        message: 'Too short',
        consent: false
      })
    ).toEqual({
      name: true,
      email: true,
      eventType: true,
      date: true,
      location: true,
      guestCount: true,
      message: true,
      consent: true
    })
  })

  it('accepts a complete enquiry', () => {
    expect(
      isContactValid({
        name: 'Ava',
        email: 'ava@example.com',
        eventType: 'Product launch',
        date: '2099-06-19',
        location: 'London',
        guestCount: '80',
        message: 'I need help planning a leadership retreat.',
        consent: true
      })
    ).toBe(true)
  })
})
