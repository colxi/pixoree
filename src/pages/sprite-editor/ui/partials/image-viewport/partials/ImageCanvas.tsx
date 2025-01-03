import type { FC } from 'react'
import { useEffect, useMemo, useState } from 'react'
import styles from './ImageCanvas.module.scss'
import { PersistentPixelatedCanvas } from '@/tools/ui-components/persistent-pixelated-canvas/PersistentPixelatedCanvas'
import { AnimationEngine } from '@/tools/utils/animation-engine'
import { useEvent, useForceUpdate } from '@/tools/hooks'
import { Pixoree } from '@/pages/sprite-editor/controller'
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
      Math.floor(Pixoree.viewport.size.w * Pixoree.viewport.zoom),
      Math.floor(Pixoree.viewport.size.h * Pixoree.viewport.zoom)
    )

    // copy the image fom the buffer to the canvas
    const imageData = new ImageData(
      Pixoree.image.imageBuffer,
      Pixoree.image.size.w,
      Pixoree.image.size.h
    )

    canvasContext.drawImage(
      await createImageBitmap(imageData),
      Math.floor(Pixoree.viewport.scroll.x * Pixoree.viewport.zoom),
      Math.floor(Pixoree.viewport.scroll.y * Pixoree.viewport.zoom)
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
    canvasContext.scale(Pixoree.viewport.zoom, Pixoree.viewport.zoom)
    animationTick()
  })

  const updateCanvasContext = (context: CanvasRenderingContext2D | null) => {
    setCanvasContext(context)
    initAnimationLoop()
  }

  useEffect(() => {
    Pixoree.history.register('Create', <FileTextIcon />)
    Pixoree.eventBus.subscribe([
      Pixoree.eventBus.Event.VIEWPORT_ZOOM_CHANGE,
      Pixoree.eventBus.Event.VIEWPORT_SCROLL_CHANGE,
      Pixoree.eventBus.Event.HISTORY_CHANGE,
    ], initAnimationLoop)
    Pixoree.eventBus.subscribe([
      Pixoree.eventBus.Event.VIEWPORT_SIZE_CHANGE,
    ], forceUpdate)

    return () => {
      Pixoree.eventBus.unsubscribe([
        Pixoree.eventBus.Event.VIEWPORT_ZOOM_CHANGE,
        Pixoree.eventBus.Event.VIEWPORT_SCROLL_CHANGE,
        Pixoree.eventBus.Event.HISTORY_CHANGE,
      ], initAnimationLoop)
      Pixoree.eventBus.unsubscribe([
        Pixoree.eventBus.Event.VIEWPORT_SIZE_CHANGE
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
        width={Pixoree.viewport.size.w}
        height={Pixoree.viewport.size.h}
      />
    </>
  )
}

