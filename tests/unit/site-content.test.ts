import { describe, expect, it } from 'vitest'
import { brand, eventTypes, processSteps, services } from '../../data/site'

describe('brand content', () => {
  it('keeps the Mary-Jo core brand tokens intact', () => {
    expect(brand.tagline).toBe('Your event, thoughtfully planned.')
    expect(brand.colours.berry).toBe('#3d1a2e')
    expect(brand.colours.fuchsia).toBe('#c24d7e')
    expect(brand.serviceArea).toBe('UK/Ireland')
  })

  it('has enough launch content for a complete homepage', () => {
    expect(services).toHaveLength(6)
    expect(processSteps).toHaveLength(4)
    expect(eventTypes.length).toBeGreaterThanOrEqual(6)
  })
})
