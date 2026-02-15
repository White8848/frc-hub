import { cn } from '../../utils/cn'
import styles from './Pagination.module.css'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

function getPageNumbers(current: number, total: number): (number | '...')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const pages: (number | '...')[] = [1]

  if (current <= 3) {
    pages.push(2, 3, 4, 5, '...', total)
  } else if (current >= total - 2) {
    pages.push('...', total - 4, total - 3, total - 2, total - 1, total)
  } else {
    pages.push('...', current - 1, current, current + 1, '...', total)
  }

  return pages
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = getPageNumbers(currentPage, totalPages)
  const isFirst = currentPage === 1
  const isLast = currentPage === totalPages

  return (
    <nav className={cn(styles.container, className)} aria-label="Pagination">
      <button
        className={cn(styles.button, styles.nav)}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirst}
        aria-label="Previous page"
      >
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
        <span className={styles.navLabel}>Prev</span>
      </button>

      <div className={styles.pages}>
        {pages.map((page, index) =>
          page === '...' ? (
            <span key={`ellipsis-${index}`} className={styles.ellipsis}>
              ...
            </span>
          ) : (
            <button
              key={page}
              className={cn(
                styles.button,
                styles.page,
                page === currentPage && styles.active
              )}
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? 'page' : undefined}
              aria-label={`Page ${page}`}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        className={cn(styles.button, styles.nav)}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLast}
        aria-label="Next page"
      >
        <span className={styles.navLabel}>Next</span>
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
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </nav>
  )
}
