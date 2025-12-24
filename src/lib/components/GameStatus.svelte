<script lang="ts">
  import { game, pauseTimer, unpauseTimer } from '$lib/game.svelte'
  import { Button } from '@sveltestrap/sveltestrap'
  import { onMount } from 'svelte'
  import { SvelteDate } from 'svelte/reactivity'
  import ResetModal from './ResetModal.svelte'
  import BonusModal from './BonusModal.svelte'

  interface Props {
    hider?: boolean
  }

  const { hider = false }: Props = $props()

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

  function toggleTimer() {
    if (game.pauseTime) unpauseTimer()
    else pauseTimer()
  }

  let resetModalOpen = $state(false)
  let bonusModalOpen = $state(false)
</script>

<ul>
  <li>Game started: {startDate}</li>
  <li>Hider timer: {timerFormatted}</li>
  <li>Game type: {game.spec.name}</li>
</ul>

<div class="d-flex gap-2 flex-wrap">
  <Button size="sm" color="danger" onclick={() => (resetModalOpen = true)}>Reset game</Button>
  {#if hider}
    <Button size="sm" color="primary" onclick={() => (bonusModalOpen = true)}>Timer bonus</Button>
    <Button size="sm" onclick={() => toggleTimer()}>
      {game.pauseTime ? 'Start' : 'Pause'} timer
    </Button>
  {/if}
</div>

<ResetModal bind:isOpen={resetModalOpen} />
<BonusModal bind:isOpen={bonusModalOpen} />
