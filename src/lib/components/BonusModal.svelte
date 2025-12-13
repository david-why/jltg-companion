<script lang="ts">
  import { addTimerBonus } from '$lib/game.svelte'
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

  let duration = $state(15)

  const toggle = () => (isOpen = !isOpen)

  const onconfirm = () => {
    try {
      addTimerBonus(duration)
    } catch (e) {
      console.error('Error drawing cards', e)
      alert(e)
    }
    isOpen = false
  }
</script>

<Modal {isOpen} {toggle}>
  <ModalHeader>Add a timer bonus</ModalHeader>
  <ModalBody>
    <Form>
      <FormGroup floating label="Duration (in minutes)">
        <Input type="number" bind:value={duration} min={1} />
      </FormGroup>
    </Form>
  </ModalBody>
  <ModalFooter>
    <Button color="primary" onclick={onconfirm}>Add bonus</Button>
    <Button color="secondary" onclick={toggle}>Cancel</Button>
  </ModalFooter>
</Modal>
