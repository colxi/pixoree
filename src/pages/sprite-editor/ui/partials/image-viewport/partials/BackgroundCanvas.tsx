import type { FC } from 'react'
import { useEffect, useMemo, useState } from 'react'
import styles from './BackgroundCanvas.module.scss'
import { PersistentPixelatedCanvas } from '@/tools/ui-components/persistent-pixelated-canvas/PersistentPixelatedCanvas'
import { AnimationEngine } from '@/tools/utils/animation-engine'
import { useEvent } from '@/tools/hooks'
import { ImageEditor } from '@/pages/sprite-editor/controller'

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
      ImageEditor.viewport.size.w,
      ImageEditor.viewport.size.h
    )

    // copy the image fom the buffer to the canvas
    const imageData = new ImageData(
      ImageEditor.image.imageBuffer,
      ImageEditor.image.size.w,
      ImageEditor.image.size.h
    )

    const bitmap = await createImageBitmap(
      imageData,
      ImageEditor.viewport.scroll.x,
      ImageEditor.viewport.scroll.y,
      ImageEditor.viewport.size.w,
      ImageEditor.viewport.size.h,
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
    canvasContext.scale(ImageEditor.image.zoom, ImageEditor.image.zoom)
  }

  const updateCanvas = useEvent(() => {
    if (!canvasContext) return
    setCanvasZoom()
    animationTick()
  })

  useEffect(updateCanvas, [canvasContext])

  useEffect(() => {
    ImageEditor.eventBus.subscribe([
      ImageEditor.eventBus.Event.VIEWPORT_ZOOM_CHANGE,
      ImageEditor.eventBus.Event.VIEWPORT_SCROLL_CHANGE,
      ImageEditor.eventBus.Event.HISTORY_CHANGE,
    ], updateCanvas)

    return () => {
      ImageEditor.eventBus.unsubscribe([
        ImageEditor.eventBus.Event.VIEWPORT_ZOOM_CHANGE,
        ImageEditor.eventBus.Event.VIEWPORT_SCROLL_CHANGE,
        ImageEditor.eventBus.Event.HISTORY_CHANGE,
      ], updateCanvas)
      animation.stop()
    }
  }, [])

  return (
    <>
      <PersistentPixelatedCanvas
        className={styles.imageCanvas}
        contextRef={setCanvasContext}
        width={ImageEditor.viewport.size.w}
        height={ImageEditor.viewport.size.w}
      />
    </>
  )
}

