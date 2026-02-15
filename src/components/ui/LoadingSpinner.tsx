import { cn } from '../../utils/cn'
import styles from './LoadingSpinner.module.css'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function LoadingSpinner({
  size = 'md',
  className,
}: LoadingSpinnerProps) {
  return (
    <span
      className={cn(styles.spinner, styles[size], className)}
      role="status"
      aria-label="Loading"
    />
  )
}
