<script lang="ts">
  import { game } from '$lib/game.svelte'
  import { Button, Card, CardBody, CardFooter, CardText, CardTitle } from '@sveltestrap/sveltestrap'

  interface Props {
    id: number
    use?: string
    canDiscard?: boolean
    ondiscard?: () => unknown
    onuse?: () => unknown
  }

  const { id, use = 'Use', canDiscard = true, ondiscard, onuse }: Props = $props()

  const card = $derived(game.spec.deck.find((c) => c.id === id))
  $effect(() => {
    if (!card) {
      throw new Error(`Card with ID ${id} not found in spec ${game.spec.name} (${game.spec.id})`)
    }
  })
</script>

<Card style="width: 15em">
  <CardBody>
    <CardTitle>{card?.title}</CardTitle>
    <CardText>
      {#if card?.type === 'time'}
        <p><em>Time bonus</em></p>
        <p>Grants the hider(s) a bonus of {card.duration} minutes.</p>
      {:else if card?.type === 'curse'}
        <p><em>Curse</em></p>
        <p>{card.description}</p>
        <p><strong>Casting cost</strong>: {card.cost}</p>
      {:else if card?.type === 'powerup'}
        <p><em>Powerup</em></p>
        <p>{card.description}</p>
      {/if}
    </CardText>
  </CardBody>
  <CardFooter>
    {#if canDiscard}
      <Button size="sm" onclick={ondiscard}>Discard</Button>
    {/if}
    <Button size="sm" color="primary" onclick={onuse}>{use}</Button>
  </CardFooter>
</Card>
