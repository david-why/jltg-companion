<script lang="ts">
  import { drawCards } from '$lib/game.svelte'
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

  let draw = $state(2)
  let keep = $state(1)

  const toggle = () => (isOpen = !isOpen)

  const onconfirm = () => {
    try {
      drawCards(draw, keep)
    } catch (e) {
      console.error('Error drawing cards', e)
      alert(e)
    }
    isOpen = false
  }
</script>

<Modal {isOpen} {toggle}>
  <ModalHeader>Draw cards</ModalHeader>
  <ModalBody>
    <Form>
      <FormGroup floating label="Cards to draw">
        <Input type="number" bind:value={draw} min={1} />
      </FormGroup>
      <FormGroup floating label="Cards to keep">
        <Input type="number" bind:value={keep} min={1} />
      </FormGroup>
    </Form>
  </ModalBody>
  <ModalFooter>
    <Button color="primary" onclick={onconfirm}>Draw</Button>
    <Button color="secondary" onclick={toggle}>Cancel</Button>
  </ModalFooter>
</Modal>
