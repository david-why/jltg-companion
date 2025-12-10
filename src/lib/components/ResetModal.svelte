<script lang="ts">
  import { game, generateNewGame } from '$lib/game.svelte'
  import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from '@sveltestrap/sveltestrap'

  let { isOpen = $bindable() }: { isOpen: boolean } = $props()

  const toggle = () => (isOpen = !isOpen)

  const onconfirm = () => {
    Object.assign(game, generateNewGame())
    isOpen = false
  }
</script>

<Modal {isOpen} {toggle}>
  <ModalHeader>Reset the game?</ModalHeader>
  <ModalBody>
    This will clear the current game data and immediately start a new one. Your current game will be
    forever gone!
  </ModalBody>
  <ModalFooter>
    <Button color="danger" onclick={onconfirm}>Reset</Button>
    <Button color="secondary" onclick={toggle}>Cancel</Button>
  </ModalFooter>
</Modal>
