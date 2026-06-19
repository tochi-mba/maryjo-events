import { expect, test } from '@playwright/test'

test('homepage has core content and a usable contact form', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'Your event, thoughtfully planned.' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Tell me about your event' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Events I would love to help with' })).toBeVisible()
  await expect(page.getByRole('img', { name: /Warm corporate event planning scene/i })).toBeVisible()

  await page.getByRole('link', { name: 'Tell me about your event' }).click()
  await expect(page.getByRole('heading', { name: 'Got an event in mind?' })).toBeVisible()

  const submit = page.getByRole('button', { name: 'Send enquiry' })
  await expect(submit).toBeDisabled()
  await page.getByLabel('Name').fill('Ava')
  await page.getByLabel('Email').fill('ava@example.com')
  await page.getByLabel('Event type').selectOption('Product launch')
  await page.getByLabel('Approximate date').fill('2099-06-19')
  await page.getByLabel('Location').fill('London')
  await page.getByLabel('Guest count').fill('80')
  await page.getByLabel('Tell me what you need').fill('I need help planning a product launch for around 80 guests.')
  await page.getByLabel(/happy for Mary-Jo/).check()
  await expect(submit).toBeEnabled()
  await expect(page.getByText(/\/800 characters/)).toBeVisible()
})

test('contact form highlights invalid fields and uses a bottom summary', async ({ page }) => {
  await page.goto('/#contact')

  await page.getByLabel('Name').focus()
  await page.getByLabel('Name').blur()
  await page.getByLabel('Email').fill('not-an-email')
  await page.getByLabel('Email').blur()

  await expect(page.locator('.form-field.is-invalid').filter({ has: page.getByLabel('Name') })).toBeVisible()
  await expect(page.locator('.form-field.is-invalid').filter({ has: page.getByLabel('Email') })).toBeVisible()
  await expect(page.getByText('A few details still need attention:')).toBeVisible()
  await expect(page.locator('#form-errors').getByText('Add the name Mary-Jo should reply to.')).toBeVisible()
})

test('premium interactions work', async ({ page }) => {
  await page.goto('/')

  const menuButton = page.getByRole('button', { name: 'Open menu' })
  if (await menuButton.isVisible()) {
    await menuButton.click()
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeHidden()
    await menuButton.click()
    await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'FAQ' }).click()
  } else {
    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'FAQ' }).click()
  }

  await expect(page.getByRole('heading', { name: 'A few honest answers' })).toBeVisible()
  const firstQuestion = page.getByRole('button', { name: /You are new to the industry/i })
  await expect(firstQuestion).toHaveAttribute('aria-expanded', 'true')
  await firstQuestion.click()
  await expect(firstQuestion).toHaveAttribute('aria-expanded', 'false')
  await firstQuestion.click()
  await expect(firstQuestion).toHaveAttribute('aria-expanded', 'true')
})

test('supporting routes render', async ({ page }) => {
  await page.goto('/privacy')
  await expect(page.getByRole('heading', { name: 'Plain-language privacy note' })).toBeVisible()

  await page.goto('/thank-you')
  await expect(page.getByRole('heading', { name: 'I have your note.' })).toBeVisible()
})
