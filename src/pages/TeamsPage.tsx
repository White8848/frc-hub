import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Badge from '../components/ui/Badge'
import Card from '../components/ui/Card'
import EmptyState from '../components/ui/EmptyState'
import FilterBar from '../components/ui/FilterBar'
import Pagination from '../components/ui/Pagination'
import ScrollReveal from '../components/ui/ScrollReveal'
import SearchInput from '../components/ui/SearchInput'
import SectionHeading from '../components/ui/SectionHeading'
import { teams, provinces } from '../data/teams'
import styles from './TeamsPage.module.css'

const ITEMS_PER_PAGE = 12

const provinceOptions = [
  { label: '全部', value: 'all' },
  ...provinces.map((p) => ({ label: p, value: p })),
]

const yearRangeOptions = [
  { label: '全部', value: 'all' },
  { label: '2022+', value: '2022+' },
  { label: '2020-2021', value: '2020-2021' },
  { label: '2018-2019', value: '2018-2019' },
  { label: '2017及以前', value: '<=2017' },
]

function matchYearRange(yearFounded: number, range: string): boolean {
  switch (range) {
    case '2022+':
      return yearFounded >= 2022
    case '2020-2021':
      return yearFounded >= 2020 && yearFounded <= 2021
    case '2018-2019':
      return yearFounded >= 2018 && yearFounded <= 2019
    case '<=2017':
      return yearFounded <= 2017
    default:
      return true
  }
}

export default function TeamsPage() {
  const [search, setSearch] = useState('')
  const [activeProvince, setActiveProvince] = useState('all')
  const [activeYearRange, setActiveYearRange] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = useMemo(() => {
    const keyword = search.trim().toLowerCase()
    return teams.filter((t) => {
      const matchProvince =
        activeProvince === 'all' || t.province === activeProvince
      const matchYear =
        activeYearRange === 'all' || matchYearRange(t.yearFounded, activeYearRange)
      const matchSearch =
        !keyword ||
        t.name.toLowerCase().includes(keyword) ||
        t.school.toLowerCase().includes(keyword) ||
        String(t.number).includes(keyword)
      return matchProvince && matchYear && matchSearch
    })
  }, [search, activeProvince, activeYearRange])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  function handleSearchChange(value: string) {
    setSearch(value)
    setCurrentPage(1)
  }

  function handleProvinceChange(value: string) {
    setActiveProvince(value)
    setCurrentPage(1)
  }

  function handleYearRangeChange(value: string) {
    setActiveYearRange(value)
    setCurrentPage(1)
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <ScrollReveal>
          <SectionHeading
            title="战队目录"
            subtitle="探索中国 FRC 队伍"
            centered
          />
        </ScrollReveal>

        <div className={styles.toolbar}>
          <div className={styles.searchRow}>
            <SearchInput
              value={search}
              onChange={handleSearchChange}
              placeholder="搜索队名、学校或队号..."
            />
          </div>
          <FilterBar
            options={provinceOptions}
            activeValue={activeProvince}
            onChange={handleProvinceChange}
          />
          <FilterBar
            options={yearRangeOptions}
            activeValue={activeYearRange}
            onChange={handleYearRangeChange}
          />
        </div>

        {paginated.length === 0 ? (
          <EmptyState
            title="未找到匹配的战队"
            description="请尝试调整搜索关键词或筛选条件"
          />
        ) : (
          <>
            <div className={styles.grid}>
              {paginated.map((team, index) => (
                <ScrollReveal key={team.number} delay={index * 60}>
                  <Link
                    to={`/teams/${team.number}`}
                    className={styles.cardLink}
                  >
                    <Card hoverable padding="md">
                      <div className={styles.cardInner}>
                        <div className={styles.cardHeader}>
                          <span className={styles.teamNumber}>
                            #{team.number}
                          </span>
                          <Badge variant="primary">{team.province}</Badge>
                        </div>
                        <h3 className={styles.teamName}>{team.name}</h3>
                        <span className={styles.teamSchool}>{team.school}</span>
                        <div className={styles.teamMeta}>
                          <span className={styles.metaItem}>
                            {team.city}, {team.province}
                          </span>
                          <span className={styles.metaDot} aria-hidden="true">
                            &middot;
                          </span>
                          <span className={styles.metaItem}>
                            {team.yearFounded} 年成立
                          </span>
                        </div>
                        <div className={styles.cardFooter}>
                          <span className={styles.viewDetail}>
                            查看详情 &rarr;
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              className={styles.paginationWrapper}
            />
          </>
        )}
      </div>
    </div>
  )
}
