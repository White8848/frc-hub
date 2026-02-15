import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import SectionHeading from '../ui/SectionHeading'
import ScrollReveal from '../ui/ScrollReveal'
import styles from './CompetitionHighlights.module.css'

interface Competition {
  name: string
  date: string
  location: string
  status: '即将开始' | '报名中'
}

const competitions: Competition[] = [
  {
    name: '2026 Shanghai Regional',
    date: '2026-03-15 至 2026-03-17',
    location: '上海',
    status: '即将开始',
  },
  {
    name: '2026 Shenzhen Regional',
    date: '2026-04-05 至 2026-04-07',
    location: '深圳',
    status: '报名中',
  },
  {
    name: '2026 Beijing Regional',
    date: '2026-04-19 至 2026-04-21',
    location: '北京',
    status: '报名中',
  },
]

const statusVariantMap: Record<Competition['status'], 'success' | 'warning'> = {
  '即将开始': 'success',
  '报名中': 'warning',
}

function CompetitionHighlights() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeading
          title="赛事速览"
          subtitle="了解最新 FRC 赛事动态"
          centered
        />

        <div className={styles.grid}>
          {competitions.map((comp, index) => (
            <ScrollReveal key={comp.name} delay={index * 100}>
              <Card hoverable className={styles.card}>
                <div className={styles.cardHeader}>
                  <Badge variant={statusVariantMap[comp.status]}>
                    {comp.status}
                  </Badge>
                </div>
                <h3 className={styles.eventName}>{comp.name}</h3>
                <div className={styles.meta}>
                  <span className={styles.metaItem}>
                    <svg
                      className={styles.icon}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {comp.date}
                  </span>
                  <span className={styles.metaItem}>
                    <svg
                      className={styles.icon}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.145c.186-.1.446-.25.749-.452a16.36 16.36 0 002.402-1.988C15.56 14.563 17 12.1 17 9A7 7 0 003 9c0 3.1 1.44 5.563 3.234 7.337a16.36 16.36 0 002.402 1.988 9.1 9.1 0 00.749.452 5.007 5.007 0 00.3.153l.017.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {comp.location}
                  </span>
                </div>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <div className={styles.footer}>
          <Link to="/competitions" className={cn(styles.viewAll)}>
            查看所有赛事 →
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CompetitionHighlights
