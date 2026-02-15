import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import type { Competition, Match, EventRankings } from '../types/competition'
import {
  getEvent,
  getEventMatches,
  getEventRankings,
} from '../services/tba'
import { useTBA } from '../hooks/useTBA'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import EmptyState from '../components/ui/EmptyState'
import MatchCard from '../components/competition/MatchCard'
import RankingTable from '../components/competition/RankingTable'
import { cn } from '../utils/cn'
import styles from './CompetitionDetailPage.module.css'

type Tab = 'matches' | 'rankings' | 'info'

const tabs: { key: Tab; label: string }[] = [
  { key: 'matches', label: '赛程' },
  { key: 'rankings', label: '排名' },
  { key: 'info', label: '信息' },
]

/** Sort matches by comp level weight then by set/match number. */
const compLevelOrder: Record<Match['compLevel'], number> = {
  qm: 0,
  ef: 1,
  qf: 2,
  sf: 3,
  f: 4,
}

function sortMatches(a: Match, b: Match): number {
  const levelDiff = compLevelOrder[a.compLevel] - compLevelOrder[b.compLevel]
  if (levelDiff !== 0) return levelDiff
  const setDiff = a.setNumber - b.setNumber
  if (setDiff !== 0) return setDiff
  return a.matchNumber - b.matchNumber
}

function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const opts: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  if (startDate === endDate) {
    return start.toLocaleDateString('zh-CN', opts)
  }
  return `${start.toLocaleDateString('zh-CN', opts)} - ${end.toLocaleDateString('zh-CN', opts)}`
}

export default function CompetitionDetailPage() {
  const { key } = useParams<{ key: string }>()
  const [activeTab, setActiveTab] = useState<Tab>('matches')

  const {
    data: event,
    loading: eventLoading,
    error: eventError,
  } = useTBA<Competition>(() => getEvent(key!), [key])

  const { data: matches, loading: matchesLoading } = useTBA<Match[]>(
    () => getEventMatches(key!),
    [key]
  )

  const { data: eventRankings, loading: rankingsLoading } =
    useTBA<EventRankings>(() => getEventRankings(key!), [key])

  const sortedMatches = matches ? [...matches].sort(sortMatches) : []
  const rankings = eventRankings?.rankings ?? []

  // --- Loading state ---
  if (eventLoading) {
    return (
      <section className={styles.page}>
        <div className={styles.container}>
          <div className={styles.centered}>
            <LoadingSpinner size="lg" />
          </div>
        </div>
      </section>
    )
  }

  // --- Error state ---
  if (eventError || !event) {
    return (
      <section className={styles.page}>
        <div className={styles.container}>
          <Link to="/competitions" className={styles.backLink}>
            <span className={styles.backArrow}>&larr;</span>
            返回赛事中心
          </Link>
          <div className={styles.error}>
            <h3 className={styles.errorTitle}>加载失败</h3>
            <p className={styles.errorMessage}>
              {eventError ?? '无法获取赛事信息'}
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        {/* Back link */}
        <Link to="/competitions" className={styles.backLink}>
          <span className={styles.backArrow}>&larr;</span>
          返回赛事中心
        </Link>

        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.eventName}>{event.name}</h1>
          <div className={styles.eventMeta}>
            <span className={styles.metaItem}>
              <span className={styles.metaIcon} aria-hidden="true">
                &#128197;
              </span>
              {formatDateRange(event.startDate, event.endDate)}
            </span>
            <span className={styles.metaItem}>
              <span className={styles.metaIcon} aria-hidden="true">
                &#128205;
              </span>
              {event.city}, {event.country}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs} role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.key}
              className={cn(
                styles.tab,
                activeTab === tab.key && styles.tabActive
              )}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className={styles.tabContent}>
          {/* Matches tab */}
          {activeTab === 'matches' && (
            <>
              {matchesLoading ? (
                <div className={styles.centered}>
                  <LoadingSpinner />
                </div>
              ) : sortedMatches.length === 0 ? (
                <EmptyState
                  className={styles.emptyTab}
                  title="暂无赛程数据"
                  description="该赛事的比赛数据尚未发布"
                />
              ) : (
                <div className={styles.matchGrid}>
                  {sortedMatches.map((match) => (
                    <MatchCard key={match.key} match={match} />
                  ))}
                </div>
              )}
            </>
          )}

          {/* Rankings tab */}
          {activeTab === 'rankings' && (
            <>
              {rankingsLoading ? (
                <div className={styles.centered}>
                  <LoadingSpinner />
                </div>
              ) : rankings.length === 0 ? (
                <EmptyState
                  className={styles.emptyTab}
                  title="暂无排名数据"
                  description="该赛事的排名数据尚未发布"
                />
              ) : (
                <RankingTable rankings={rankings} />
              )}
            </>
          )}

          {/* Info tab */}
          {activeTab === 'info' && (
            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <p className={styles.infoLabel}>赛事名称</p>
                <p className={styles.infoValue}>{event.name}</p>
              </div>
              <div className={styles.infoCard}>
                <p className={styles.infoLabel}>赛事编号</p>
                <p className={styles.infoValue}>{event.key}</p>
              </div>
              <div className={styles.infoCard}>
                <p className={styles.infoLabel}>举办地点</p>
                <p className={styles.infoValue}>
                  {event.address ?? `${event.city}, ${event.country}`}
                </p>
              </div>
              <div className={styles.infoCard}>
                <p className={styles.infoLabel}>比赛日期</p>
                <p className={styles.infoValue}>
                  {formatDateRange(event.startDate, event.endDate)}
                </p>
              </div>
              <div className={styles.infoCard}>
                <p className={styles.infoLabel}>赛季</p>
                <p className={styles.infoValue}>{event.year}</p>
              </div>
              {event.week != null && (
                <div className={styles.infoCard}>
                  <p className={styles.infoLabel}>周数</p>
                  <p className={styles.infoValue}>Week {event.week + 1}</p>
                </div>
              )}
              {event.website && (
                <div className={styles.infoCard}>
                  <p className={styles.infoLabel}>官方网站</p>
                  <p className={styles.infoValue}>
                    <a
                      href={event.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.infoLink}
                    >
                      {event.website}
                    </a>
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
