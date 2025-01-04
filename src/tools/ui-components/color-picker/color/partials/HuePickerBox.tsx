import { PersistentPixelatedCanvas } from '@/tools/ui-components/persistent-pixelated-canvas/PersistentPixelatedCanvas'
import { findCanvasClosestColorCoordinates, getCanvasContextColorFromCoordinates } from '@/tools/utils/canvas'
import { getElementCoordinatesFromMouseEvent } from '@/tools/utils/event'
import { getHueFromRgba, getRgbaColorFromHue } from '@/tools/utils/color'
import React, { useEffect, useRef, useState } from 'react'
import styles from './HuePickerBox.module.scss'
import type { Coordinates, Size } from '@/types'
import type { FC} from 'react';

const PICKER_WIDTH = 15

type Props = {
  onHueSelect: (hue: number) => void
  hue: number
}

export const HuePickerBox: FC<Props> = ({ onHueSelect, hue }) => {
  const containerElementRef = useRef<HTMLElement | null>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false)
  const [selectionCoordinates, setSelectionCoordinates] = useState<Coordinates>({ x: 0, y: 0 })
  const [canvasSize, setCanvasSize] = useState<Size>({ w: 1, h: 1 })

  const onContextUpdate = (context: CanvasRenderingContext2D | null) => {
    if (!context) return
    setContext(context)
    updateCanvas(context)
  }

  const updateCanvas = (context: CanvasRenderingContext2D) => {
    renderHuePicker(context)
    const coordinates = findCanvasClosestColorCoordinates(
      context.canvas,
      getRgbaColorFromHue(hue)
    )
    setSelectionCoordinates(coordinates)
  }

  const renderHuePicker = (context: CanvasRenderingContext2D) => {
    const { width, height } = context.canvas
    var gradient = context.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, '#FF0000FF')
    gradient.addColorStop(0.15, '#FF00FFFF')
    gradient.addColorStop(0.33, '#0000FFFF')
    gradient.addColorStop(0.49, '#00FFFFFF')
    gradient.addColorStop(0.67, '#00FF00FF')
    gradient.addColorStop(0.84, '#FFFF00FF')
    gradient.addColorStop(1, '#FF0000FF')
    context.fillStyle = gradient
    context.fillRect(0, 0, width, height)
  }

  const handleMouseDown = (event: React.MouseEvent | MouseEvent) => {
    if (!context) throw new Error('Canvas context not found')
    const coordinates = getElementCoordinatesFromMouseEvent(event)
    const color = getCanvasContextColorFromCoordinates(context, coordinates)
    const hue = getHueFromRgba(color)
    setSelectionCoordinates(coordinates)
    onHueSelect(hue)
    setIsMouseDown(true)
  }

  const handleMouseUp = () => {
    setIsMouseDown(false)
  }

  const handleMouseMove = (event: React.MouseEvent | MouseEvent) => {
    if (!isMouseDown) return
    handleMouseDown(event)
  }

  /**
   * 
   * Update the canvas size when the container reference is updated. This allows the canvas to 
   * consume all the available space
   * 
   */
  useEffect(() => {
    if (!containerElementRef.current) return
    const rect = containerElementRef.current.getBoundingClientRect()
    setCanvasSize({
      w: PICKER_WIDTH,
      h: rect.height
    })
  }, [containerElementRef])

  /**
   * 
   * Update the canvas when the hue value changes
   * in order to update the hue selection 
   * 
   */
  useEffect(() => {
    if (!context) return
    updateCanvas(context)
  }, [hue])

  return (
    <section
      className={styles.rainbowContainer}
      ref={containerElementRef}
    >
      <div
        className={styles.pointer}
        style={{ top: `${selectionCoordinates.y}px` }}
      />
      <PersistentPixelatedCanvas
        contextRef={onContextUpdate}
        height={canvasSize.h}
        id="ColorPickerRainbow"
        width={canvasSize.w}
        willReadFrequently={true}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </section>
  )
}
