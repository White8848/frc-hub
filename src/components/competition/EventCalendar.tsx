import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import type { Competition } from '../../types/competition'
import Badge from '../ui/Badge'
import LoadingSpinner from '../ui/LoadingSpinner'
import EmptyState from '../ui/EmptyState'
import styles from './EventCalendar.module.css'

interface EventCalendarProps {
  competitions: Competition[]
  loading?: boolean
}

type EventStatus = '已结束' | '进行中' | '即将开始'

function getEventStatus(startDate: string, endDate: string): EventStatus {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const start = new Date(startDate)
  const end = new Date(endDate)
  end.setHours(23, 59, 59, 999)

  if (end < today) return '已结束'
  if (start <= today && today <= end) return '进行中'
  return '即将开始'
}

const statusVariantMap: Record<EventStatus, 'default' | 'success' | 'primary'> =
  {
    已结束: 'default',
    进行中: 'success',
    即将开始: 'primary',
  }

function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const opts: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
  }
  if (startDate === endDate) {
    return start.toLocaleDateString('zh-CN', opts)
  }
  return `${start.toLocaleDateString('zh-CN', opts)} - ${end.toLocaleDateString('zh-CN', opts)}`
}

function parseStartDay(dateStr: string): { month: string; day: string } {
  const date = new Date(dateStr)
  return {
    month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    day: String(date.getDate()),
  }
}

export default function EventCalendar({
  competitions,
  loading,
}: EventCalendarProps) {
  const sorted = useMemo(() => {
    return [...competitions].sort(
      (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    )
  }, [competitions])

  if (loading) {
    return (
      <div className={styles.centered}>
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (sorted.length === 0) {
    return (
      <EmptyState
        title="暂无赛事"
        description="当前筛选条件下没有赛事，请尝试调整筛选条件"
      />
    )
  }

  return (
    <div className={styles.list}>
      {sorted.map((comp) => {
        const status = getEventStatus(comp.startDate, comp.endDate)
        const { month, day } = parseStartDay(comp.startDate)

        return (
          <Link
            key={comp.key}
            to={`/competitions/${comp.key}`}
            className={styles.item}
          >
            <div className={styles.dateBlock}>
              <span className={styles.dateMonth}>{month}</span>
              <span className={styles.dateDay}>{day}</span>
            </div>

            <div className={styles.content}>
              <h3 className={styles.eventName}>{comp.name}</h3>
              <div className={styles.meta}>
                <span className={styles.location}>
                  {comp.city}, {comp.country}
                </span>
                <span className={styles.dateRange}>
                  {formatDateRange(comp.startDate, comp.endDate)}
                </span>
              </div>
            </div>

            <div className={styles.statusArea}>
              <Badge variant={statusVariantMap[status]}>{status}</Badge>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
