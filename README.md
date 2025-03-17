<!----- BEGIN GHOST DOCS HEADER ----->

# @jill64/svelte-ogp


<!----- BEGIN GHOST DOCS BADGES ----->
<a href="https://npmjs.com/package/@jill64/svelte-ogp"><img src="https://img.shields.io/npm/v/@jill64/svelte-ogp" alt="npm-version" /></a> <a href="https://npmjs.com/package/@jill64/svelte-ogp"><img src="https://img.shields.io/npm/l/@jill64/svelte-ogp" alt="npm-license" /></a> <a href="https://npmjs.com/package/@jill64/svelte-ogp"><img src="https://img.shields.io/npm/dm/@jill64/svelte-ogp" alt="npm-download-month" /></a> <a href="https://npmjs.com/package/@jill64/svelte-ogp"><img src="https://img.shields.io/bundlephobia/min/@jill64/svelte-ogp" alt="npm-min-size" /></a> <a href="https://github.com/jill64/svelte-ogp/actions/workflows/ci.yml"><img src="https://github.com/jill64/svelte-ogp/actions/workflows/ci.yml/badge.svg" alt="ci.yml" /></a> <a href="https://svelte-ogp.jill64.dev"><img src="https://img.shields.io/website?up_message=working&down_message=down&url=https%3A%2F%2Fsvelte-ogp.jill64.dev" alt="website" /></a>
<!----- END GHOST DOCS BADGES ----->


🖼️ Quick OGP configuration for SvelteKit

## [Demo](https://svelte-ogp.jill64.dev)

<!----- END GHOST DOCS HEADER ----->

It provides serval typed properties and default values according to [The Open Graph protocol](https://ogp.me) and [Twitter Cards](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/guides/getting-started).

## Quick Example

```svelte
<!-- src/+layout.svelte -->
<OGP
  title="Page Title | Your Site"
  site_name="Your Site"
  description="Page Description"
  image="https://image.example.com/og-image.png"
/>
```

↓

```html
<html prefix="og: https://ogp.me/ns#">
  <head>
    <meta property="og:title" content="Page Title | Your Site" />
    <meta property="og:site_name" content="Your Site" />
    <meta property="og:description" content="Page Description" />
    <meta
      property="og:image"
      content="https://image.example.com/og-image.png"
    />

    <!-- Default Values -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{$page.url.href}" />
    <meta name="twitter:card" content="summary_large_image" />
  </head>
  <!-- ... -->
</html>
```

[Full Type Definition](./src/lib/OGP.svelte)

## SSR

To add a `prefix` attribute to the html delivered by the server, put the following in `hooks.server.js`.

```js
// hooks.server.js
export { attach as handle } from '@jill64/svelte-ogp'
```

## Advanced Properties

The value of `prefix` is bound as an attribute of the `html` tag.  
You can bind it to a `meta` tag by passing the value to `custom_properties` or `custom_names`.

```svelte
<OGP
  prefix="custom: prefix"
  custom_properties={{
    'og:key': 'value'
  }}
  custom_names={{
    'example:foo': 'bar'
  }}
/>
```

↓

```html
<html prefix="custom: prefix">
  <head>
    <meta property="og:key" content="value" />
    <meta property="example:foo" content="bar" />
  </head>
</html>
```

## Structured Properties

In edge cases, multiple additional properties or arrays may be required.  
`custom_properties` and `custom_names` interpret the following structured objects and output them as serialized `meta` tags.

```js
const custom_properties_1 = {
  'og:image:width': 300
}

const custom_properties_2 = {
  og: {
    image: {
      width: 300
    }
  }
}

const custom_properties_3 = {
  og: [
    {
      image: [
        {
          width: [300]
        }
      ]
    }
  ]
}
```

These are all interpreted as follows

```html
<meta property="og:image:width" content="300" />
```

This allows for the following notations

```svelte
<OGP
  custom_properties={{
    og: {
      locale: [
        en_GB,
        {
          alternate: ['fr_FR', 'es_ES']
        }
      ],
      image: [
        {
          '': 'https://example.com/image.jpg',
          width: '300',
          height: '400'
        },
        'https://example.com/image-2.jpg',
        {
          '': 'https://example.com/image-3.jpg',
          height: '1000'
        }
      ]
    }
  }}
/>
```

↓

```html
<meta property="og:locale" content="en_GB" />
<meta property="og:locale:alternate" content="fr_FR" />
<meta property="og:locale:alternate" content="es_ES" />

<meta property="og:image" content="https://example.com/image.jpg" />
<meta property="og:image:width" content="300" />
<meta property="og:image:height" content="400" />

<meta property="og:image" content="https://example.com/image-2.jpg" />

<meta property="og:image" content="https://example.com/image-3.jpg" />
<meta property="og:image:height" content="1000" />
```

<!----- BEGIN GHOST DOCS FOOTER ----->

## License

[MIT](LICENSE)

<!----- END GHOST DOCS FOOTER ----->
