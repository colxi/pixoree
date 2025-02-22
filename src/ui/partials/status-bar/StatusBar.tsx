import { Pixoree } from '@/controllers'
import { toFixed } from '@/tools/utils/math'
import { useEffect } from 'react'
import { useForceUpdate } from '@/tools/hooks'
import styles from './StatusBar.module.scss'
import type { FC } from 'react'

export const StatusBar: FC = () => {
  const { forceUpdate } = useForceUpdate()

  const zoomPercentage = toFixed(
    Pixoree.viewport.zoom * 100,
    Pixoree.viewport.zoomResolution
  )

  const scrollFormatted = {
    x: Math.floor(Pixoree.viewport.scroll.x * Pixoree.viewport.zoom),
    y: Math.floor(Pixoree.viewport.scroll.y * Pixoree.viewport.zoom)
  }

  useEffect(() => {
    Pixoree.eventBus.subscribe([
      'VIEWPORT_ZOOM_CHANGE',
      'VIEWPORT_SCROLL_CHANGE',
      'VIEWPORT_SIZE_CHANGE',
      'IMAGE_SIZE_CHANGE'
    ], forceUpdate)

    return () => {
      Pixoree.eventBus.unsubscribe([
        'VIEWPORT_ZOOM_CHANGE',
        'VIEWPORT_SCROLL_CHANGE',
        'VIEWPORT_SIZE_CHANGE',
        'IMAGE_SIZE_CHANGE'
      ], forceUpdate)
    }
  }, [])

  return (
    <main className={styles.statusBar}>
      <section className={styles.zoom}>Zoom: {zoomPercentage}%</section>
      <section>Scroll: x={scrollFormatted.x} y={scrollFormatted.y}</section>
      <section>Image: {Pixoree.image.size.w}px/{Pixoree.image.size.h}px</section>
      <section>Viewport: {Pixoree.viewport.size.w}px/{Pixoree.viewport.size.h}px</section>
    </main>
  )
}

