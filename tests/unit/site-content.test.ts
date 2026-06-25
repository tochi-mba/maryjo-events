import { describe, expect, it } from 'vitest'
import { brand, homepageSections, navigation, processSteps, services } from '../../data/site'

describe('brand content', () => {
  it('keeps the Mary-Jo core brand tokens intact', () => {
    expect(brand.tagline).toBe('Your event, thoughtfully planned.')
    expect(brand.colours.berry).toBe('#3d1a2e')
    expect(brand.colours.fuchsia).toBe('#c24d7e')
    expect(brand.serviceArea).toBe('Global')
  })

  it('has enough launch content for a complete homepage', () => {
    expect(services).toHaveLength(3)
    expect(processSteps).toHaveLength(4)
    expect(homepageSections.services).toBe(false)
    expect(homepageSections.approach).toBe(false)
    expect(homepageSections.about).toBe(false)
    expect(homepageSections.proof).toBe(false)
    expect(navigation).toContainEqual({ label: 'Services', href: '#event-fit' })
    expect(new Set(navigation.map((item) => item.href)).size).toBe(navigation.length)
    expect(navigation.map((item) => String(item.href))).not.toEqual(
      expect.arrayContaining(['#approach', '#about', '#proof', '#faq'])
    )
  })
})
