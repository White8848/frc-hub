export interface Competition {
  key: string
  name: string
  city: string
  country: string
  startDate: string
  endDate: string
  eventType: number
  year: number
  week?: number
  address?: string
  website?: string
}

export interface Alliance {
  teamKeys: string[]
  score: number
}

export interface Match {
  key: string
  compLevel: 'qm' | 'ef' | 'qf' | 'sf' | 'f'
  matchNumber: number
  setNumber: number
  alliances: {
    red: Alliance
    blue: Alliance
  }
  winningAlliance: 'red' | 'blue' | ''
  time: number
}

export interface Ranking {
  rank: number
  teamKey: string
  wins: number
  losses: number
  ties: number
  qualAverage?: number
  record: {
    wins: number
    losses: number
    ties: number
  }
}

export interface EventRankings {
  rankings: Ranking[]
}
