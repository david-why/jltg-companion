<script lang="ts">
  import { Button } from '@sveltestrap/sveltestrap'

  import { resolve } from '$app/paths'
  import GameCard from '$lib/components/GameCard.svelte'
  import ResetModal from '$lib/components/ResetModal.svelte'
  import {
    discardCard,
    drawCards,
    expandHand,
    game,
    keepCard,
    pauseTimer,
    undoAction,
    unpauseTimer,
    useCard,
  } from '$lib/game.svelte'
  import { onMount } from 'svelte'
  import { SvelteDate } from 'svelte/reactivity'
  import EventText from '$lib/components/EventText.svelte'
  import DrawModal from '$lib/components/DrawModal.svelte'
  import BonusModal from '$lib/components/BonusModal.svelte'

  const startDate = $derived(new Date(game.startTime).toLocaleString())

  let currentDate = new SvelteDate()
  onMount(() => {
    const interval = setInterval(() => {
      currentDate.setTime(Date.now())
    }, 1000)

    return () => clearInterval(interval)
  })

  const timer = $derived(
    (game.pauseTime || currentDate.getTime()) - game.startTime + game.bonus * 60 * 1000,
  )
  const timerFormatted = $derived.by(() => {
    const seconds = Math.floor(timer / 1000) % 60
    const minutes = Math.floor(timer / 60000) % 60
    const hours = Math.floor(timer / 3600000) % 24
    const days = Math.floor(timer / 86400000)
    return `${days}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  })

  let resetModalOpen = $state(false)
  let bonusModalOpen = $state(false)
  let drawModalOpen = $state(false)

  function toggleTimer() {
    if (game.pauseTime) unpauseTimer()
    else pauseTimer()
  }
</script>

<h1>Hider <a href={resolve('/')} class="fs-5 ms-4">&lt; Back</a></h1>

<ul>
  <li>Game started: {startDate}</li>
  <li>Your timer: {timerFormatted}</li>
  <li>Game type: {game.spec.name}</li>
</ul>

<div class="d-flex gap-2">
  <Button size="sm" color="danger" onclick={() => (resetModalOpen = true)}>Reset game</Button>
  <Button size="sm" color="primary" onclick={() => (bonusModalOpen = true)}>Timer bonus</Button>
  <Button size="sm" onclick={() => toggleTimer()}>{game.pauseTime ? 'Start' : 'Pause'} timer</Button
  >
</div>

<hr />

<h2>Draw cards</h2>

<div class="d-flex gap-2">
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

<h2>Game log</h2>

<ul>
  {#each game.events.toSorted((a, b) => b.time - a.time) as event (event.id)}
    <li><EventText {event} /></li>
  {/each}
</ul>

<div>
  <Button size="sm" disabled={!game.events.length} onclick={() => undoAction()}>Undo</Button>
</div>

<ResetModal bind:isOpen={resetModalOpen} />
<DrawModal bind:isOpen={drawModalOpen} />
<BonusModal bind:isOpen={bonusModalOpen} />
