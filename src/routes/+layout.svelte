<script lang="ts">
  import { OGP } from '$lib'
  import { FlipButton, theme, ThemeManager } from '@jill64/svelte-dark-theme'
  import { HighlightSwitcher } from 'svelte-highlight-switcher'
  import { repository } from '../../package.json'
  import GitHubLogo from './GitHubLogo.svelte'

  let { children } = $props()
</script>

<HighlightSwitcher name={theme.isDark ? 'githubDark' : 'github'} />
<ThemeManager />
<OGP
  title="@jill64/svelte-ogp"
  description="🖼️ Quick OGP configuration for SvelteKit"
  site_name="@jill64/svelte-ogp"
  image={repository.image}
/>

<header>
  <hgroup>
    <h1>@jill64/svelte-ogp</h1>
    <p>🖼️ Quick OGP configuration for SvelteKit</p>
  </hgroup>
  <FlipButton />
  <GitHubLogo />
</header>

{@render children()}

<style>
  :global(body) {
    font-family: sans-serif;
    padding: 0 1rem;
  }
  :global(.dark body) {
    background-color: #161616;
    color: whitesmoke;
  }
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }
  hgroup {
    margin-right: auto;
  }
</style>
