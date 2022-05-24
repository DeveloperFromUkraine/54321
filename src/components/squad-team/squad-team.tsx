import React, { FC, useMemo } from 'react'
import cn from 'classnames'

import { Button } from '@mui/material'

import styles from './save-team.module.scss'

interface ISaveTeam {
  validationIndicator: {
    coach: boolean
    goalkeepers: boolean
    defenders: boolean
    midfielders: boolean
    attackers: boolean
    teamSize: boolean
  }
  saveTeam: () => void
}

export const SaveTeam: FC<ISaveTeam> = ({ validationIndicator, saveTeam }) => {
  const isValid = useMemo(() => {
    return (
      validationIndicator.coach &&
      validationIndicator.goalkeepers &&
      validationIndicator.defenders &&
      validationIndicator.midfielders &&
      validationIndicator.attackers &&
      validationIndicator.teamSize
    )
  }, [validationIndicator])

  return (
    <div className={styles['team-validation']}>
      <ul>
        <li>
          <div className={styles['team-validation-item']}>
            <div
              className={cn(
                styles['team-validation-indicator'],
                validationIndicator.coach && styles['team-validation-indicator-pass'],
              )}
            />
            <span className={styles['team-validation-text']}>1 coach</span>
          </div>
        </li>
        <li>
          <div className={styles['team-validation-item']}>
            <div
              className={cn(
                styles['team-validation-indicator'],
                validationIndicator.goalkeepers && styles['team-validation-indicator-pass'],
              )}
            />
            <span className={styles['team-validation-text']}>2 goalkeepers</span>
          </div>
        </li>
        <li>
          <div className={styles['team-validation-item']}>
            <div
              className={cn(
                styles['team-validation-indicator'],
                validationIndicator.defenders && styles['team-validation-indicator-pass'],
              )}
            />
            <span className={styles['team-validation-text']}>4 defenders</span>
          </div>
        </li>
        <li>
          <div className={styles['team-validation-item']}>
            <div
              className={cn(
                styles['team-validation-indicator'],
                validationIndicator.midfielders && styles['team-validation-indicator-pass'],
              )}
            />
            <span className={styles['team-validation-text']}>4 midfielders</span>
          </div>
        </li>
        <li>
          <div className={styles['team-validation-item']}>
            <div
              className={cn(
                styles['team-validation-indicator'],
                validationIndicator.attackers && styles['team-validation-indicator-pass'],
              )}
            />
            <span className={styles['team-validation-text']}>2 attackers</span>
          </div>
        </li>
        <li>
          <div className={styles['team-validation-item']}>
            <div
              className={cn(
                styles['team-validation-indicator'],
                validationIndicator.teamSize && styles['team-validation-indicator-pass'],
              )}
            />
            <span className={styles['team-validation-text']}>minimum team size 16</span>
          </div>
        </li>
      </ul>
      <Button disabled={!isValid} onClick={saveTeam}>
        Save Team
      </Button>
    </div>
  )
}
