import styles from './PanelBox.module.scss'
import type { FC } from 'react'

interface Props {
  children: React.ReactNode
  title: string
  height?: number | 'auto'
}

export const PanelBox: FC<Props> = ({ children, title, height = 'auto' }) => {
  return (
    <section className={styles.panelBox}>
      <div className={styles.titleRow}>
        <div className={styles.title}>{title}</div>
        <div className={styles.titleUnusedSpace}></div>
      </div>
      <div
        className={styles.body}
        style={{ height: height ? `${height}px` : 'auto' }}
      >
        {children}
      </div>
    </section >
  )
}
