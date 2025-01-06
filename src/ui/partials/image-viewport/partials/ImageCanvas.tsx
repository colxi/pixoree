import { AnimationEngine } from '@/tools/utils/animation-engine'
import { FileTextIcon } from '@/tools/ui-components/icons'
import { PersistentPixelatedCanvas } from '@/tools/ui-components/persistent-pixelated-canvas/PersistentPixelatedCanvas'
import { Pixoree } from '@/controllers'
import { clearCanvas } from '@/tools/utils/canvas'
import { useEffect, useMemo, useState } from 'react'
import { useEvent, useForceUpdate } from '@/tools/hooks'
import styles from './ImageCanvas.module.scss'
import type { FC } from 'react'

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
      'VIEWPORT_ZOOM_CHANGE',
      'VIEWPORT_SCROLL_CHANGE',
      'HISTORY_CHANGE',
    ], initAnimationLoop)
    Pixoree.eventBus.subscribe([
      'VIEWPORT_SIZE_CHANGE',
    ], forceUpdate)

    return () => {
      Pixoree.eventBus.unsubscribe([
        'VIEWPORT_ZOOM_CHANGE',
        'VIEWPORT_SCROLL_CHANGE',
        'HISTORY_CHANGE',
      ], initAnimationLoop)
      Pixoree.eventBus.unsubscribe([
        'VIEWPORT_SIZE_CHANGE'
      ], forceUpdate)
      animation.stop()
    }
  }, [])

  return (
    <PersistentPixelatedCanvas
      className={styles.imageCanvas}
      contextRef={updateCanvasContext}
      height={Pixoree.viewport.size.h}
      id='ImageCanvas'
      width={Pixoree.viewport.size.w}
    />
  )
}

