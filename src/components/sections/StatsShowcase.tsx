import ScrollReveal from '../ui/ScrollReveal'
import SectionHeading from '../ui/SectionHeading'
import styles from './StatsShowcase.module.css'

const stats = [
  { value: '100+', label: '中国 FRC 队伍' },
  { value: '15+', label: '年度赛事' },
  { value: '50+', label: '城市覆盖' },
  { value: '1000+', label: '参赛学生' },
]

function StatsShowcase() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ScrollReveal>
          <SectionHeading title="数据一览" centered />
        </ScrollReveal>
        <div className={styles.grid}>
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 100}>
              <div className={styles.card}>
                <span className={styles.value}>{stat.value}</span>
                <span className={styles.label}>{stat.label}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsShowcase
