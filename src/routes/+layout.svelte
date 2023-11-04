<script lang="ts">
  import { OGP } from '$lib'
</script>

<OGP
  title="Title | Site-Name"
  site_name="Site-Name"
  description="Description"
  image="https://example.com/og-image.png"
/>
<slot />

<style>
  :global(body) {
    font-family: sans-serif;
  }
  @media (prefers-color-scheme: dark) {
    :global(body) {
      background-color: #222;
      color: #eee;
    }
  }
</style>
