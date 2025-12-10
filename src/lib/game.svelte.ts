import { browser } from '$app/environment'
import specs from './specs'

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

export function discardCard(id: number) {
  const index = game.hand.indexOf(id)
  if (index < 0) {
    throw new Error(`Card with ID ${id} is not in the hand`)
  }
  game.hand.splice(index, 1)
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
  return leftCards[Math.trunc(Math.random() * leftCards.length)]
}

export function drawCards(draw: number, pick: number) {
  if (pick > draw) {
    throw new Error('Cannot pick more cards than draw')
  }
  if (pick === draw) {
    if (game.hand.length + draw > game.handLimit) {
      throw new Error(`No space to draw ${draw} cards`)
    }
    for (let i = 0; i < draw; i++) {
      game.hand.push(drawCard().id)
    }
  } else {
    game.waiting = { cards: [], pick }
    for (let i = 0; i < draw; i++) {
      const card = drawCard()
      game.waiting.cards.push(card.id)
    }
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
  if (!--game.waiting.pick) {
    game.waiting = null
  }
}
