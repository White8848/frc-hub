import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import type { NewsCategory } from '../types/news'
import { newsArticles } from '../data/news'
import SectionHeading from '../components/ui/SectionHeading'
import FilterBar from '../components/ui/FilterBar'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Pagination from '../components/ui/Pagination'
import ScrollReveal from '../components/ui/ScrollReveal'
import EmptyState from '../components/ui/EmptyState'
import styles from './NewsPage.module.css'

const ITEMS_PER_PAGE = 6

const categories: NewsCategory[] = [
  '赛事报道',
  '技术分享',
  '社区动态',
  '队伍风采',
]

const filterOptions = [
  { label: '全部', value: 'all' },
  ...categories.map((c) => ({ label: c, value: c })),
]

const categoryVariantMap: Record<NewsCategory, 'primary' | 'success' | 'warning' | 'danger'> = {
  '赛事报道': 'primary',
  '技术分享': 'success',
  '社区动态': 'warning',
  '队伍风采': 'danger',
}

export default function NewsPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return newsArticles
    return newsArticles.filter((a) => a.category === activeFilter)
  }, [activeFilter])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paged = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  function handleFilterChange(value: string) {
    setActiveFilter(value)
    setCurrentPage(1)
  }

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <SectionHeading
          title="新闻动态"
          subtitle="了解 FRC 社区最新资讯"
          centered
        />

        <div className={styles.toolbar}>
          <FilterBar
            options={filterOptions}
            activeValue={activeFilter}
            onChange={handleFilterChange}
          />
        </div>

        {paged.length === 0 ? (
          <EmptyState
            className={styles.empty}
            title="暂无相关新闻"
            description="当前分类下没有新闻，请尝试切换其他分类"
          />
        ) : (
          <>
            <div className={styles.grid}>
              {paged.map((article, index) => (
                <ScrollReveal key={article.id} delay={index * 80}>
                  <Link
                    to={`/news/${article.id}`}
                    className={styles.cardLink}
                  >
                    <Card hoverable padding="md" className={styles.cardInner}>
                      <div className={styles.cardMeta}>
                        <Badge
                          variant={categoryVariantMap[article.category]}
                        >
                          {article.category}
                        </Badge>
                        {article.featured && (
                          <span className={styles.featuredBadge}>精选</span>
                        )}
                        <span className={styles.cardDate}>
                          {article.date}
                        </span>
                      </div>
                      <h3 className={styles.cardTitle}>{article.title}</h3>
                      <p className={styles.cardSummary}>{article.summary}</p>
                    </Card>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            <Pagination
              className={styles.pagination}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </section>
  )
}
