import type { Competition } from '../types/competition'
import { getEvents } from '../services/tba'
import { useTBA } from './useTBA'

interface UseCompetitionsResult {
  competitions: Competition[]
  loading: boolean
  error: string | null
}

export function useCompetitions(year: number): UseCompetitionsResult {
  const { data, loading, error } = useTBA<Competition[]>(
    () => getEvents(year),
    [year]
  )

  return {
    competitions: data ?? [],
    loading,
    error,
  }
}
