<script lang="ts">
  import { Button } from '@sveltestrap/sveltestrap'

  import { resolve } from '$app/paths'
  import { game } from '$lib/store.svelte'
  import ResetModal from '$lib/components/ResetModal.svelte'
  import { SvelteDate } from 'svelte/reactivity'
  import { onMount } from 'svelte'
  import GameCard from '$lib/components/GameCard.svelte'

  const startDate = $derived(new Date(game.startTime).toLocaleString())

  let currentDate = new SvelteDate()
  onMount(() => {
    const interval = setInterval(() => {
      currentDate.setTime(Date.now())
    }, 1000)

    return () => clearInterval(interval)
  })

  let resetModalOpen = $state(false)

  function discardCard(id: number) {
    const index = game.hand.indexOf(id)
    if (index >= 0) {
      game.hand.splice(index, 1)
    }
  }
</script>

<h1>Hider <a href={resolve('/')} class="fs-5 ms-4">&lt; Back</a></h1>

<ul>
  <li>Game started: {startDate}</li>
  <li>Game type: {game.spec.name}</li>
</ul>

<div>
  <Button size="sm" color="danger" onclick={() => (resetModalOpen = true)}>Reset game</Button>
</div>

<hr />

<h2 class="mt-2">Your hand</h2>

<div class="d-flex gap-4 flex-wrap">
  {#each game.hand as cardId (cardId)}
    <GameCard id={cardId} ondiscard={() => discardCard(cardId)} />
  {/each}
</div>
{#if !game.hand.length}
  <div>No cards in your hand.</div>
{/if}

<ResetModal bind:isOpen={resetModalOpen}></ResetModal>
