import type { FC } from 'react'
import React, { useEffect, useMemo, useState } from 'react'
import styles from './InteractiveCanvas.module.scss'
import { useSpriteEditorCanvasKeyBindings } from './SpriteEditorCanvas.keyBindings'
import { AnimationEngine } from '@/tools/utils/animation-engine'
import { PersistentPixelatedCanvas } from '@/tools/ui-components/persistent-pixelated-canvas/PersistentPixelatedCanvas'
import { Pixoree } from '@/controller'
import { useEvent, useForceUpdate } from '@/tools/hooks'
import { clearCanvas } from '@/tools/utils/canvas'
import { getElementCoordinatesFromMouseEvent } from '@/tools/utils/event'

enum ScrollMode {
  NORMAL = 1,
  INVERTED = -1
}

export const InteractiveCanvas: FC = () => {
  useSpriteEditorCanvasKeyBindings({
    undo: Pixoree.history.undo,
    redo: Pixoree.history.redo
  })

  const { forceUpdate } = useForceUpdate()
  const [isMOuseOverCanvas, setIsMOuseOverCanvas] = useState<boolean>(false)
  const [canvasMouseCoords, setCanvasMouseCoords] = useState({ x: 0, y: 0 })
  const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null>()
  const animation = useMemo(() => new AnimationEngine('HudCanvas'), [])
  const scrollMode = ScrollMode.INVERTED


  const handleOnMouseOut = async (_: React.MouseEvent | MouseEvent) => {
    setIsMOuseOverCanvas(false)
  }

  const handleCanvasMouseMove = async (e: React.MouseEvent | MouseEvent) => {
    const eventCoords = getElementCoordinatesFromMouseEvent(e)
    setCanvasMouseCoords(eventCoords)
    setIsMOuseOverCanvas(true)
    const imageCoords = Pixoree.viewport.mapToImageCoordinateSystem(canvasMouseCoords)
    Pixoree.tools.activeTool.onMouseMove(imageCoords)
  }

  const handleCanvasClick = async (_e: React.MouseEvent | MouseEvent) => {
    const imageCoords = Pixoree.viewport.mapToImageCoordinateSystem(canvasMouseCoords)
    Pixoree.tools.activeTool.onMouseDown(imageCoords)
  }

  const handleZoomGesture = (event: React.WheelEvent | WheelEvent) => {
    if (!canvasContext) return
    const zoomAmount = event.deltaY > 0 ? -0.05 : 0.05
    const newZoom = Pixoree.viewport.zoom + zoomAmount
    Pixoree.viewport.setZoom(newZoom)
  }

  const handleScrollGesture = (event: React.WheelEvent | WheelEvent) => {
    if (!canvasContext) return
    Pixoree.viewport.setScroll({
      x: Pixoree.viewport.scroll.x + ((event.deltaX / Pixoree.viewport.zoom) * scrollMode),
      y: Pixoree.viewport.scroll.y + ((event.deltaY / Pixoree.viewport.zoom) * scrollMode)
    })
  }

  const handleWheelGesture = (event: React.WheelEvent | WheelEvent) => {
    if (event.ctrlKey) handleZoomGesture(event)
    else handleScrollGesture(event)
  }

  const setContext = (context: CanvasRenderingContext2D | null) => {
    if (!context) return
    setCanvasContext(context)
  }

  const renderCursor = (canvasContext: CanvasRenderingContext2D) => {
    if (!isMOuseOverCanvas) return
    const pixelSize = Math.trunc(Pixoree.viewport.zoom)
    canvasContext.strokeStyle = 'red'
    const cursorCoord = {
      x: Math.floor((canvasMouseCoords.x / Pixoree.viewport.zoom)),
      y: Math.floor(canvasMouseCoords.y / Pixoree.viewport.zoom)
    }
    canvasContext.strokeRect(
      Math.floor(cursorCoord.x * Pixoree.viewport.zoom),
      Math.floor(cursorCoord.y * Pixoree.viewport.zoom),
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
    const imageCoords = Pixoree.viewport.mapToImageCoordinateSystem(canvasMouseCoords)
    Pixoree.tools.activeTool.onMouseUp(imageCoords)
  }

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp)
    Pixoree.eventBus.subscribe([
      Pixoree.eventBus.Event.VIEWPORT_ZOOM_CHANGE,
      Pixoree.eventBus.Event.VIEWPORT_SCROLL_CHANGE,
      Pixoree.eventBus.Event.HISTORY_CHANGE,
    ], render)
    Pixoree.eventBus.subscribe([
      Pixoree.eventBus.Event.VIEWPORT_SIZE_CHANGE,
    ], forceUpdate)

    return () => {
      animation.stop()
      Pixoree.eventBus.unsubscribe([
        Pixoree.eventBus.Event.VIEWPORT_ZOOM_CHANGE,
        Pixoree.eventBus.Event.VIEWPORT_SCROLL_CHANGE,
        Pixoree.eventBus.Event.HISTORY_CHANGE,
      ], render)
      Pixoree.eventBus.unsubscribe([
        Pixoree.eventBus.Event.VIEWPORT_SIZE_CHANGE
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
        width={Pixoree.viewport.size.w}
        height={Pixoree.viewport.size.h}
      />
    </>
  )
}

