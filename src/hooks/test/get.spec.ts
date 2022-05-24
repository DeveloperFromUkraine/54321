import { getTeams } from '../getTeams'
import { TOKEN } from '../../api/api-url'

describe('getTeams', () => {
  const fetchConfig = {
    'Content-Type': 'application/json',
    headers: { 'X-Auth-Token': TOKEN },
    method: 'GET',
  }
  const mockFetch = jest.spyOn(window, 'fetch')

  beforeAll(() => mockFetch)

  beforeEach(() => {
    mockFetch.mockClear()
    mockFetch.mockResolvedValueOnce({
      json: async () => ({ success: true }),
    } as Response | Promise<Response>)
  })

  it('get all teams for PL', async () => {
    const teams = await getTeams('PL')

    expect(fetch).toHaveBeenCalledWith('/competitions/PL/teams', fetchConfig)
    expect(teams).toStrictEqual({ success: true })
  })
})
