import { AnimationEngine } from '@/tools/utils/animation-engine'
import { PersistentPixelatedCanvas } from '@/tools/ui-components/persistent-pixelated-canvas/PersistentPixelatedCanvas'
import { Pixoree } from '@/controller'
import { useEffect, useMemo, useState } from 'react'
import { useEvent } from '@/tools/hooks'
import styles from './BackgroundCanvas.module.scss'
import type { FC } from 'react'

export const ImageCanvas: FC = () => {
  const animation = useMemo(() => new AnimationEngine('ImageCanvas'), [])
  const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null>()

  const renderCanvas = async () => {
    if (!canvasContext) return
    // clear the canvas
    canvasContext.fillStyle = '#282828'
    canvasContext.fillRect(
      0,
      0,
      Pixoree.viewport.size.w,
      Pixoree.viewport.size.h
    )

    // copy the image fom the buffer to the canvas
    const imageData = new ImageData(
      Pixoree.image.imageBuffer,
      Pixoree.image.size.w,
      Pixoree.image.size.h
    )

    const bitmap = await createImageBitmap(
      imageData,
      Pixoree.viewport.scroll.x,
      Pixoree.viewport.scroll.y,
      Pixoree.viewport.size.w,
      Pixoree.viewport.size.h,
    )
    canvasContext.drawImage(bitmap, 0, 0)
  }

  const animationTick = () => {
    renderCanvas()
    animation.requestFrame(animationTick)
  }

  const setCanvasZoom = () => {
    if (!canvasContext) return
    canvasContext.resetTransform()
    canvasContext.scale(Pixoree.image.zoom, Pixoree.image.zoom)
  }

  const updateCanvas = useEvent(() => {
    if (!canvasContext) return
    setCanvasZoom()
    animationTick()
  })

  useEffect(updateCanvas, [canvasContext])

  useEffect(() => {
    Pixoree.eventBus.subscribe([
      Pixoree.eventBus.Event.VIEWPORT_ZOOM_CHANGE,
      Pixoree.eventBus.Event.VIEWPORT_SCROLL_CHANGE,
      Pixoree.eventBus.Event.HISTORY_CHANGE,
    ], updateCanvas)

    return () => {
      Pixoree.eventBus.unsubscribe([
        Pixoree.eventBus.Event.VIEWPORT_ZOOM_CHANGE,
        Pixoree.eventBus.Event.VIEWPORT_SCROLL_CHANGE,
        Pixoree.eventBus.Event.HISTORY_CHANGE,
      ], updateCanvas)
      animation.stop()
    }
  }, [])

  return (
    <>
      <PersistentPixelatedCanvas
        className={styles.imageCanvas}
        contextRef={setCanvasContext}
        height={Pixoree.viewport.size.w}
        width={Pixoree.viewport.size.w}
      />
    </>
  )
}

