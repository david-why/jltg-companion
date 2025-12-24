interface GameSpec {
  id: string
  name: string
  deck: GameCard[]
  questions: GameQuestion[]
}

interface CurseCard {
  id: number
  type: 'curse'
  title: string
  description: string
  cost: string
}

interface PowerupCard {
  id: number
  type: 'powerup'
  title: string
  description: string
}

interface TimeCard {
  id: number
  type: 'time'
  title: string
  duration: number
}

type GameCard = CurseCard | PowerupCard | TimeCard

interface GameQuestion {
  id: number
  name: string
  question: string
  draw: number
  keep: number
  time: number // minutes
  options: QuestionOption[]
}

interface QuestionOption {
  id: number
  text: string
  description?: string
}
