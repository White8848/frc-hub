import type { Competition, Match, EventRankings, Ranking, Alliance } from '../types/competition'

const BASE_URL = 'https://www.thebluealliance.com/api/v3'
const CACHE_TTL_MS = 5 * 60 * 1000 // 5 minutes

// ─── TBA-specific types ────────────────────────────────────────────

export interface TBATeam {
  key: string
  team_number: number
  nickname: string
  city: string
  state_prov: string
  country: string
}

// Raw TBA response shapes (snake_case)

interface TBAEvent {
  key: string
  name: string
  city: string
  country: string
  start_date: string
  end_date: string
  event_type: number
  year: number
  week?: number
  address?: string
  website?: string
}

interface TBAAlliance {
  team_keys: string[]
  score: number
}

interface TBAMatch {
  key: string
  comp_level: 'qm' | 'ef' | 'qf' | 'sf' | 'f'
  match_number: number
  set_number: number
  alliances: {
    red: TBAAlliance
    blue: TBAAlliance
  }
  winning_alliance: 'red' | 'blue' | ''
  time: number
}

interface TBARanking {
  rank: number
  team_key: string
  wins: number
  losses: number
  ties: number
  qual_average?: number
  record: {
    wins: number
    losses: number
    ties: number
  }
}

interface TBAEventRankings {
  rankings: TBARanking[]
}

// ─── Cache helpers ─────────────────────────────────────────────────

interface CacheEntry {
  data: string
  expiry: number
}

function getCached<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key)
    if (!raw) return null

    const entry: CacheEntry = JSON.parse(raw)
    if (Date.now() > entry.expiry) {
      sessionStorage.removeItem(key)
      return null
    }
    return JSON.parse(entry.data) as T
  } catch {
    return null
  }
}

function setCache<T>(key: string, data: T): void {
  try {
    const entry: CacheEntry = {
      data: JSON.stringify(data),
      expiry: Date.now() + CACHE_TTL_MS,
    }
    sessionStorage.setItem(key, JSON.stringify(entry))
  } catch {
    // sessionStorage may be full or unavailable; silently ignore
  }
}

// ─── Generic fetch wrapper ─────────────────────────────────────────

function getApiKey(): string {
  const key = import.meta.env.VITE_TBA_API_KEY
  if (!key) {
    throw new Error(
      'TBA API key is not configured. Set the VITE_TBA_API_KEY environment variable.'
    )
  }
  return key
}

async function fetchTBA<T>(path: string): Promise<T> {
  const cacheKey = `tba:${path}`
  const cached = getCached<T>(cacheKey)
  if (cached !== null) return cached

  const apiKey = getApiKey()

  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'X-TBA-Auth-Key': apiKey,
      Accept: 'application/json',
    },
  })

  if (!response.ok) {
    const message =
      response.status === 401
        ? 'Invalid TBA API key. Check your VITE_TBA_API_KEY environment variable.'
        : `TBA API error: ${response.status} ${response.statusText}`
    throw new Error(message)
  }

  const data = (await response.json()) as T
  setCache(cacheKey, data)
  return data
}

// ─── Mappers ───────────────────────────────────────────────────────

function mapEvent(e: TBAEvent): Competition {
  return {
    key: e.key,
    name: e.name,
    city: e.city,
    country: e.country,
    startDate: e.start_date,
    endDate: e.end_date,
    eventType: e.event_type,
    year: e.year,
    week: e.week,
    address: e.address,
    website: e.website,
  }
}

function mapAlliance(a: TBAAlliance): Alliance {
  return {
    teamKeys: a.team_keys,
    score: a.score,
  }
}

function mapMatch(m: TBAMatch): Match {
  return {
    key: m.key,
    compLevel: m.comp_level,
    matchNumber: m.match_number,
    setNumber: m.set_number,
    alliances: {
      red: mapAlliance(m.alliances.red),
      blue: mapAlliance(m.alliances.blue),
    },
    winningAlliance: m.winning_alliance,
    time: m.time,
  }
}

function mapRanking(r: TBARanking): Ranking {
  return {
    rank: r.rank,
    teamKey: r.team_key,
    wins: r.wins,
    losses: r.losses,
    ties: r.ties,
    qualAverage: r.qual_average,
    record: {
      wins: r.record.wins,
      losses: r.record.losses,
      ties: r.record.ties,
    },
  }
}

// ─── Public API functions ──────────────────────────────────────────

export async function getEvents(year: number): Promise<Competition[]> {
  const events = await fetchTBA<TBAEvent[]>(`/events/${year}`)
  return events.map(mapEvent)
}

export async function getEvent(eventKey: string): Promise<Competition> {
  const event = await fetchTBA<TBAEvent>(`/event/${eventKey}`)
  return mapEvent(event)
}

export async function getEventMatches(eventKey: string): Promise<Match[]> {
  const matches = await fetchTBA<TBAMatch[]>(`/event/${eventKey}/matches`)
  return matches.map(mapMatch)
}

export async function getEventRankings(
  eventKey: string
): Promise<EventRankings> {
  const raw = await fetchTBA<TBAEventRankings>(`/event/${eventKey}/rankings`)
  return {
    rankings: raw.rankings.map(mapRanking),
  }
}

export async function getEventTeams(eventKey: string): Promise<TBATeam[]> {
  return fetchTBA<TBATeam[]>(`/event/${eventKey}/teams`)
}

export async function getTeam(teamNumber: number): Promise<TBATeam> {
  return fetchTBA<TBATeam>(`/team/frc${teamNumber}`)
}

export async function getTeamEvents(
  teamNumber: number,
  year: number
): Promise<Competition[]> {
  const events = await fetchTBA<TBAEvent[]>(
    `/team/frc${teamNumber}/events/${year}`
  )
  return events.map(mapEvent)
}
