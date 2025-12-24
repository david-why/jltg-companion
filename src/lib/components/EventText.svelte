<script lang="ts">
  import { game } from '$lib/game.svelte'

  const { event }: { event: GameEvent } = $props()

  const date = $derived(new Date(event.time).toLocaleString())

  function findCard(id: number) {
    const card = game.spec.deck.find((c) => c.id === id)
    if (!card) throw new Error(`Card ${id} not found`)
    return card
  }

  function findQuestion(question: number) {
    const q = game.spec.questions.find((q) => q.id === question)
    if (!q) throw new Error(`Question ${question} not found`)
    return q
  }

  function findOption(question: number, option: number) {
    const q = findQuestion(question)
    const opt = q.options.find((opt) => opt.id === option)
    if (!opt) throw new Error(`Question option ${question}.${option} not found`)
    return opt
  }
</script>

<code>{date}</code> -
{#if event.type === 'hider_discard_card'}
  Discarded card <em>{findCard(event.card).title}</em>
{:else if event.type === 'hider_draw_cards'}
  Drawn cards
  {#each event.cards as card, i (card)}
    {#if i > 0},
    {/if} <em>{findCard(card).title}</em>
  {/each}
{:else if event.type === 'hider_keep_card'}
  Kept card <em>{findCard(event.card).title}</em>
{:else if event.type === 'hider_use_card'}
  Used card <em>{findCard(event.card).title}</em>
{:else if event.type === 'hider_timer_bonus'}
  Received a timer bonus of {event.duration} minutes
{:else if event.type === 'hider_pause'}
  Paused the game for {event.duration} minutes
{:else if event.type === 'hider_expand'}
  Expanded hand size by {event.count}
{:else if event.type === 'seeker_ask'}
  Asked question {findQuestion(event.question).name} - {findOption(event.question, event.option)
    .text}
{:else}
  Unknown event: <code>{JSON.stringify(event)}</code>
{/if}
