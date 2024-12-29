import type { FC } from 'react'
import { useEffect } from 'react'
import styles from './StatusBar.module.scss'
import { ImageEditor } from '@/pages/sprite-editor/controller'
import { useForceUpdate } from '@/tools/hooks'
import { toFixed } from '@/tools/utils/math'

export const StatusBar: FC = () => {
  const { forceUpdate } = useForceUpdate()

  const zoomPercentage = toFixed(
    ImageEditor.viewport.zoom * 100,
    ImageEditor.viewport.zoomResolution
  )

  const scrollFormatted = {
    x: Math.floor(ImageEditor.viewport.scroll.x * ImageEditor.viewport.zoom),
    y: Math.floor(ImageEditor.viewport.scroll.y * ImageEditor.viewport.zoom)
  }

  useEffect(() => {
    ImageEditor.eventBus.subscribe([
      ImageEditor.eventBus.Event.VIEWPORT_ZOOM_CHANGE,
      ImageEditor.eventBus.Event.VIEWPORT_SCROLL_CHANGE,
      ImageEditor.eventBus.Event.VIEWPORT_SIZE_CHANGE,
      ImageEditor.eventBus.Event.IMAGE_SIZE_CHANGE
    ], forceUpdate)

    return () => {
      ImageEditor.eventBus.unsubscribe([
        ImageEditor.eventBus.Event.VIEWPORT_ZOOM_CHANGE,
        ImageEditor.eventBus.Event.VIEWPORT_SCROLL_CHANGE,
        ImageEditor.eventBus.Event.VIEWPORT_SIZE_CHANGE,
        ImageEditor.eventBus.Event.IMAGE_SIZE_CHANGE
      ], forceUpdate)
    }
  }, [])

  return (
    <main className={styles.statusBar}>
      <section className={styles.zoom}>Zoom: {zoomPercentage}%</section>
      <section>Scroll: x={scrollFormatted.x} y={scrollFormatted.y}</section>
      <section>Image: {ImageEditor.image.size.w}px/{ImageEditor.image.size.h}px</section>
      <section>Viewport: {ImageEditor.viewport.size.w}px/{ImageEditor.viewport.size.h}px</section>
    </main>
  )
}

