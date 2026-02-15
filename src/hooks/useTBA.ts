import { useState, useEffect, useCallback, useRef } from 'react'

interface UseTBAResult<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useTBA<T>(
  fetchFn: () => Promise<T>,
  deps: unknown[] = []
): UseTBAResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const fetchIdRef = useRef(0)

  const execute = useCallback(() => {
    const id = ++fetchIdRef.current
    setLoading(true)
    setError(null)

    fetchFn()
      .then((result) => {
        if (id === fetchIdRef.current) {
          setData(result)
          setLoading(false)
        }
      })
      .catch((err: unknown) => {
        if (id === fetchIdRef.current) {
          const message =
            err instanceof Error ? err.message : 'An unexpected error occurred'
          setError(message)
          setLoading(false)
        }
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  useEffect(() => {
    execute()

    // Copy ref value so the cleanup captures the current value, not a stale one
    const currentFetchId = fetchIdRef
    return () => {
      // Increment fetch ID so any in-flight request is ignored on unmount
      currentFetchId.current++
    }
  }, [execute])

  const refetch = useCallback(() => {
    execute()
  }, [execute])

  return { data, loading, error, refetch }
}
