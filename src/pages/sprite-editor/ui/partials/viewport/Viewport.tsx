import { useEffect, useRef, type FC } from 'react'
import styles from './Viewport.module.scss'
import { InteractiveCanvas } from './partials/InteractiveCanvas'
import { ImageCanvas } from './partials/ImageCanvas'
import { ImageEditor } from '@/pages/sprite-editor/controller'

export const Viewport: FC = () => {
  const viewportRef = useRef<HTMLElement>(null)

  const onViewportSizeChange = (entries: ResizeObserverEntry[]) => {
    const viewportElement = entries[0]
    ImageEditor.viewport.setSize({
      w: viewportElement.contentRect.width,
      h: viewportElement.contentRect.height
    })
  }

  useEffect(() => {
    if (!viewportRef.current) return
    const observer = new ResizeObserver(onViewportSizeChange)
    observer.observe(viewportRef.current)
    return () => observer.disconnect()
  }, [viewportRef])


  return (
    <>
      <main className={styles.viewport} ref={viewportRef}>
        <ImageCanvas />
        <InteractiveCanvas />
      </main>
    </>
  )
}

