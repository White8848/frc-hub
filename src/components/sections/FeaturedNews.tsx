import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../ui/ScrollReveal'
import styles from './FeaturedNews.module.css'

interface NewsItem {
  id: string
  title: string
  category: string
  date: string
  summary: string
}

const categoryVariantMap: Record<string, 'primary' | 'success' | 'default'> = {
  '赛事报道': 'primary',
  '技术分享': 'success',
  '社区动态': 'default',
}

const featuredNews: NewsItem[] = [
  {
    id: '1',
    title: '2026 FRC 赛季主题发布',
    category: '赛事报道',
    date: '2026-01-15',
    summary: 'FIRST 官方正式发布 2026 赛季游戏主题...',
  },
  {
    id: '2',
    title: 'Swerve 驱动底盘入门指南',
    category: '技术分享',
    date: '2026-01-10',
    summary: '全方位解析 Swerve Drive 的原理与实现...',
  },
  {
    id: '3',
    title: '中国 FRC 社区年度回顾',
    category: '社区动态',
    date: '2025-12-28',
    summary: '回顾 2025 赛季中国 FRC 队伍的精彩表现...',
  },
]

function FeaturedNews() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeading title="最新动态" centered />

        <div className={styles.grid}>
          {featuredNews.map((news, index) => (
            <ScrollReveal key={news.id} delay={index * 100}>
              <Link
                to={`/news/${news.id}`}
                className={styles.cardLink}
              >
                <Card hoverable className={cn(styles.card)}>
                  <div className={styles.cardTop}>
                    <Badge
                      variant={categoryVariantMap[news.category] ?? 'default'}
                    >
                      {news.category}
                    </Badge>
                    <time className={styles.date} dateTime={news.date}>
                      {news.date}
                    </time>
                  </div>
                  <h3 className={styles.title}>{news.title}</h3>
                  <p className={styles.summary}>{news.summary}</p>
                </Card>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <div className={styles.footer}>
          <Link to="/news" className={styles.viewAll}>
            查看全部新闻 →
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FeaturedNews
