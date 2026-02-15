import { useEffect, useRef, useState } from 'react'
import { cn } from '../../utils/cn'
import styles from './ScrollReveal.module.css'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

function ScrollReveal({ children, delay, className }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(element)
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={ref}
      className={cn(styles.wrapper, visible && styles.visible, className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}

export default ScrollReveal
