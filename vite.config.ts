import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [sveltekit()],
  test: {
    include: ['**/*.test.ts']
  },
  ssr: {
    noExternal: ['@jill64/sentry-sveltekit-cloudflare']
  },
  server: {
    fs: {
      allow: ['.']
    }
  }
})
