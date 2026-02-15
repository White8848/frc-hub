import { Link } from 'react-router-dom'
import Button from '../ui/Button'
import ScrollReveal from '../ui/ScrollReveal'
import styles from './HeroSection.module.css'

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.decorations} aria-hidden="true" />
      <div className={styles.container}>
        <ScrollReveal>
          <h1 className={styles.title}>FRC Hub</h1>
        </ScrollReveal>
        <ScrollReveal delay={100}>
          <p className={styles.subtitle}>中国 FRC 一站式信息平台</p>
        </ScrollReveal>
        <ScrollReveal delay={200}>
          <p className={styles.description}>
            汇聚赛事资讯、零件信息、战队数据，助力中国 FRC 队伍成长
          </p>
        </ScrollReveal>
        <ScrollReveal delay={300}>
          <div className={styles.actions}>
            <Link to="/competitions" className={styles.link}>
              <Button variant="primary" size="lg">
                浏览赛事
              </Button>
            </Link>
            <Link to="/teams" className={styles.link}>
              <Button variant="secondary" size="lg">
                战队目录
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default HeroSection
