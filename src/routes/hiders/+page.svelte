<script lang="ts">
  import { Button } from '@sveltestrap/sveltestrap'

  import { resolve } from '$app/paths'
  import GameCard from '$lib/components/GameCard.svelte'
  import {
    discardCard,
    drawCards,
    expandHand,
    game,
    keepCard,
    useCard,
  } from '$lib/game.svelte'
  import DrawModal from '$lib/components/DrawModal.svelte'
  import GameStatus from '$lib/components/GameStatus.svelte'
  import GameLog from '$lib/components/GameLog.svelte'

  let drawModalOpen = $state(false)
</script>

<h1>Hider <a href={resolve('/')} class="fs-5 ms-4">&lt; Back</a></h1>

<GameStatus hider />

<hr />

<h2>Draw cards</h2>

<div class="d-flex gap-2 flex-wrap">
  <Button disabled={!!game.waiting} onclick={() => drawCards(3, 1)}>D3P1</Button>
  <Button disabled={!!game.waiting} onclick={() => drawCards(2, 1)}>D2P1</Button>
  <Button disabled={!!game.waiting} onclick={() => drawCards(4, 2)}>D4P2</Button>
  <Button disabled={!!game.waiting} onclick={() => drawCards(1, 1)}>Draw 1</Button>
  <Button disabled={!!game.waiting} onclick={() => (drawModalOpen = true)}>Other...</Button>
  <Button onclick={() => expandHand(1)}>Expand hand</Button>
</div>

{#if game.waiting}
  <h3 class="mt-3">Drawn cards (keep {game.waiting.keep})</h3>
  <div class="d-flex gap-4 flex-wrap">
    {#each game.waiting.cards as cardId (cardId)}
      <GameCard id={cardId} canDiscard={false} use="Keep" onuse={() => keepCard(cardId)} />
    {/each}
  </div>
{/if}

<hr />

<h2>Your hand ({game.hand.length}/{game.handLimit})</h2>

<div class="d-flex gap-4 flex-wrap">
  {#each game.hand as cardId (cardId)}
    <GameCard id={cardId} ondiscard={() => discardCard(cardId)} onuse={() => useCard(cardId)} />
  {/each}
</div>
{#if !game.hand.length}
  <div>No cards in your hand.</div>
{/if}

<hr />

<GameLog />

<DrawModal bind:isOpen={drawModalOpen} />
