import { BASE_URL, TOKEN } from './api-url'

export async function get(url: string) {
  const res = await fetch(`${BASE_URL}${url}`, {
    method: 'GET',
    headers: {
      'X-Auth-Token': TOKEN,
    },
    'Content-Type': 'application/json',
  } as RequestInit)

  return await res.json()
}
