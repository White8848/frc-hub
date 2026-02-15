import { Link, useLocation } from 'react-router-dom'
import { NAV_LINKS } from '../../data/constants'
import { cn } from '../../utils/cn'
import styles from './MobileMenu.module.css'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { pathname } = useLocation()

  return (
    <>
      {/* Overlay backdrop */}
      <div
        className={cn(styles.overlay, isOpen && styles.overlayOpen)}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <aside
        className={cn(styles.drawer, isOpen && styles.drawerOpen)}
        aria-label="Mobile navigation"
        role="dialog"
        aria-modal={isOpen}
      >
        <div className={styles.header}>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close menu"
          >
            <svg
              className={styles.closeIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={cn(
                    styles.navLink,
                    pathname === link.path && styles.navLinkActive
                  )}
                  onClick={onClose}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  )
}
