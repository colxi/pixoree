import { AnimationEngine } from '@/tools/utils/animation-engine'
import { PanelBox } from '../../panel-box/PanelBox'
import { PersistentPixelatedCanvas } from '@/tools/ui-components/persistent-pixelated-canvas/PersistentPixelatedCanvas'
import { Pixoree } from '@/controller'
import { minMax } from '@/tools/utils/math'
import { useEvent, useForceUpdate } from '@/tools/hooks'
import React, { useEffect, useMemo, useState } from 'react'
import styles from './SpriteEditorNavigator.module.css'
import type { Coordinates, Size } from '@/types'
import type { FC } from 'react'

const getCanvasClickMouseCoords = (
  e: React.MouseEvent | MouseEvent,
  canvasZoom: number
): Coordinates => {
  if (!e.target) throw new Error('Target not found')
  const targetElement = e.target as HTMLCanvasElement
  // const zoom = getCanvasCurrentZoom(targetElement)
  const rect = targetElement.getBoundingClientRect()
  const x = Math.floor((e.clientX - rect.left) / canvasZoom)
  const y = Math.floor((e.clientY - rect.top) / canvasZoom)
  return { x, y }
}


const ZOOM_STEP = 0.20
const NAVIGATOR_CANVAS_SIZE: Size = {
  w: 198,
  h: 198
}

export const SpriteEditorNavigator: FC = () => {
  const { forceUpdate } = useForceUpdate()
  const animation = useMemo(() => new AnimationEngine('ImageNavigator'), [])
  const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | null>(null)
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false)

  const navigatorCanvasZoom = NAVIGATOR_CANVAS_SIZE.w / Pixoree.image.size.w

  const updateViewBoxCoordinates = (clickCoords: Coordinates) => {
    const x = Math.floor(minMax({
      value: clickCoords.x,
      min: 0,
      max: Pixoree.image.size.w - Pixoree.image.viewBox.size.w
    }))
    const y = Math.floor(minMax({
      value: clickCoords.y,
      min: 0,
      max: Pixoree.image.size.h - Pixoree.image.viewBox.size.h
    }))
    Pixoree.image.setViewBoxPosition({ x, y })
  }

  const renderTick = useEvent(() => {
    renderCanvas()
    animation.requestFrame(renderTick)
  })

  const renderCanvas = async () => {
    if (!canvasContext) return
    const imageData = new ImageData(Pixoree.image.imageBuffer, Pixoree.image.size.w, Pixoree.image.size.h)
    const bitmap = await createImageBitmap(imageData)
    canvasContext.clearRect(0, 0, Pixoree.image.size.w, Pixoree.image.size.h)
    canvasContext.drawImage(bitmap, 0, 0)

    canvasContext.beginPath()
    canvasContext.strokeStyle = 'red'
    canvasContext.fillStyle = 'red'
    canvasContext.lineWidth = 1
    canvasContext.strokeRect(
      Pixoree.image.viewBox.position.x,
      Pixoree.image.viewBox.position.y,
      Pixoree.image.viewBox.size.w,
      Pixoree.image.viewBox.size.h
    )
    canvasContext.fillRect(
      Pixoree.image.viewBox.position.x + (Pixoree.image.viewBox.size.w / 2) - 5,
      Pixoree.image.viewBox.position.y + (Pixoree.image.viewBox.size.h / 2) - 5,
      10,
      10
    )
    canvasContext.closePath()
  }


  const handleMouseMove = (e: React.MouseEvent | MouseEvent) => {
    if (!isMouseDown) return
    const clickCoords = getCanvasClickMouseCoords(e, navigatorCanvasZoom)
    const effectiveCords = {
      x: clickCoords.x - (Pixoree.image.viewBox.size.w / 2),
      y: clickCoords.y - (Pixoree.image.viewBox.size.h / 2)
    }
    updateViewBoxCoordinates(effectiveCords)
  }

  const handleOnClick = (e: React.MouseEvent | MouseEvent) => {
    const clickCoords = getCanvasClickMouseCoords(e, navigatorCanvasZoom)
    const effectiveCords = {
      x: clickCoords.x - (Pixoree.image.viewBox.size.w / 2),
      y: clickCoords.y - (Pixoree.image.viewBox.size.h / 2)
    }
    updateViewBoxCoordinates(effectiveCords)
  }

  const setMouseUp = () => {
    setIsMouseDown(false)
  }

  const setMouseDown = () => {
    setIsMouseDown(true)
  }

  const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newZoom = Number(e.target.value)
    Pixoree.image.setZoom(newZoom)
  }

  const handleZoomIncrement = () => {
    Pixoree.image.setZoom(Pixoree.image.zoom + ZOOM_STEP)
  }

  const handleDecrementZoom = () => {
    Pixoree.image.setZoom(Pixoree.image.zoom - ZOOM_STEP)
  }

  useEffect(() => {
    if (!canvasContext) return
    canvasContext.resetTransform()
    canvasContext.scale(navigatorCanvasZoom, navigatorCanvasZoom)
    renderTick()
  }, [canvasContext])


  useEffect(() => {
    Pixoree.eventBus.subscribe('IMAGE_ZOOM_CHANGE', forceUpdate)
    window.addEventListener('mouseup', setMouseUp)
    return () => {
      Pixoree.eventBus.unsubscribe('IMAGE_ZOOM_CHANGE', forceUpdate)
      window.removeEventListener('mouseup', setMouseUp)
      animation.stop()
    }
  }, [])

  return (
    <PanelBox title={`Navigator (${Pixoree.image.zoom})`}>
      <PersistentPixelatedCanvas
        contextRef={setCanvasContext}
        height={NAVIGATOR_CANVAS_SIZE.h}
        width={NAVIGATOR_CANVAS_SIZE.w}
        onClick={handleOnClick}
        onMouseDown={setMouseDown}
        onMouseMove={handleMouseMove}
      />
      <div className={styles.controls}>
        <button onClick={handleDecrementZoom}>-</button>
        <input
          max={30}
          min={1}
          step={ZOOM_STEP}
          type="range"
          value={Pixoree.image.zoom}
          onChange={handleZoomChange}
        />
        <button onClick={handleZoomIncrement}>+</button>
      </div>
      w:{Pixoree.image.viewBox.size.w}/ h:{Pixoree.image.viewBox.size.w}
    </PanelBox >
  )
}

