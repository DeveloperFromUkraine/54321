import { ISquad } from '../types/competition'

export const countOfPositionInTeam = (squad: ISquad[], position: string, numberPositions: number): boolean => {
  if (position === 'Coach') {
    return squad.filter(player => player.position === position).length === numberPositions
  } else {
    return squad.filter(player => player.position === position).length >= numberPositions
  }
}
