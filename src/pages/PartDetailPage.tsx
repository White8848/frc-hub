import { Link, useParams } from 'react-router-dom'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import ScrollReveal from '../components/ui/ScrollReveal'
import { parts } from '../data/parts'
import type { PartCategory } from '../types/part'
import styles from './PartDetailPage.module.css'

const categoryVariantMap: Record<PartCategory, 'primary' | 'success' | 'warning' | 'danger' | 'default'> = {
  '电机': 'primary',
  '控制器': 'danger',
  '传感器': 'success',
  '结构件': 'default',
  '气动': 'warning',
  '电子元件': 'primary',
  '线材连接': 'default',
}

export default function PartDetailPage() {
  const { id } = useParams<{ id: string }>()
  const part = parts.find((p) => p.id === id)

  if (!part) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <Link to="/parts" className={styles.backLink}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            返回零件列表
          </Link>
          <h1 className={styles.name}>零件未找到</h1>
          <p className={styles.descriptionText}>
            未找到 ID 为 &quot;{id}&quot; 的零件，请检查链接是否正确。
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <ScrollReveal>
          <Link to="/parts" className={styles.backLink}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            返回零件列表
          </Link>
        </ScrollReveal>

        <ScrollReveal>
          <div className={styles.header}>
            <div className={styles.headerTop}>
              <Badge variant={categoryVariantMap[part.category]}>
                {part.category}
              </Badge>
            </div>
            <h1 className={styles.name}>{part.name}</h1>
            <div className={styles.meta}>
              <span className={styles.brand}>{part.brand}</span>
              <span className={styles.price}>{part.price}</span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <Card padding="lg">
            <div className={styles.specsSection}>
              <h2 className={styles.specsTitle}>技术规格</h2>
              <table className={styles.specsTable}>
                <tbody>
                  {part.specs.map((spec) => (
                    <tr key={spec.label}>
                      <td className={styles.specsLabel}>{spec.label}</td>
                      <td className={styles.specsValue}>{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className={styles.descriptionSection}>
            <h2 className={styles.descriptionTitle}>详细介绍</h2>
            <p className={styles.descriptionText}>{part.description}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className={styles.actions}>
            {part.purchaseUrl && (
              <a
                href={part.purchaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.purchaseLink}
              >
                <Button variant="primary" size="lg">
                  购买链接
                </Button>
              </a>
            )}
            <Link to="/parts">
              <Button variant="secondary" size="lg">
                返回零件列表
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
