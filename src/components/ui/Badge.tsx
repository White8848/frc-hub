import type { ReactNode } from 'react'
import { cn } from '../../utils/cn'
import styles from './Badge.module.css'

type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantClassMap: Record<BadgeVariant, string> = {
  default: styles.variantDefault,
  primary: styles.variantPrimary,
  success: styles.variantSuccess,
  warning: styles.variantWarning,
  danger: styles.variantDanger,
}

export default function Badge({
  children,
  variant = 'default',
  className,
}: BadgeProps) {
  return (
    <span className={cn(styles.badge, variantClassMap[variant], className)}>
      {children}
    </span>
  )
}
