import { description, name } from '../../package.json'

export const code = (url: URL) => ({
  svelte: /* html */ `
<!-- +layout.svelte -->
<script>
  import { OGP } from '@jill64/svelte-ogp'
</script>

<OGP
  title="${name}"
  description="${description}"
  site_name="${name}"
  image="/og-image.png"
/>
`.trim(),

  hook: `
// hooks.server.js
export { attach as handle } from '@jill64/svelte-ogp'
`.trim(),

  html: /* html */ `
<html prefix="og: https://ogp.me/ns#">
  <head>
    <meta property="og:title" content="${name}">
    <meta property="og:type" content="website">
    <meta property="og:image" content="${url.origin}/og-image.png">
    <meta property="og:url" content="${url.href}">
    <meta property="og:description" content="${description}">
    <meta property="og:site_name" content="${name}">
    <meta name="twitter:card" content="summary_large_image">
    <!-- ... -->
  </head>
  <!-- ... -->
</html>
`.trim()
})
