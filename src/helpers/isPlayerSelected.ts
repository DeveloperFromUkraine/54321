import { ISquad } from '../types/competition'

export const isPlayerSelected = (player: ISquad, team: ISquad[]) => {
  return !!team.find(({ id }) => player.id === id)
}
