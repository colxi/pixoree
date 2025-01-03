import { useEffect, useRef, type FC } from 'react'
import { InteractiveCanvas } from './partials/InteractiveCanvas'
import { ImageCanvas } from './partials/ImageCanvas'
import { Pixoree } from '@/controller'
import styles from './ImageViewport.module.scss'

export const ImageViewport: FC = () => {
  const viewportRef = useRef<HTMLElement>(null)

  const onViewportSizeChange = (entries: ResizeObserverEntry[]) => {
    const viewportElement = entries[0]
    Pixoree.viewport.setSize({
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

