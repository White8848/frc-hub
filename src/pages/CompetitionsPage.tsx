import { useState, useMemo } from 'react'
import { useCompetitions } from '../hooks/useCompetitions'
import SectionHeading from '../components/ui/SectionHeading'
import FilterBar from '../components/ui/FilterBar'
import EventCalendar from '../components/competition/EventCalendar'
import styles from './CompetitionsPage.module.css'

const currentYear = new Date().getFullYear()

const yearOptions = [
  { label: `${currentYear}`, value: String(currentYear) },
  { label: `${currentYear - 1}`, value: String(currentYear - 1) },
  { label: `${currentYear - 2}`, value: String(currentYear - 2) },
]

const regionOptions = [
  { label: '全部', value: 'all' },
  { label: 'China', value: 'China' },
  { label: 'USA', value: 'USA' },
  { label: 'Other', value: 'other' },
]

const knownRegions = new Set(['China', 'USA'])

export default function CompetitionsPage() {
  const [selectedYear, setSelectedYear] = useState(String(currentYear))
  const [selectedRegion, setSelectedRegion] = useState('all')

  const { competitions, loading, error } = useCompetitions(
    Number(selectedYear)
  )

  const filtered = useMemo(() => {
    if (selectedRegion === 'all') return competitions
    if (selectedRegion === 'other') {
      return competitions.filter((c) => !knownRegions.has(c.country))
    }
    return competitions.filter((c) => c.country === selectedRegion)
  }, [competitions, selectedRegion])

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <SectionHeading
          title="赛事中心"
          subtitle="浏览 FRC 赛事资讯"
          centered
        />

        <div className={styles.toolbar}>
          <FilterBar
            options={yearOptions}
            activeValue={selectedYear}
            onChange={setSelectedYear}
          />
          <FilterBar
            options={regionOptions}
            activeValue={selectedRegion}
            onChange={setSelectedRegion}
          />
        </div>

        {error ? (
          <div className={styles.error}>
            <h3 className={styles.errorTitle}>加载失败</h3>
            <p className={styles.errorMessage}>{error}</p>
            <p className={styles.errorHint}>
              请检查网络连接，或确认 VITE_TBA_API_KEY 环境变量是否已正确配置。
            </p>
          </div>
        ) : (
          <div className={styles.calendarArea}>
            <EventCalendar competitions={filtered} loading={loading} />
          </div>
        )}
      </div>
    </section>
  )
}
