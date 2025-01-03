import type { FC } from 'react'
import { useEffect, useMemo, useState } from 'react'
import styles from './ImageCanvas.module.scss'
import { PersistentPixelatedCanvas } from '@/tools/ui-components/persistent-pixelated-canvas/PersistentPixelatedCanvas'
import { AnimationEngine } from '@/tools/utils/animation-engine'
import { useEvent, useForceUpdate } from '@/tools/hooks'
import { ImageEditor } from '@/pages/sprite-editor/controller'
import { clearCanvas } from '@/tools/utils/canvas'
import { FileTextIcon } from '@/tools/ui-components/icons'

export const ImageCanvas: FC = () => {
  const { forceUpdate } = useForceUpdate()
  const animation = useMemo(() => new AnimationEngine('ImageCanvas'), [])
  const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null>(null)

  const renderCanvas = async (canvasContext: CanvasRenderingContext2D) => {
    if (!canvasContext) return
    // clear the canvas
    canvasContext.fillStyle = '#282828'
    canvasContext.fillRect(
      0,
      0,
      Math.floor(ImageEditor.viewport.size.w * ImageEditor.viewport.zoom),
      Math.floor(ImageEditor.viewport.size.h * ImageEditor.viewport.zoom)
    )

    // copy the image fom the buffer to the canvas
    const imageData = new ImageData(
      ImageEditor.image.imageBuffer,
      ImageEditor.image.size.w,
      ImageEditor.image.size.h
    )

    canvasContext.drawImage(
      await createImageBitmap(imageData),
      Math.floor(ImageEditor.viewport.scroll.x * ImageEditor.viewport.zoom),
      Math.floor(ImageEditor.viewport.scroll.y * ImageEditor.viewport.zoom)
    )
  }

  const animationTick = () => {
    if (canvasContext) {
      clearCanvas(canvasContext)
      renderCanvas(canvasContext)
    }
    animation.requestFrame(animationTick)
  }

  const initAnimationLoop = useEvent(() => {
    if (!canvasContext) return
    canvasContext.resetTransform()
    canvasContext.scale(ImageEditor.viewport.zoom, ImageEditor.viewport.zoom)
    animationTick()
  })

  const updateCanvasContext = (context: CanvasRenderingContext2D | null) => {
    setCanvasContext(context)
    initAnimationLoop()
  }

  useEffect(() => {
    ImageEditor.history.register('Create', <FileTextIcon />)
    ImageEditor.eventBus.subscribe([
      ImageEditor.eventBus.Event.VIEWPORT_ZOOM_CHANGE,
      ImageEditor.eventBus.Event.VIEWPORT_SCROLL_CHANGE,
      ImageEditor.eventBus.Event.HISTORY_CHANGE,
    ], initAnimationLoop)
    ImageEditor.eventBus.subscribe([
      ImageEditor.eventBus.Event.VIEWPORT_SIZE_CHANGE,
    ], forceUpdate)

    return () => {
      ImageEditor.eventBus.unsubscribe([
        ImageEditor.eventBus.Event.VIEWPORT_ZOOM_CHANGE,
        ImageEditor.eventBus.Event.VIEWPORT_SCROLL_CHANGE,
        ImageEditor.eventBus.Event.HISTORY_CHANGE,
      ], initAnimationLoop)
      ImageEditor.eventBus.unsubscribe([
        ImageEditor.eventBus.Event.VIEWPORT_SIZE_CHANGE
      ], forceUpdate)
      animation.stop()
    }
  }, [])

  return (
    <>
      <PersistentPixelatedCanvas
        id='ImageCanvas'
        className={styles.imageCanvas}
        contextRef={updateCanvasContext}
        width={ImageEditor.viewport.size.w}
        height={ImageEditor.viewport.size.h}
      />
    </>
  )
}

