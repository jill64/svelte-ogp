import { expect, test } from '@playwright/test'

test('smoke', async ({ page }) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: '@jill64/svelte-ogp' })
  ).toBeVisible()

  expect(await page.locator('html').getAttribute('prefix')).toBe(
    'og: https://ogp.me/ns#'
  )

  const { origin } = new URL(page.url())

  expect(
    await page.locator('meta[property="og:type"]').getAttribute('content')
  ).toBe('website')

  expect(
    await page.locator('meta[property="og:url"]').getAttribute('content')
  ).toBe(`${origin}/`)

  expect(
    await page.locator('meta[property="og:title"]').getAttribute('content')
  ).toBe('@jill64/svelte-ogp')

  expect(
    await page.locator('meta[property="og:site_name"]').getAttribute('content')
  ).toBe('@jill64/svelte-ogp')

  expect(
    await page
      .locator('meta[property="og:description"]')
      .getAttribute('content')
  ).toBe('🖼️ Quick OGP configuration for SvelteKit')

  expect(
    (
      await page.locator('meta[property="og:image"]').getAttribute('content')
    )?.match(/https:\/\/opengraph.githubassets.com\/(\w*)\/jill64\/svelte-ogp/)
      ?.length
  ).toBeTruthy()

  await page.goto('/test')

  await expect(
    page.getByRole('heading', { name: 'This is Test Page' })
  ).toBeVisible()

  expect(
    await page.locator('meta[property="og:url"]').getAttribute('content')
  ).toBe(`${origin}/test`)
})
