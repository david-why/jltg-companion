<script lang="ts">
  import { game } from '$lib/game.svelte'

  const { event }: { event: GameEvent } = $props()

  const date = $derived(new Date(event.time).toLocaleString())

  function findCard(id: number) {
    const card = game.spec.deck.find((c) => c.id === id)
    if (!card) throw new Error(`Card ${id} not found`)
    return card
  }
</script>

{#if event.type === 'hider_discard_card'}
  Discarded card <em>{findCard(event.card).title}</em>
{:else if event.type === 'hider_draw_card'}
  Drawn card <em>{findCard(event.card).title}</em>
{:else if event.type === 'hider_keep_card'}
  Kept card <em>{findCard(event.card).title}</em>
{/if}
at {date}
