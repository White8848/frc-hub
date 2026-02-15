import { useParams, Link } from 'react-router-dom'
import { newsArticles } from '../data/news'
import type { NewsCategory } from '../types/news'
import Badge from '../components/ui/Badge'
import EmptyState from '../components/ui/EmptyState'
import styles from './NewsDetailPage.module.css'

const categoryVariantMap: Record<NewsCategory, 'primary' | 'success' | 'warning' | 'danger'> = {
  '赛事报道': 'primary',
  '技术分享': 'success',
  '社区动态': 'warning',
  '队伍风采': 'danger',
}

export default function NewsDetailPage() {
  const { id } = useParams<{ id: string }>()
  const article = newsArticles.find((a) => a.id === id)

  if (!article) {
    return (
      <section className={styles.page}>
        <div className={styles.container}>
          <EmptyState
            title="文章未找到"
            description="您访问的新闻文章不存在或已被删除"
            action={
              <Link to="/news" className={styles.backLink}>
                返回新闻列表
              </Link>
            }
          />
        </div>
      </section>
    )
  }

  const paragraphs = article.content.split('\n\n')

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <Link to="/news" className={styles.backLink}>
          <svg className={styles.backIcon} viewBox="0 0 24 24">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          返回新闻列表
        </Link>

        <header className={styles.header}>
          <div className={styles.meta}>
            <Badge variant={categoryVariantMap[article.category]}>
              {article.category}
            </Badge>
            <span className={styles.date}>{article.date}</span>
          </div>
          <h1 className={styles.title}>{article.title}</h1>
        </header>

        <article className={styles.content}>
          {paragraphs.map((text, index) => (
            <p key={index} className={styles.paragraph}>
              {text}
            </p>
          ))}
        </article>
      </div>
    </section>
  )
}
