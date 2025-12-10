<script lang="ts">
  import favicon from '$lib/assets/favicon.svg'
  import { Container } from '@sveltestrap/sveltestrap'

  import '$lib/assets/base.css'

  let { children } = $props()
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<Container class="my-4">
  {@render children()}
</Container>
