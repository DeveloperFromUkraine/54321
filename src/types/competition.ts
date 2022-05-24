export interface ICompetition {
  area: Record<string, unknown>
  code: string
  currentSeason: Record<string, unknown>
  emblem: string
  id: number
  lastUpdate: string
  name: string
  numberOfAvailableSeasons: number
  plan: string
}

export interface ITeam {
  id: number
  crest: string
  name: string
  squad: ISquad[]
}

export interface ISquad {
  dateOfBirth: string
  id: number
  name: string
  nationality: string
  position: string
}
