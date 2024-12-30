import { apply } from '@jill64/svelte-html'
import type { Handle } from '@sveltejs/kit'
import { store } from './store.svelte'

export const attach = (({ event, resolve }) =>
  resolve(event, {
    transformPageChunk: apply({
      prefix: store.prefix
    })
  })) satisfies Handle
