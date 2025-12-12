<script lang="ts">
  import { game, generateNewGame } from '$lib/game.svelte'
  import specs from '$lib/specs'
  import {
    Button,
    Form,
    FormGroup,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
  } from '@sveltestrap/sveltestrap'

  let { isOpen = $bindable() }: { isOpen: boolean } = $props()

  let specId = $state(specs[0].id)

  const toggle = () => (isOpen = !isOpen)

  const onconfirm = () => {
    const spec = specs.find(s => s.id == specId)
    Object.assign(game, generateNewGame(spec))
    isOpen = false
  }
</script>

<Modal {isOpen} {toggle}>
  <ModalHeader>Reset the game?</ModalHeader>
  <ModalBody>
    <p>
      This will clear the current game data and immediately start a new one. Your current game will
      be forever gone!
    </p>
    <Form>
      <FormGroup floating label="Game type">
        <Input bind:value={specId} type="select">
          {#each specs as spec (spec.id)}
            <option value={spec.id}>{spec.name}</option>
          {/each}
        </Input>
      </FormGroup>
    </Form>
  </ModalBody>
  <ModalFooter>
    <Button color="danger" onclick={onconfirm}>Reset</Button>
    <Button color="secondary" onclick={toggle}>Cancel</Button>
  </ModalFooter>
</Modal>
