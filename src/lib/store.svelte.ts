import { browser } from '$app/environment'
import { writable } from 'svelte/store'

export interface Game {
  hand: number[]
  handLimit: number
  usedCards: number[]
}

function localStorageStore<T>(key: string, initialValue: T) {
  let value = initialValue

  if (browser) {
    const stored = localStorage.getItem(key)
    if (stored) {
      value = JSON.parse(stored)
    }
  }

  const store = writable(value)

  if (browser) {
    store.subscribe((value) => {
      localStorage.setItem(key, JSON.stringify(value))
    })
  }

  return store
}

export const initialGame = Object.freeze<Game>({
  // for the hider
  hand: [],
  handLimit: 6,
  usedCards: [],
})

export const game = localStorageStore('jltg-game', { ...initialGame })
