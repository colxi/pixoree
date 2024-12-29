import { useEffect, useRef, type FC } from 'react'
import { useForceUpdate } from '@/tools/hooks'
import { formatBytes } from '@/tools/utils/formatters'
import { PanelBox } from '../../panel-box/PanelBox'
import { ImageEditor } from '../../../../../controller'
import styles from './HistoryPanel.module.scss'
import { TrashCanIcon } from '@/tools/ui-components/icons'

export const HistoryPanel: FC = () => {
  const { forceUpdate, afterForceUpdate } = useForceUpdate()
  const entriesContainerElementRef = useRef<HTMLDivElement | null>(null)

  const getHistorySize = () => {
    let totalSize = 0
    ImageEditor.history.entries.forEach(item => totalSize += item.data.length)
    return formatBytes(totalSize)
  }

  const updateScrollPosition = () => {
    if (!entriesContainerElementRef.current) return
    if (ImageEditor.history.currentIndex === ImageEditor.history.entries.length - 1) {
      entriesContainerElementRef.current.scrollTop = entriesContainerElementRef.current.scrollHeight
    }
  }

  useEffect(() => {
    afterForceUpdate(updateScrollPosition)
    ImageEditor.eventBus.subscribe(ImageEditor.eventBus.Event.HISTORY_CHANGE, forceUpdate)

    return () => ImageEditor.eventBus.unsubscribe(ImageEditor.eventBus.Event.HISTORY_CHANGE, forceUpdate)
  }, [])

  return (
    <>
      <PanelBox title="History">
        <section
          className={styles.historyEntries}
          ref={entriesContainerElementRef}
        >
          {ImageEditor.history.entries.map(
            (item, index) =>
              <div
                key={index}
                onClick={() => ImageEditor.history.load(index)}
                className={styles.historyRow}
                data-active={index === ImageEditor.history.currentIndex ? 'true' : 'false'}
              >
                <div className={styles.historyRowIcon}>{item.icon}</div>
                <div className={styles.historyRowAction}>{item.action}</div>
              </div>
          )}
        </section>
        <section className={styles.statusBar}>
          <div>History size: {getHistorySize()}</div>
          <div onClick={() => ImageEditor.history.deleteEntry(ImageEditor.history.currentIndex)}>
            <TrashCanIcon />
          </div>
        </section>
      </PanelBox>
    </>
  )
}

