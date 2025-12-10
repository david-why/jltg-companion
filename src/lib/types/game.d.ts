interface DrawCardEvent {
  time: number
  type: 'hider_draw_card'
  card: number
}

interface DiscardCardEvent {
  time: number
  type: 'hider_discard_card'
  card: number
}

type HiderEvent = DrawCardEvent | DiscardCardEvent

interface AskEvent {
  time: number
  type: 'seeker_ask'
  question: number
}

type SeekerEvent = AskEvent

type GameEvent = HiderEvent | SeekerEvent

interface Game {
  spec: GameSpec
  startTime: number
  events: GameEvent[]
  // for hiders
  hand: number[]
  handLimit: number
  usedCards: number[]
  waiting: { pick: number; cards: number[] } | null
}
