interface GameSpec {
  id: string
  name: string
  deck: GameCard[]
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
