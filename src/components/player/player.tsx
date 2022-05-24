import React, { FC } from 'react'
import cn from 'classnames'

import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'

import { isPlayerSelected } from '../../helpers/isPlayerSelected'
import { ISquad } from '../../types/competition'

import styles from './player.module.scss'

interface IPlayer {
  item: ISquad
  handleSelectPlayer: (item: ISquad) => void
  mySquad: ISquad[]
}

export const Player: FC<IPlayer> = ({ item, handleSelectPlayer, mySquad }) => {
  return (
    <List
      key={item.id}
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      onClick={() => handleSelectPlayer(item)}
      className={cn(styles['player-default'], isPlayerSelected(item, mySquad) && styles['selected-player'])}
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PersonIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`${item.position}`}
          secondary={
            <React.Fragment>
              <Typography sx={{ display: 'block' }} component={'span'} variant={'body2'} color='text.primary'>
                {item.name} - {item.nationality}
              </Typography>
              <Typography
                sx={{ display: 'inline-block' }}
                component={'span'}
                variant={'body2'}
                color='text.primary'
              >{`Date of birthday — ${item.dateOfBirth}`}</Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  )
}
