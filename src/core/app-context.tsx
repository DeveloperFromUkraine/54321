import React, { createContext, FC, useState } from 'react'
import { noop } from 'lodash'

import { ISquad } from '../types/competition'

interface AppContext {
  squadList: ISquad[]
  updateSquad(player: ISquad): void
}

export const AppContext = createContext<AppContext>({
  squadList: [],
  updateSquad: noop,
})

export const AppContextProvider: FC = ({ children }) => {
  const [squadList, setPlayerToSquad] = useState<ISquad[]>([])

  const updateSquad = (player: ISquad) => {
    setPlayerToSquad(prev => [...prev, player])
  }

  const appContext: AppContext = {
    squadList,
    updateSquad,
  }

  return <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
}
