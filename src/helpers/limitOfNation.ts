import { ISquad } from '../types/competition'

export function limitOfNation(nationality: string, team: ISquad[]) {
  return team.filter(player => player.nationality === nationality).length === 4
}
