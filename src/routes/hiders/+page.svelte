<script>
  import { resolve } from '$app/paths'
  import { game } from '$lib/store.svelte'
  import { Button } from '@sveltestrap/sveltestrap'
</script>

<h1>Hiders <a href={resolve('/')} class="fs-5 ms-4">&lt; Back</a></h1>

<Button onclick={() => $game.handLimit++}>a button</Button>

{JSON.stringify($game)}
