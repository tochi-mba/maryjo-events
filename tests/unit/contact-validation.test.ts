import { describe, expect, it } from 'vitest'
import { getContactErrors, isContactValid } from '../../utils/contactValidation'

describe('contact validation', () => {
  it('requires name, valid email, useful message, and consent', () => {
    expect(
      getContactErrors({
        name: '',
        email: 'not-an-email',
        message: 'Too short',
        consent: false
      })
    ).toEqual({
      name: true,
      email: true,
      message: true,
      consent: true
    })
  })

  it('accepts a complete enquiry', () => {
    expect(
      isContactValid({
        name: 'Ava',
        email: 'ava@example.com',
        message: 'I need help planning a leadership retreat.',
        consent: true
      })
    ).toBe(true)
  })
})
