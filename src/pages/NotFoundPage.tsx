import { Link } from 'react-router-dom'
import styles from './NotFoundPage.module.css'

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <span className={styles.errorCode}>404</span>
        <h1 className={styles.title}>页面未找到</h1>
        <p className={styles.description}>
          抱歉，您访问的页面不存在或已被移除。
        </p>
        <Link to="/" className={styles.homeLink}>
          返回首页
        </Link>
      </div>
    </div>
  )
}
