import { ImageCanvas } from './partials/ImageCanvas'
import { InteractiveCanvas } from './partials/InteractiveCanvas'
import { Pixoree } from '@/controller'
import { useEffect, useRef } from 'react'
import styles from './ImageViewport.module.scss'
import type { FC } from 'react'

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
    <main className={styles.viewport} ref={viewportRef}>
      <ImageCanvas />
      <InteractiveCanvas />
    </main>
  )
}

