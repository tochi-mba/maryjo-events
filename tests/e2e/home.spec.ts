import { expect, test } from '@playwright/test'

test('homepage has core content and a usable contact form', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('heading', { name: 'Your event, thoughtfully planned.' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Tell me about your event' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Events with the details looked after' })).toBeVisible()

  await page.getByRole('link', { name: 'Tell me about your event' }).click()
  await expect(page.getByRole('heading', { name: 'Got an event in mind?' })).toBeVisible()

  const submit = page.getByRole('button', { name: 'Send enquiry' })
  await expect(submit).toBeDisabled()
  await page.getByLabel('Name').fill('Ava')
  await page.getByLabel('Email').fill('ava@example.com')
  await page.getByLabel('Tell me what you need').fill('I need help planning a product launch.')
  await page.getByLabel(/happy for Mary-Jo/).check()
  await expect(submit).toBeEnabled()
})

test('supporting routes render', async ({ page }) => {
  await page.goto('/privacy')
  await expect(page.getByRole('heading', { name: 'Plain-language privacy note' })).toBeVisible()

  await page.goto('/thank-you')
  await expect(page.getByRole('heading', { name: 'I have your note.' })).toBeVisible()
})
