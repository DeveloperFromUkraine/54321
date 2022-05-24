import React, { FC } from 'react'
import cn from 'classnames'

import { Paper } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import PersonIcon from '@mui/icons-material/Person'

import { ISquad } from '../../types/competition'

import styles from '../home/home.module.scss'

interface IMyTeam {
  mySquad: ISquad[]
  handleRemovePlayer: (player: ISquad) => void
}

export const MyTeam: FC<IMyTeam> = ({ mySquad, handleRemovePlayer }) => {
  return (
    <div className={styles.team}>
      {mySquad.map(player => (
        <Paper elevation={3} key={player.id} className={styles['player-card']}>
          <div className={styles['remove-button']} onClick={() => handleRemovePlayer(player)}>
            <CloseIcon />
          </div>
          <div className={styles['player-emblem']}>
            <PersonIcon style={{ fontSize: 80 }} />
          </div>
          <div className={styles['played-info']}>
            <span className={cn(styles['player-info-item'], styles['player-name'])}>{player.name}</span>
            <span className={cn(styles['player-info-item'], styles['player-position'])}>{player.position}</span>
            <span className={cn(styles['player-info-item'], styles['player-nationality'])}>{player.nationality}</span>
          </div>
        </Paper>
      ))}
    </div>
  )
}
