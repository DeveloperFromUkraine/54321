import React, { useEffect, useMemo, useState } from 'react'
import cn from 'classnames'

import { Alert, Snackbar } from '@mui/material'

import { ICompetition, ISquad, ITeam } from '../../types/competition'
import { useCompetition } from '../../hooks/useCompetition'
import { coaches, excludedCompetition, TIER_ONE } from '../../constants/constants'
import { getTeams } from '../../hooks/getTeams'
import { isPlayerSelected } from '../../helpers/isPlayerSelected'
import { removePlayerFromTeam } from '../../helpers/removePlayerFromTeam'
import { limitOfNation } from '../../helpers/limitOfNation'
import { countOfPositionInTeam } from '../../helpers/countOfPositionInTeam'
import { Player } from '../player/player'
import { SquadTeam } from '../squad-team/squad-team'
import { MyTeam } from '../my-team/my-team'

import styles from './home.module.scss'

export const Home = () => {
  const [competitions, setCompetitions] = useState<ICompetition[]>([])
  const [selectedCompetition, setCompetition] = useState<ICompetition | null>(null)
  const [teams, setTeams] = useState<ITeam[]>([])
  const [selectedTeam, setSelectedTeam] = useState<ITeam | null>(null)
  const [mySquad, setMySquad] = useState<ISquad[]>(JSON.parse(localStorage.getItem('MyTeam') || '[]'))
  const [open, setOpen] = React.useState(false)
  const [warningText, setWarningText] = useState('')

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const data = useCompetition('competitions')

  useEffect(() => {
    if (data) {
      const competitions = data.filter(
        (competition: ICompetition) => competition.plan === TIER_ONE && !excludedCompetition.includes(competition.name),
      )
      setCompetitions(competitions)
    }
  }, [data])

  const handleCompetitionSelect = async (competition: ICompetition) => {
    setTeams([])
    setSelectedTeam(null)
    setCompetition(competition)
    const { teams } = await getTeams(competition.code)
    setTeams(teams)
  }

  const handleTeamSelect = (team: ITeam) => {
    setSelectedTeam(team)
  }

  const handleSelectPlayer = (player: ISquad) => {
    if (limitOfNation(player.nationality, mySquad) && !isPlayerSelected(player, mySquad)) {
      setWarningText(`You have exceeded the player limit for this nation: ${player.nationality}. (maximum: 4)`)
      return setOpen(true)
    }

    if (isPlayerSelected(player, mySquad)) {
      setMySquad(removePlayerFromTeam(player, mySquad))
      return
    }

    if (mySquad.length < 16) {
      setMySquad(prev => [...prev, player])
    }
  }

  const handleRemovePlayer = (player: ISquad) => {
    setMySquad(removePlayerFromTeam(player, mySquad))
  }

  const handleSave = () => {
    localStorage.setItem('MyTeam', JSON.stringify(mySquad))
  }

  const validationIndicator = useMemo(() => {
    return {
      coach: countOfPositionInTeam(mySquad, 'Coach', 1),
      goalkeepers: countOfPositionInTeam(mySquad, 'Goalkeeper', 2),
      defenders: countOfPositionInTeam(mySquad, 'Defence', 4),
      midfielders: countOfPositionInTeam(mySquad, 'Midfield', 4),
      attackers: countOfPositionInTeam(mySquad, 'Offence', 2),
      teamSize: mySquad.length >= 16,
    }
  }, [mySquad])

  return (
    <>
      <div className={styles.container}>
        <div className={styles['item-list-wrapper']}>
          {competitions.map(competition => (
            <div
              key={competition.id}
              className={cn(styles['item-wrapper'], selectedCompetition?.id === competition.id && styles.active)}
              onClick={() => handleCompetitionSelect(competition)}
            >
              <img src={competition.emblem} alt={competition.emblem} className={styles['item-emblem']} />
              <span className={styles['item-name']}>{competition.name}</span>
            </div>
          ))}
        </div>
        <div className={styles['item-list-wrapper']}>
          {teams &&
            teams.map((team: ITeam) => (
              <div
                key={team.id}
                className={cn(styles['item-wrapper'], selectedTeam?.id === team.id && styles.active)}
                onClick={() => handleTeamSelect(team)}
              >
                <img src={team.crest} alt={team.crest} className={styles['item-emblem']} />
                <span className={styles['item-name']}>{team.name}</span>
              </div>
            ))}
        </div>
        {selectedTeam && (
          <div className={styles['item-list-wrapper']}>
            {coaches.map(coach => (
              <Player key={coach.id} item={coach} handleSelectPlayer={handleSelectPlayer} mySquad={mySquad} />
            ))}
            {selectedTeam.squad ? (
              selectedTeam.squad.map((player: ISquad) => (
                <Player key={player.id} item={player} handleSelectPlayer={handleSelectPlayer} mySquad={mySquad} />
              ))
            ) : (
              <div>No Data</div>
            )}
          </div>
        )}
      </div>
      {mySquad.length > 0 && (
        <>
          <div className={styles['team-wrapper']}>
            <SquadTeam validationIndicator={validationIndicator} saveTeam={handleSave} />
            <MyTeam handleRemovePlayer={handleRemovePlayer} mySquad={mySquad} />
          </div>
        </>
      )}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity='warning' sx={{ width: '100%' }}>
          {warningText}
        </Alert>
      </Snackbar>
    </>
  )
}
