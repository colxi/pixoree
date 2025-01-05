import { AnimationEngine } from '@/tools/utils/animation-engine'
import { PersistentPixelatedCanvas } from '@/tools/ui-components/persistent-pixelated-canvas/PersistentPixelatedCanvas'
import { Pixoree } from '@/controller'
import { clearCanvas } from '@/tools/utils/canvas'
import { getElementCoordinatesFromMouseEvent } from '@/tools/utils/event'
import { useEvent, useForceUpdate } from '@/tools/hooks'
import React, { useEffect, useMemo, useState } from 'react'
import styles from './InteractiveCanvas.module.scss'
import type { FC } from 'react'


type ScrollMode = 'normal' | 'inverted'

const scrollModeModifier: Record<ScrollMode, number> = {
  'normal': 1,
  'inverted': -1
}

export const InteractiveCanvas: FC = () => {
  const { forceUpdate } = useForceUpdate()
  const [isMOuseOverCanvas, setIsMOuseOverCanvas] = useState<boolean>(false)
  const [canvasMouseCoords, setCanvasMouseCoords] = useState({ x: 0, y: 0 })
  const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null>()
  const animation = useMemo(() => new AnimationEngine('HudCanvas'), [])
  const scrollMode: ScrollMode = 'inverted'


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
    const scrollModifier = scrollModeModifier[scrollMode]
    Pixoree.viewport.setScroll({
      x: Pixoree.viewport.scroll.x + ((event.deltaX / Pixoree.viewport.zoom) * scrollModifier),
      y: Pixoree.viewport.scroll.y + ((event.deltaY / Pixoree.viewport.zoom) * scrollModifier)
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
      'VIEWPORT_ZOOM_CHANGE',
      'VIEWPORT_SCROLL_CHANGE',
      'HISTORY_CHANGE',
    ], render)
    Pixoree.eventBus.subscribe([
      'VIEWPORT_SIZE_CHANGE',
    ], forceUpdate)

    return () => {
      animation.stop()
      Pixoree.eventBus.unsubscribe([
        'VIEWPORT_ZOOM_CHANGE',
        'VIEWPORT_SCROLL_CHANGE',
        'HISTORY_CHANGE',
      ], render)
      Pixoree.eventBus.unsubscribe([
        'VIEWPORT_SIZE_CHANGE'
      ], forceUpdate)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <PersistentPixelatedCanvas
      className={styles.hudCanvas}
      contextRef={setContext}
      height={Pixoree.viewport.size.h}
      width={Pixoree.viewport.size.w}
      onMouseDown={handleCanvasClick}
      onMouseMove={handleCanvasMouseMove}
      onMouseOut={handleOnMouseOut}
      onWheel={handleWheelGesture}
    />
  )
}

