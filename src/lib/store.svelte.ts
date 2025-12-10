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
  }
}

export const game = localStorageStore('jltg-game', generateNewGame())
