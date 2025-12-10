<script lang="ts">
  import { Button } from '@sveltestrap/sveltestrap'

  import { resolve } from '$app/paths'
  import { game } from '$lib/store.svelte'
  import ResetModal from '$lib/components/ResetModal.svelte'
  import { SvelteDate } from 'svelte/reactivity'
  import { onMount } from 'svelte'

  const startDate = $derived(new Date($game.startTime).toLocaleString())

  let currentDate = new SvelteDate()
  onMount(() => {
    const interval = setInterval(() => {
      currentDate.setTime(Date.now())
    }, 1000)

    return () => clearInterval(interval)
  })

  let resetModalOpen = $state(false)
</script>

<h1>Hider <a href={resolve('/')} class="fs-5 ms-4">&lt; Back</a></h1>

<ul>
  <li>Game started: {startDate}</li>
  <li>Game type: {$game.spec.name}</li>
</ul>

<div>
  <Button color="danger" onclick={() => (resetModalOpen = true)}>Reset game</Button>
</div>

<h2 class="mt-2">Your hand</h2>

<ResetModal bind:isOpen={resetModalOpen}></ResetModal>
