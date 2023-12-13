import { hooks } from '@jill64/npm-demo-layout'
import { init } from '@jill64/sentry-sveltekit-cloudflare/server'

const { onHandle, onError } = init(
  'https://4b26d4bf27aac206e2bfe1064cdc94f6@o4505814639312896.ingest.sentry.io/4506204750807040'
)

export const handle = onHandle(hooks)
export const handleError = onError()
