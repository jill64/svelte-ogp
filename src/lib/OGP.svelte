<script lang="ts">
  import { page } from '$app/stores'
  import { SvelteHTML } from '@jill64/svelte-html'
  import { store } from './store.svelte'
  import { serialize } from './utils/serialize'

  let {
    prefix = 'og: https://ogp.me/ns#',
    title,
    type = 'website',
    image,
    url = undefined,
    description,
    site_name,
    twitter_card = 'summary_large_image',
    twitter_site = undefined,
    twitter_creator = undefined,
    custom_properties = {},
    custom_names = {}
  }: {
    // https://ogp.me
    prefix: string

    // https://ogp.me/#metadata

    /** The title of your object as it should appear within the graph */
    title: string

    /**
     * The type of your object.
     * Depending on the type you specify, other properties may also be required.
     * @see https://ogp.me/#types
     * @default 'website'
     */
    type?: string

    /** An image URL which should represent your object within the graph. */
    image: string

    /**
     * The canonical URL of your object that will be used as its permanent ID in the graph.
     * @default $page.url.href
     */
    url?: string | undefined

    // https://ogp.me/#optional
    /** A one to two sentence description of your object. */
    description: string

    /** If your object is part of a larger web site, the name which should be displayed for the overall site.  */
    site_name: string

    // Twitter Cards
    // https://developer.twitter.com/en/docs/tweets/optimize-with-cards/guides/getting-started

    /**
     * The card type, which will be one of “summary”, “summary_large_image”, “app”, or “player”.
     * @default 'summary_large_image'
     */
    twitter_card?: 'summary' | 'summary_large_image' | 'app' | 'player'

    /** "@username" for the website used in the card footer. */
    twitter_site?: `@${string}` | undefined

    /** "@username" for the content creator / author. */
    twitter_creator?: `@${string}` | undefined

    /** Custom properties */
    custom_properties?: {
      og?: Record<string, string>
    } & Record<string, string>

    /** Custom names */
    custom_names?: {
      twitter?: Record<string, string>
    } & Record<string, string>
  } = $props()

  $effect(() => {
    store.prefix = prefix
  })

  let properties = $derived({
    ...custom_properties,
    og: {
      title,
      type,
      image: (image.startsWith('/') ? $page.url.origin : '') + image,
      url: url || $page.url.href,
      description,
      site_name,
      ...custom_properties.og
    }
  })

  let names = $derived({
    ...custom_names,
    twitter: {
      card: twitter_card,
      site: twitter_site,
      creator: twitter_creator,
      ...custom_names.twitter
    }
  })
</script>

<SvelteHTML {prefix} />
<svelte:head>
  {#each serialize(properties) as [property, content]}
    <meta {property} {content} />
  {/each}
  {#each serialize(names) as [name, content]}
    <meta {name} {content} />
  {/each}
</svelte:head>
