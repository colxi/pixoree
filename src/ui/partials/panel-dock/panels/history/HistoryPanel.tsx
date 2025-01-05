import { PanelBox } from '../../panel-box/PanelBox'
import { Pixoree } from '@/controller'
import { TrashCanIcon } from '@/tools/ui-components/icons'
import { formatBytes } from '@/tools/utils/formatters'
import { useEffect, useRef } from 'react'
import { useForceUpdate } from '@/tools/hooks'
import styles from './HistoryPanel.module.scss'
import type { FC } from 'react'

export const HistoryPanel: FC = () => {
  const { forceUpdate, afterForceUpdate } = useForceUpdate()
  const entriesContainerElementRef = useRef<HTMLDivElement | null>(null)

  const getHistorySize = () => {
    let totalSize = 0
    Pixoree.history.entries.forEach(item => totalSize += item.data.length)
    return formatBytes(totalSize)
  }

  const updateScrollPosition = () => {
    if (!entriesContainerElementRef.current) return
    if (Pixoree.history.currentIndex === Pixoree.history.entries.length - 1) {
      entriesContainerElementRef.current.scrollTop = entriesContainerElementRef.current.scrollHeight
    }
  }

  useEffect(() => {
    afterForceUpdate(updateScrollPosition)
    Pixoree.eventBus.subscribe('HISTORY_CHANGE', forceUpdate)

    return () => Pixoree.eventBus.unsubscribe('HISTORY_CHANGE', forceUpdate)
  }, [])

  return (
    <PanelBox title="History">
      <section
        className={styles.historyEntries}
        ref={entriesContainerElementRef}
      >
        {Pixoree.history.entries.map(
          (item, index) =>
            <div
              className={styles.historyRow}
              data-active={index === Pixoree.history.currentIndex ? 'true' : 'false'}
              key={index}
              onClick={() => Pixoree.history.load(index)}
            >
              <div className={styles.historyRowIcon}>{item.icon}</div>
              <div className={styles.historyRowAction}>{item.action}</div>
            </div>
        )}
      </section>
      <section className={styles.statusBar}>
        <div>History size: {getHistorySize()}</div>
        <div onClick={() => Pixoree.history.deleteEntry(Pixoree.history.currentIndex)}>
          <TrashCanIcon />
        </div>
      </section>
    </PanelBox>
  )
}

