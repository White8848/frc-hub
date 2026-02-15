import { useParams, Link } from 'react-router-dom'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import ScrollReveal from '../components/ui/ScrollReveal'
import { equipmentList } from '../data/equipment'
import type { EquipmentCategory } from '../types/equipment'
import styles from './EquipmentDetailPage.module.css'

const categoryBadgeVariant: Record<EquipmentCategory, 'default' | 'primary' | 'success' | 'warning' | 'danger'> = {
  'CNC加工': 'primary',
  '3D打印': 'success',
  '手动工具': 'default',
  '电动工具': 'warning',
  '测量仪器': 'danger',
  '焊接设备': 'warning',
}

export default function EquipmentDetailPage() {
  const { id } = useParams<{ id: string }>()
  const equipment = equipmentList.find((item) => item.id === id)

  if (!equipment) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.notFound}>
            <h1 className={styles.notFoundTitle}>设备未找到</h1>
            <p className={styles.notFoundText}>
              您访问的设备不存在或已被移除
            </p>
            <Link to="/equipment">
              <Button variant="secondary">返回设备列表</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link to="/equipment" className={styles.backLink}>
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
          返回设备列表
        </Link>

        <ScrollReveal>
          <header className={styles.header}>
            <div className={styles.headerMeta}>
              <Badge variant={categoryBadgeVariant[equipment.category]}>
                {equipment.category}
              </Badge>
              <span className={styles.price}>{equipment.priceRange}</span>
            </div>
            <h1 className={styles.title}>{equipment.name}</h1>
          </header>
        </ScrollReveal>

        <div className={styles.content}>
          <ScrollReveal>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>设备介绍</h2>
              <p className={styles.sectionText}>{equipment.description}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className={styles.section}>
              <div className={styles.recommendationBox}>
                <div className={styles.recommendationLabel}>
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
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                    <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                  </svg>
                  推荐理由
                </div>
                <p className={styles.sectionText}>{equipment.recommendation}</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>使用建议</h2>
              <div className={styles.tipsList}>
                {equipment.tips.map((tip, index) => (
                  <div key={index} className={styles.tipItem}>
                    <span className={styles.tipNumber}>{index + 1}</span>
                    <span className={styles.tipText}>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}
