import { cn } from '../../utils/cn'
import styles from './Skeleton.module.css'

interface SkeletonProps {
  width?: string
  height?: string
  borderRadius?: string
  className?: string
}

function Skeleton({ width, height, borderRadius, className }: SkeletonProps) {
  return (
    <div
      className={cn(styles.skeleton, className)}
      style={{ width, height, borderRadius }}
      aria-hidden="true"
    />
  )
}

export default Skeleton
