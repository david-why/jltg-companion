interface BaseEvent {
  id: string
  time: number
  type: string
}

interface DrawCardEvent extends BaseEvent {
  type: 'hider_draw_card'
  card: number
}

interface DiscardCardEvent extends BaseEvent {
  type: 'hider_discard_card'
  card: number
}

interface KeepCardEvent extends BaseEvent {
  type: 'hider_keep_card'
  card: number
}

interface UseCardEvent extends BaseEvent {
  type: 'hider_use_card'
  card: number
}

type HiderEvent = DrawCardEvent | DiscardCardEvent | KeepCardEvent | UseCardEvent

interface AskEvent extends BaseEvent {
  type: 'seeker_ask'
  question: number
}

type SeekerEvent = AskEvent

type GameEvent = HiderEvent | SeekerEvent

interface Game {
  version: number
  spec: GameSpec
  startTime: number
  events: GameEvent[]
  // for hiders
  hand: number[]
  handLimit: number
  usedCards: number[]
  waiting: { pick: number; cards: number[] } | null
}
