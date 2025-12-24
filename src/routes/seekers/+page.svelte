<script lang="ts">
  import { resolve } from '$app/paths'
  import GameLog from '$lib/components/GameLog.svelte'
  import GameStatus from '$lib/components/GameStatus.svelte'
  import { askQuestion, game } from '$lib/game.svelte'
  import { Button, Card, CardBody, CardFooter, CardText, CardTitle } from '@sveltestrap/sveltestrap'

  function getAskCount(question: number, option: number) {
    return game.events.filter(
      (e) => e.type === 'seeker_ask' && e.question === question && e.option === option,
    ).length
  }
</script>

<h1>Seekers <a href={resolve('/')} class="fs-5 ms-4">&lt; Back</a></h1>

<GameStatus />

<hr />

<h2>Questions</h2>
{#each game.spec.questions as question (question.id)}
  <details class="mb-2">
    <summary class="fs-3 fw-medium">{question.name}</summary>
    <p>{question.question}</p>
    <div class="d-flex gap-2 flex-wrap mb-2">
      {#each question.options as option (option.id)}
        <Card style="width: 20em">
          <CardBody>
            <CardTitle>{option.text}</CardTitle>
            <CardText>Asked {getAskCount(question.id, option.id)} times</CardText>
          </CardBody>
          <CardFooter>
            <Button size="sm" onclick={() => askQuestion(question.id, option.id)}>Ask</Button>
          </CardFooter>
        </Card>
      {/each}
    </div>
  </details>
{/each}

<hr />

<GameLog />
