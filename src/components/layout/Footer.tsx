import { Link } from 'react-router-dom'
import { FOOTER_LINKS, SITE_NAME } from '../../data/constants'
import styles from './Footer.module.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.columns}>
          <div>
            <h3 className={styles.columnTitle}>平台</h3>
            <ul className={styles.linkList}>
              {FOOTER_LINKS.platform.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={styles.columnTitle}>社区</h3>
            <ul className={styles.linkList}>
              {FOOTER_LINKS.community.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={styles.columnTitle}>外部链接</h3>
            <ul className={styles.linkList}>
              {FOOTER_LINKS.external.map((item) => (
                <li key={item.url}>
                  <a
                    href={item.url}
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.bottom}>
          <span className={styles.brand}>{SITE_NAME}</span>
          <p className={styles.copyright}>
            &copy; {currentYear} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
