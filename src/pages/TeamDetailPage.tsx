import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Badge from '../components/ui/Badge'
import EmptyState from '../components/ui/EmptyState'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { useTeamEvents } from '../hooks/useTeamEvents'
import { teams } from '../data/teams'
import { cn } from '../utils/cn'
import styles from './TeamDetailPage.module.css'

const currentYear = new Date().getFullYear()

const yearOptions = [
  { label: String(currentYear), value: currentYear },
  { label: String(currentYear - 1), value: currentYear - 1 },
  { label: String(currentYear - 2), value: currentYear - 2 },
]

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

export default function TeamDetailPage() {
  const { number } = useParams<{ number: string }>()
  const [selectedYear, setSelectedYear] = useState(currentYear)

  const teamNumber = Number(number)
  const team = teams.find((t) => t.number === teamNumber)

  const { events, loading, error } = useTeamEvents(teamNumber, selectedYear)

  // --- Not found ---
  if (!team) {
    return (
      <section className={styles.page}>
        <div className={styles.container}>
          <Link to="/teams" className={styles.backLink}>
            <span className={styles.backArrow}>&larr;</span>
            返回战队列表
          </Link>
          <EmptyState
            title="战队未找到"
            description={`未找到队号为 ${number} 的战队信息`}
          />
        </div>
      </section>
    )
  }

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        {/* Back link */}
        <Link to="/teams" className={styles.backLink}>
          <span className={styles.backArrow}>&larr;</span>
          返回战队列表
        </Link>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <span className={styles.teamNumber}>#{team.number}</span>
            <Badge variant="primary">{team.province}</Badge>
          </div>
          <h1 className={styles.teamName}>{team.name}</h1>
          <div className={styles.teamMeta}>
            <span className={styles.metaItem}>
              <span className={styles.metaIcon} aria-hidden="true">
                &#127979;
              </span>
              {team.school}
            </span>
            <span className={styles.metaItem}>
              <span className={styles.metaIcon} aria-hidden="true">
                &#128205;
              </span>
              {team.city}, {team.province}
            </span>
            <span className={styles.metaItem}>
              <span className={styles.metaIcon} aria-hidden="true">
                &#128197;
              </span>
              {team.yearFounded} 年成立
            </span>
          </div>
        </div>

        {/* Description */}
        {team.description && (
          <div className={styles.descriptionSection}>
            <h2 className={styles.sectionTitle}>团队简介</h2>
            <p className={styles.description}>{team.description}</p>
          </div>
        )}

        {/* Event History */}
        <div className={styles.eventsSection}>
          <div className={styles.eventsSectionHeader}>
            <h2 className={styles.sectionTitle}>参赛历史</h2>
            <div className={styles.yearSelector}>
              {yearOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={cn(
                    styles.yearButton,
                    selectedYear === opt.value && styles.yearButtonActive
                  )}
                  onClick={() => setSelectedYear(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className={styles.centered}>
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className={styles.error}>
              <h3 className={styles.errorTitle}>加载失败</h3>
              <p className={styles.errorMessage}>{error}</p>
              <p className={styles.errorHint}>
                请检查网络连接，或确认 VITE_TBA_API_KEY 环境变量是否已正确配置。
              </p>
            </div>
          ) : events.length === 0 ? (
            <EmptyState
              title="暂无赛事记录"
              description={`该战队在 ${selectedYear} 赛季暂无参赛记录`}
            />
          ) : (
            <div className={styles.eventList}>
              {events
                .sort(
                  (a, b) =>
                    new Date(a.startDate).getTime() -
                    new Date(b.startDate).getTime()
                )
                .map((event) => (
                  <Link
                    key={event.key}
                    to={`/competitions/${event.key}`}
                    className={styles.eventCard}
                  >
                    <div className={styles.eventTimeline}>
                      <span
                        className={styles.timelineDot}
                        aria-hidden="true"
                      />
                      <span
                        className={styles.timelineLine}
                        aria-hidden="true"
                      />
                    </div>
                    <div className={styles.eventContent}>
                      <h3 className={styles.eventName}>{event.name}</h3>
                      <div className={styles.eventMeta}>
                        <span>
                          {formatDateRange(event.startDate, event.endDate)}
                        </span>
                        <span className={styles.eventLocation}>
                          {event.city}, {event.country}
                        </span>
                      </div>
                      {event.week != null && (
                        <Badge variant="default">
                          Week {event.week + 1}
                        </Badge>
                      )}
                    </div>
                    <span className={styles.eventArrow} aria-hidden="true">
                      &rarr;
                    </span>
                  </Link>
                ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
