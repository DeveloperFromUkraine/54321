import { useState, useEffect } from 'react'

import { ICompetition } from '../types/competition'
import { get } from '../api/GET'

export const useCompetition = (url: string, options = null) => {
  const [data, setData] = useState<ICompetition[]>([])

  useEffect(() => {
    get(url).then(res => setData(res.competitions))
  }, [url, options])

  return data
}
