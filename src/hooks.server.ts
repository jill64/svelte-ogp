import { PUBLIC_SENTRY_DSN } from '$env/static/public'
import { serverInit } from '@jill64/sentry-sveltekit-cloudflare'
import { attach } from './lib/attach'

const { onHandle, onError } = serverInit(PUBLIC_SENTRY_DSN)

export const handle = onHandle(attach)
export const handleError = onError()
