import { transform } from '@jill64/svelte-html'
import type { Handle } from '@sveltejs/kit'
import { get } from 'svelte/store'
import { store } from './store'

export const attach = (({ event, resolve }) =>
  resolve(event, {
    transformPageChunk: transform({
      prefix: get(store).prefix
    })
  })) satisfies Handle
