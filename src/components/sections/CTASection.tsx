import { Link } from 'react-router-dom'
import ScrollReveal from '../ui/ScrollReveal'
import styles from './CTASection.module.css'

function CTASection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ScrollReveal>
          <div className={styles.content}>
            <h2 className={styles.title}>加入中国 FRC 社区</h2>
            <p className={styles.description}>
              无论你是参赛队员、导师还是 FRC 爱好者，FRC Hub 都是你的最佳伙伴
            </p>
            <div className={styles.actions}>
              <Link to="/teams" className={styles.buttonPrimary}>
                浏览战队
              </Link>
              <Link to="/about" className={styles.buttonOutline}>
                了解更多
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

export default CTASection
