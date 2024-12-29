import type { FC } from 'react'
import { useEffect, useMemo, useState } from 'react'
import styles from './InteractiveCanvas.module.scss'
import { useSpriteEditorCanvasKeyBindings } from './SpriteEditorCanvas.keyBindings'
import { CanvasMouseEvent } from '../../../utils'
import { AnimationEngine } from '@/tools/utils/animation-engine'
import { PersistentPixelatedCanvas } from '@/tools/ui-components/persistent-pixelated-canvas/PersistentPixelatedCanvas'
import { ImageEditor } from '@/pages/sprite-editor/controller'
import { useEvent, useForceUpdate } from '@/tools/hooks'
import { clearCanvas } from '@/tools/utils/canvas'
import { getElementCoordsFromMouseEvent } from '@/tools/utils/event'

enum ScrollMode {
  NORMAL = 1,
  INVERTED = -1
}

export const InteractiveCanvas: FC = () => {
  useSpriteEditorCanvasKeyBindings({
    undo: ImageEditor.history.undo,
    redo: ImageEditor.history.redo
  })

  const { forceUpdate } = useForceUpdate()
  const [isMOuseOverCanvas, setIsMOuseOverCanvas] = useState<boolean>(false)
  const [canvasMouseCoords, setCanvasMouseCoords] = useState({ x: 0, y: 0 })
  const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null>()
  const animation = useMemo(() => new AnimationEngine('HudCanvas'), [])
  const scrollMode = ScrollMode.INVERTED


  const handleOnMouseOut = async (_: CanvasMouseEvent) => {
    setIsMOuseOverCanvas(false)
  }

  const handleCanvasMouseMove = async (e: CanvasMouseEvent) => {
    const eventCoords = getElementCoordsFromMouseEvent(e)
    setCanvasMouseCoords(eventCoords)
    setIsMOuseOverCanvas(true)
    const imageCoords = ImageEditor.viewport.mapToImageCoordinateSystem(canvasMouseCoords)
    ImageEditor.tools.activeTool.onMouseMove(imageCoords)
  }

  const handleCanvasClick = async (_e: CanvasMouseEvent) => {
    const imageCoords = ImageEditor.viewport.mapToImageCoordinateSystem(canvasMouseCoords)
    ImageEditor.tools.activeTool.onMouseDown(imageCoords)
  }

  const handleZoomGesture = (event: React.WheelEvent<HTMLCanvasElement>) => {
    if (!canvasContext) return
    const zoomAmount = event.deltaY > 0 ? -0.05 : 0.05
    const newZoom = ImageEditor.viewport.zoom + zoomAmount
    ImageEditor.viewport.setZoom(newZoom)
  }

  const handleScrollGesture = (event: React.WheelEvent<HTMLCanvasElement>) => {
    if (!canvasContext) return
    ImageEditor.viewport.setScroll({
      x: ImageEditor.viewport.scroll.x + ((event.deltaX / ImageEditor.viewport.zoom) * scrollMode),
      y: ImageEditor.viewport.scroll.y + ((event.deltaY / ImageEditor.viewport.zoom) * scrollMode)
    })
  }

  const handleWheelGesture = (event: React.WheelEvent<HTMLCanvasElement>) => {
    if (event.ctrlKey) handleZoomGesture(event)
    else handleScrollGesture(event)
  }

  const setContext = (context: CanvasRenderingContext2D | null) => {
    if (!context) return
    setCanvasContext(context)
  }

  const renderCursor = (canvasContext: CanvasRenderingContext2D) => {
    if (!isMOuseOverCanvas) return
    const pixelSize = Math.trunc(ImageEditor.viewport.zoom)
    canvasContext.strokeStyle = 'red'
    const cursorCoord = {
      x: Math.floor((canvasMouseCoords.x / ImageEditor.viewport.zoom)),
      y: Math.floor(canvasMouseCoords.y / ImageEditor.viewport.zoom)
    }
    canvasContext.strokeRect(
      Math.floor(cursorCoord.x * ImageEditor.viewport.zoom),
      Math.floor(cursorCoord.y * ImageEditor.viewport.zoom),
      pixelSize,
      pixelSize
    )
  }

  const render = useEvent(() => {
    if (canvasContext) {
      clearCanvas(canvasContext)
      renderCursor(canvasContext)
    }
    animation.requestFrame(render)
  })

  const handleMouseUp = () => {
    const imageCoords = ImageEditor.viewport.mapToImageCoordinateSystem(canvasMouseCoords)
    ImageEditor.tools.activeTool.onMouseUp(imageCoords)
  }

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp)
    ImageEditor.eventBus.subscribe([
      ImageEditor.eventBus.Event.VIEWPORT_ZOOM_CHANGE,
      ImageEditor.eventBus.Event.VIEWPORT_SCROLL_CHANGE,
      ImageEditor.eventBus.Event.HISTORY_CHANGE,
    ], render)
    ImageEditor.eventBus.subscribe([
      ImageEditor.eventBus.Event.VIEWPORT_SIZE_CHANGE,
    ], forceUpdate)

    return () => {
      animation.stop()
      ImageEditor.eventBus.unsubscribe([
        ImageEditor.eventBus.Event.VIEWPORT_ZOOM_CHANGE,
        ImageEditor.eventBus.Event.VIEWPORT_SCROLL_CHANGE,
        ImageEditor.eventBus.Event.HISTORY_CHANGE,
      ], render)
      ImageEditor.eventBus.unsubscribe([
        ImageEditor.eventBus.Event.VIEWPORT_SIZE_CHANGE
      ], forceUpdate)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <>
      <PersistentPixelatedCanvas
        className={styles.hudCanvas}
        contextRef={setContext}
        onMouseMove={handleCanvasMouseMove}
        onMouseDown={handleCanvasClick}
        onMouseOut={handleOnMouseOut}
        onWheel={handleWheelGesture}
        width={ImageEditor.viewport.size.w}
        height={ImageEditor.viewport.size.h}
      />
    </>
  )
}

