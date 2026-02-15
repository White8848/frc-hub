import { useState, useCallback } from 'react'
import { cn } from '../../utils/cn'
import Skeleton from './Skeleton'
import styles from './OptimizedImage.module.css'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  objectFit?: 'cover' | 'contain'
}

function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  objectFit = 'cover',
}: OptimizedImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [errored, setErrored] = useState(false)

  const handleLoad = useCallback(() => {
    setLoaded(true)
  }, [])

  const handleError = useCallback(() => {
    setErrored(true)
  }, [])

  return (
    <div
      className={cn(styles.wrapper, className)}
      style={{ width: width ? `${width}px` : undefined, height: height ? `${height}px` : undefined }}
    >
      {!loaded && !errored && (
        <Skeleton className={styles.skeleton} width="100%" height="100%" borderRadius="0" />
      )}

      {errored ? (
        <div className={styles.fallback}>
          <span>{alt || 'Image unavailable'}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={handleLoad}
          onError={handleError}
          className={cn(styles.image, loaded && styles.loaded)}
          style={{ objectFit }}
        />
      )}
    </div>
  )
}

export default OptimizedImage
