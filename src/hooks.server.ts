import { serverInit } from '@jill64/sentry-sveltekit-cloudflare'
import { attach } from './lib/attach'

const { onHandle, onError } = serverInit(
  'https://4b26d4bf27aac206e2bfe1064cdc94f6@o4505814639312896.ingest.sentry.io/4506204750807040'
)

export const handle = onHandle(attach)
export const handleError = onError()
