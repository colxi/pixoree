import { useEffect, useRef, type FC } from 'react'
import { useForceUpdate } from '@/tools/hooks'
import { formatBytes } from '@/tools/utils/formatters'
import { PanelBox } from '../../panel-box/PanelBox'
import styles from './HistoryPanel.module.scss'
import { TrashCanIcon } from '@/tools/ui-components/icons'
import { Pixoree } from '@/controller'

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
    Pixoree.eventBus.subscribe(Pixoree.eventBus.Event.HISTORY_CHANGE, forceUpdate)

    return () => Pixoree.eventBus.unsubscribe(Pixoree.eventBus.Event.HISTORY_CHANGE, forceUpdate)
  }, [])

  return (
    <>
      <PanelBox title="History">
        <section
          className={styles.historyEntries}
          ref={entriesContainerElementRef}
        >
          {Pixoree.history.entries.map(
            (item, index) =>
              <div
                key={index}
                onClick={() => Pixoree.history.load(index)}
                className={styles.historyRow}
                data-active={index === Pixoree.history.currentIndex ? 'true' : 'false'}
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
    </>
  )
}

