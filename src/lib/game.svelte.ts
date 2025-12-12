import { browser } from '$app/environment'
import specs from './specs'
import { generateRandomId } from './utils'

const VERSION = 2

function localStorageStore<T>(key: string, initialValue: T) {
  let value = initialValue

  if (browser) {
    const stored = localStorage.getItem(key)
    if (stored) {
      value = JSON.parse(stored)
    }
  }

  const store = $state(value)

  if (browser) {
    $effect.root(() => {
      $effect(() => {
        localStorage.setItem(key, JSON.stringify(store))
      })
    })
  }

  return store
}

export function generateNewGame(): Game {
  return {
    version: VERSION,
    spec: specs[0]!,
    startTime: Date.now(),
    events: [],
    // for the hider
    hand: [],
    handLimit: 6,
    usedCards: [],
    waiting: null,
  }
}

export const game = localStorageStore('jltg-game', generateNewGame())
$effect.root(() => {
  $effect(() => {
    if (game.version !== VERSION) {
      Object.assign(game, generateNewGame())
    }
  })
})

export function discardCard(id: number) {
  const index = game.hand.indexOf(id)
  if (index < 0) {
    throw new Error(`Card with ID ${id} is not in the hand`)
  }
  game.hand.splice(index, 1)
  addGameEvent({ type: 'hider_discard_card', card: id })
}

export function useCard(id: number) {
  const index = game.hand.indexOf(id)
  if (index < 0) {
    throw new Error(`Card with ID ${id} is not in the hand`)
  }
  game.hand.splice(index, 1)
  addGameEvent({ type: 'hider_use_card', card: id })
}

function getLeftCards() {
  return game.spec.deck.filter(
    (c) =>
      !game.hand.includes(c.id) &&
      !game.waiting?.cards.includes(c.id) &&
      !game.usedCards.includes(c.id),
  )
}

const leftCards = $derived.by(getLeftCards)

function drawCard() {
  if (!leftCards.length) {
    game.usedCards.length = 0
    if (!leftCards.length) {
      throw new Error('Out of cards')
    }
  }
  const card = leftCards[Math.trunc(Math.random() * leftCards.length)]
  return card
}

export function addGameEvent(event: DistributiveOmit<GameEvent, 'id' | 'time'>) {
  game.events.push({ ...event, id: generateRandomId(), time: Date.now() })
}

export function drawCards(draw: number, keep: number) {
  if (draw <= 0 || keep <= 0) {
    throw new Error('Can only draw positive number of cards')
  }
  if (keep > draw) {
    throw new Error('Cannot pick more cards than draw')
  }
  if (keep === draw) {
    if (game.hand.length + draw > game.handLimit) {
      throw new Error(`No space to draw ${draw} cards`)
    }
    const drawn: number[] = []
    for (let i = 0; i < draw; i++) {
      const card = drawCard().id
      drawn.push(card)
      game.hand.push(card)
    }
    addGameEvent({ type: 'hider_draw_cards', cards: drawn, keep })
    for (const card of drawn) {
      addGameEvent({ type: 'hider_keep_card', card })
    }
  } else {
    game.waiting = { cards: [], keep: keep }
    try {
      for (let i = 0; i < draw; i++) {
        const card = drawCard()
        game.waiting.cards.push(card.id)
      }
    } catch (e) {
      game.waiting = null
      throw e
    }
    addGameEvent({ type: 'hider_draw_cards', cards: game.waiting.cards, keep })
  }
}

export function keepCard(id: number) {
  if (!game.waiting) {
    throw new Error('No cards are currently pending')
  }
  const index = game.waiting?.cards.indexOf(id)
  if (index < 0) {
    throw new Error(`Card ${id} is not pending`)
  }
  game.waiting.cards.splice(index, 1)
  game.hand.push(id)
  let discarded: number[] | undefined
  if (!--game.waiting.keep) {
    discarded = game.waiting.cards
    game.waiting = null
  }
  addGameEvent({ type: 'hider_keep_card', card: id, discarded })
}

export function undoAction() {
  const event = game.events.pop()
  if (!event) {
    throw new Error('Cannot undo when there are no events')
  }
  switch (event.type) {
    case 'hider_discard_card':
      game.hand.push(event.card)
      break
    case 'hider_draw_cards':
      // cards always drawn to waiting area and cannot draw when waiting
      // so just clear waiting
      game.waiting = null
      break
    case 'hider_keep_card':
      if (game.waiting) {
        game.waiting.cards.push(event.card)
        game.waiting.keep++
      } else {
        game.waiting = { cards: event.discarded || [], keep: 1 }
        game.waiting.cards.push(event.card)
      }
      if (game.hand.includes(event.card)) {
        game.hand.splice(game.hand.indexOf(event.card), 1)
      }
      break
    case 'hider_use_card':
      game.hand.push(event.card)
      break
    default:
      throw new Error(`Failed to undo unknown event ${event.type}`)
  }
}
