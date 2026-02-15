import type { Competition } from '../types/competition'
import { getTeamEvents } from '../services/tba'
import { useTBA } from './useTBA'

interface UseTeamEventsResult {
  events: Competition[]
  loading: boolean
  error: string | null
}

export function useTeamEvents(
  teamNumber: number,
  year: number
): UseTeamEventsResult {
  const { data, loading, error } = useTBA<Competition[]>(
    () => getTeamEvents(teamNumber, year),
    [teamNumber, year]
  )

  return {
    events: data ?? [],
    loading,
    error,
  }
}
