<script lang="ts">
  import { game, undoAction } from '$lib/game.svelte'
  import { Button } from '@sveltestrap/sveltestrap'
  import EventText from './EventText.svelte'
</script>

<h2>Game log</h2>

<ul>
  {#each game.events.toSorted((a, b) => b.time - a.time) as event (event.id)}
    <li><EventText {event} /></li>
  {/each}
</ul>

<div>
  <Button size="sm" disabled={!game.events.length} onclick={() => undoAction()}>Undo</Button>
</div>
