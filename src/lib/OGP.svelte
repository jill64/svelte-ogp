<script>
  import { page } from '$app/stores'
  import { SvelteHTML } from '@jill64/svelte-html'
  import { store } from './store'
  import { serialize } from './utils/serialize'

  // https://ogp.me

  export let prefix = 'og: https://ogp.me/ns#'

  // https://ogp.me/#metadata

  /** The title of your object as it should appear within the graph */
  /** @type {string} */
  export let title

  /**
   * The type of your object.
   * Depending on the type you specify, other properties may also be required.
   * @see https://ogp.me/#types
   * @default 'website'
   */
  export let type = 'website'

  /** An image URL which should represent your object within the graph. */
  /** @type {string} */
  export let image

  /**
   * The canonical URL of your object that will be used as its permanent ID in the graph.
   * @default $page.url.href
   */
  /** @type {string | undefined} */
  export let url = undefined

  // https://ogp.me/#optional

  /** A one to two sentence description of your object. */
  /** @type {string} */
  export let description

  /** If your object is part of a larger web site, the name which should be displayed for the overall site.  */
  /** @type {string} */
  export let site_name

  // Twitter Cards
  // https://developer.twitter.com/en/docs/tweets/optimize-with-cards/guides/getting-started

  /**
   * The card type, which will be one of “summary”, “summary_large_image”, “app”, or “player”.
   * @default 'summary_large_image'
   */
  /** @type {'summary' | 'summary_large_image' | 'app' | 'player'} */
  export let twitter_card = 'summary_large_image'

  /** "@username" for the website used in the card footer. */
  /** @type {`@${string}` | undefined} */
  export let twitter_site = undefined

  /** "@username" for the content creator / author. */
  /** @type {`@${string}` | undefined} */
  export let twitter_creator = undefined

  /** Custom properties */
  /** @type {{
    og?: Record<string, string>
  } & Record<string, string>} */
  export let custom_properties = {}

  /** Custom names */
  /** @type {{
    twitter?: Record<string, string>
  } & Record<string, string>} */
  export let custom_names = {}

  $: $store = {
    prefix
  }

  $: properties = {
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
  }

  $: names = {
    ...custom_names,
    twitter: {
      card: twitter_card,
      site: twitter_site,
      creator: twitter_creator,
      ...custom_names.twitter
    }
  }
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
