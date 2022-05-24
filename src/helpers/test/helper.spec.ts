import { isPlayerSelected } from '../isPlayerSelected'
import { ISquad } from '../../types/competition'
import { limitOfNation } from '../limitOfNation'

describe('helper', () => {
  const player: ISquad = {
    dateOfBirth: '12/05/2001',
    id: 1,
    name: 'Test Test',
    nationality: 'Ukraine',
    position: 'Deff',
  }

  const playerNew: ISquad = {
    dateOfBirth: '12/05/2001',
    id: 11,
    name: 'Test Test',
    nationality: 'Ukraine',
    position: 'Deff',
  }

  const myTeam: ISquad[] = [
    {
      dateOfBirth: '12/05/2011',
      id: 2,
      name: 'Test Test1',
      nationality: 'Ukraine',
      position: 'Deff1',
    },
    {
      dateOfBirth: '12/05/2001',
      id: 1,
      name: 'Test Test',
      nationality: 'Ukraine',
      position: 'Deff',
    },
    {
      dateOfBirth: '12/05/2011',
      id: 2,
      name: 'Test Test1',
      nationality: 'Ukraine',
      position: 'Deff1',
    },
    {
      dateOfBirth: '12/05/2011',
      id: 2,
      name: 'Test Test1',
      nationality: 'Ukraine',
      position: 'Deff1',
    },
  ]

  it('should return true if player exist', () => {
    const result = isPlayerSelected(player, myTeam)
    expect(result).toBeTruthy()
  })

  it('should return false when player not selected', () => {
    const result = isPlayerSelected(playerNew, myTeam)
    expect(result).toBeFalsy()
  })

  it('should return true if nation === 4', () => {
    const result = limitOfNation(playerNew.nationality, myTeam)
    expect(result).toBe(true)
  })
})
