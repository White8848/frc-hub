import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import SectionHeading from '../components/ui/SectionHeading'
import FilterBar from '../components/ui/FilterBar'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Pagination from '../components/ui/Pagination'
import ScrollReveal from '../components/ui/ScrollReveal'
import EmptyState from '../components/ui/EmptyState'
import { equipmentList, equipmentCategories } from '../data/equipment'
import type { EquipmentCategory } from '../types/equipment'
import styles from './EquipmentPage.module.css'

const ITEMS_PER_PAGE = 9

const categoryBadgeVariant: Record<EquipmentCategory, 'default' | 'primary' | 'success' | 'warning' | 'danger'> = {
  'CNC加工': 'primary',
  '3D打印': 'success',
  '手动工具': 'default',
  '电动工具': 'warning',
  '测量仪器': 'danger',
  '焊接设备': 'warning',
}

const filterOptions = [
  { label: '全部', value: 'all' },
  ...equipmentCategories.map((cat) => ({ label: cat, value: cat })),
]

export default function EquipmentPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return equipmentList
    return equipmentList.filter((item) => item.category === activeCategory)
  }, [activeCategory])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paged = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  function handleCategoryChange(value: string) {
    setActiveCategory(value)
    setCurrentPage(1)
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <SectionHeading
          title="设备指南"
          subtitle="FRC 工坊设备推荐与指南"
          centered
        />

        <div className={styles.toolbar}>
          <FilterBar
            options={filterOptions}
            activeValue={activeCategory}
            onChange={handleCategoryChange}
          />
          <span className={styles.resultCount}>
            共 {filtered.length} 件设备
          </span>
        </div>

        {paged.length === 0 ? (
          <EmptyState
            title="暂无设备"
            description="该分类下暂无设备信息"
          />
        ) : (
          <div className={styles.grid}>
            {paged.map((item, index) => (
              <ScrollReveal key={item.id} delay={index * 60}>
                <Link to={`/equipment/${item.id}`} className={styles.cardLink}>
                  <Card hoverable padding="md">
                    <div className={styles.cardInner}>
                      <div className={styles.cardHeader}>
                        <Badge variant={categoryBadgeVariant[item.category]}>
                          {item.category}
                        </Badge>
                        <span className={styles.cardPrice}>{item.priceRange}</span>
                      </div>

                      <h3 className={styles.cardName}>{item.name}</h3>

                      <p className={styles.cardRecommendation}>
                        {item.recommendation}
                      </p>

                      <div className={styles.cardFooter}>
                        <span>查看详情</span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </div>
                    </div>
                  </Card>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          className={styles.pagination}
        />
      </div>
    </div>
  )
}
