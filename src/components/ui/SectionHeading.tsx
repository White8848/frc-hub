import { cn } from '../../utils/cn'
import styles from './SectionHeading.module.css'

interface SectionHeadingProps {
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

function SectionHeading({
  title,
  subtitle,
  centered = false,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(styles.wrapper, centered && styles.centered, className)}
    >
      <h2 className={styles.title}>{title}</h2>
      <span className={styles.accent} aria-hidden="true" />
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  )
}

export default SectionHeading
