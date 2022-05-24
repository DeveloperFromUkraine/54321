import { ISquad } from '../types/competition'

export const removePlayerFromTeam = (player: ISquad, team: ISquad[]) => {
  return team.filter(item => item.id !== player.id)
}
