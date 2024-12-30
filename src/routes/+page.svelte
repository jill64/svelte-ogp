<script lang="ts">
  import { page } from '$app/state'
  import { Highlight, HighlightSvelte } from 'svelte-highlight'
  import { javascript, xml } from 'svelte-highlight/languages'
  import { code } from './code'

  let sample = $derived(code(page.url))
</script>

Open DevTools and make sure OGP is set.

<main>
  <div>
    <Highlight language={javascript} code={sample.hook} />
    <HighlightSvelte code={sample.svelte} />
  </div>
  <section>
    <h2>Converted HTML</h2>
    <Highlight language={xml} code={sample.html} />
  </section>
</main>

<style>
  main {
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 2rem;
  }
  @media (max-width: 1200px) {
    main {
      grid-template-columns: auto;
    }
  }
  div,
  section {
    overflow-x: auto;
  }
</style>
