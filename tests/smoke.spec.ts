import { expect, test } from '@playwright/test'

test('smoke', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: '@jill64/svelte-ogp' })
  ).toBeVisible()

  expect(await page.locator('html').getAttribute('prefix')).toBe(
    'og: https://ogp.me/ns#'
  )

  expect(
    await page.locator('meta[property="og:type"]').getAttribute('content')
  ).toBe('website')

  expect(
    await page.locator('meta[property="og:url"]').getAttribute('content')
  ).toBe('http://localhost:4173/')

  expect(
    await page.locator('meta[property="og:title"]').getAttribute('content')
  ).toBe('Title | Site-Name')

  expect(
    await page.locator('meta[property="og:site_name"]').getAttribute('content')
  ).toBe('Site-Name')

  expect(
    await page
      .locator('meta[property="og:description"]')
      .getAttribute('content')
  ).toBe('Description')

  expect(
    await page.locator('meta[property="og:image"]').getAttribute('content')
  ).toBe('https://example.com/og-image.png')

  await page.goto('/test')

  await expect(
    page.getByRole('heading', { name: 'This is Test Page' })
  ).toBeVisible()

  expect(
    await page.locator('meta[property="og:url"]').getAttribute('content')
  ).toBe('http://localhost:4173/test')
})
