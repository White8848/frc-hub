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
import { parts } from '../data/parts'
import type { PartCategory } from '../types/part'
import styles from './PartsPage.module.css'

const ITEMS_PER_PAGE = 9

const CATEGORIES: PartCategory[] = [
  '电机',
  '控制器',
  '传感器',
  '结构件',
  '气动',
  '电子元件',
  '线材连接',
]

const filterOptions = [
  { label: '全部', value: 'all' },
  ...CATEGORIES.map((c) => ({ label: c, value: c })),
]

const categoryVariantMap: Record<PartCategory, 'primary' | 'success' | 'warning' | 'danger' | 'default'> = {
  '电机': 'primary',
  '控制器': 'danger',
  '传感器': 'success',
  '结构件': 'default',
  '气动': 'warning',
  '电子元件': 'primary',
  '线材连接': 'default',
}

export default function PartsPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = useMemo(() => {
    const keyword = search.trim().toLowerCase()
    return parts.filter((p) => {
      const matchCategory = activeCategory === 'all' || p.category === activeCategory
      const matchSearch =
        !keyword ||
        p.name.toLowerCase().includes(keyword) ||
        p.brand.toLowerCase().includes(keyword)
      return matchCategory && matchSearch
    })
  }, [search, activeCategory])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  function handleCategoryChange(value: string) {
    setActiveCategory(value)
    setCurrentPage(1)
  }

  function handleSearchChange(value: string) {
    setSearch(value)
    setCurrentPage(1)
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <ScrollReveal>
          <SectionHeading
            title="零件商城"
            subtitle="FRC 常用零件一站式查询"
            centered
          />
        </ScrollReveal>

        <div className={styles.toolbar}>
          <div className={styles.searchRow}>
            <SearchInput
              value={search}
              onChange={handleSearchChange}
              placeholder="搜索零件名称或品牌..."
            />
          </div>
          <FilterBar
            options={filterOptions}
            activeValue={activeCategory}
            onChange={handleCategoryChange}
          />
        </div>

        {paginated.length === 0 ? (
          <EmptyState
            title="未找到匹配的零件"
            description="请尝试调整搜索关键词或筛选条件"
          />
        ) : (
          <>
            <div className={styles.grid}>
              {paginated.map((part, index) => (
                <ScrollReveal key={part.id} delay={index * 60}>
                  <Link to={`/parts/${part.id}`} className={styles.cardLink}>
                    <Card hoverable padding="md">
                      <div className={styles.cardInner}>
                        <div className={styles.cardHeader}>
                          <Badge variant={categoryVariantMap[part.category]}>
                            {part.category}
                          </Badge>
                        </div>
                        <h3 className={styles.cardName}>{part.name}</h3>
                        <span className={styles.cardBrand}>{part.brand}</span>
                        <p className={styles.cardDescription}>
                          {part.description}
                        </p>
                        <div className={styles.cardFooter}>
                          <span className={styles.cardPrice}>{part.price}</span>
                          <span className={styles.viewDetail}>查看详情 &rarr;</span>
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
