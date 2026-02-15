import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { type NavLink, NAV_LINKS, SITE_NAME } from '../../data/constants'
import { cn } from '../../utils/cn'
import styles from './Navbar.module.css'

interface NavbarProps {
  isMenuOpen: boolean
  onMenuToggle: () => void
}

export default function Navbar({ isMenuOpen, onMenuToggle }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 8)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <header className={cn(styles.navbar, scrolled && styles.scrolled)}>
      <nav className={styles.inner}>
        <Link to="/" className={styles.brand}>
          <span className={styles.logoIcon} aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="7" fill="var(--color-primary)" />
              <path
                d="M8 10h4.5v8H8v-8Zm7.5 0H20v3h-4.5v-3Zm0 5H20v3h-4.5v-3Z"
                fill="#fff"
              />
            </svg>
          </span>
          <span className={styles.brandText}>{SITE_NAME}</span>
        </Link>

        <ul className={styles.navLinks}>
          {NAV_LINKS.map((link: NavLink) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={cn(
                  styles.navLink,
                  pathname === link.path && styles.active,
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className={cn(styles.hamburger, isMenuOpen && styles.hamburgerOpen)}
          onClick={onMenuToggle}
          aria-label={isMenuOpen ? '关闭菜单' : '打开菜单'}
          aria-expanded={isMenuOpen}
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>
      </nav>
    </header>
  )
}
