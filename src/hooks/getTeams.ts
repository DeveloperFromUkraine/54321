import { get } from '../api/GET'

export async function getTeams(competitionsCode: string) {
  return await get(`competitions/${competitionsCode}/teams`)
}
