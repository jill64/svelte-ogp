import { attach } from '$lib'
import { init } from '@jill64/sentry-sveltekit-cloudflare/server'
import { onRender } from '@jill64/svelte-dark-theme'
import { sequence } from '@sveltejs/kit/hooks'

const { onHandle, onError } = init(
  'https://4b26d4bf27aac206e2bfe1064cdc94f6@o4505814639312896.ingest.sentry.io/4506204750807040'
)

export const handle = onHandle(sequence(attach, onRender()))
export const handleError = onError()
