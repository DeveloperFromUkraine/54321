import { useState, useEffect } from 'react'

import { ICompetition } from '../types/competition'
import { BASE_URL, TOKEN } from '../api/api-url'

export const useCompetition = (url: string, options = null) => {
  const [data, setData] = useState<ICompetition[]>([])
  const excludedCompetition = ['European Championship', 'FIFA World Cup']

  useEffect(() => {
    fetch(`${BASE_URL}${url}`, {
      method: 'GET',
      headers: { 'X-Auth-Token': TOKEN },
      'Content-Type': 'application/json',
    } as RequestInit)
      .then(async res => res.json())
      .then(res => {
        const response = res.competitions.filter(
          (competition: ICompetition) =>
            competition.plan === 'TIER_ONE' && !excludedCompetition.includes(competition.name),
        )

        setData(response)
      })
  }, [url, options, setData, excludedCompetition])

  return data
}
