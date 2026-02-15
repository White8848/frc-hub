import { cn } from '../../utils/cn'
import styles from './Card.module.css'

interface CardProps {
  children: React.ReactNode
  className?: string
  hoverable?: boolean
  padding?: 'sm' | 'md' | 'lg'
  onClick?: () => void
}

function Card({
  children,
  className,
  hoverable = false,
  padding = 'md',
  onClick,
}: CardProps) {
  return (
    <div
      className={cn(
        styles.card,
        styles[`padding-${padding}`],
        hoverable && styles.hoverable,
        onClick && styles.clickable,
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick()
              }
            }
          : undefined
      }
    >
      {children}
    </div>
  )
}

export default Card
