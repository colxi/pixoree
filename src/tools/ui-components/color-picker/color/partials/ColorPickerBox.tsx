import { Coordinates, RgbaColor, Size } from '@/types'
import { PersistentPixelatedCanvas } from '@/tools/ui-components/persistent-pixelated-canvas/PersistentPixelatedCanvas'
import { findCanvasClosestColorCoordinates, getCanvasContextColorFromCoordinates } from '@/tools/utils/canvas'
import React, { FC, useEffect, useRef, useState } from 'react'
import styles from './ColorPickerBox.module.scss'
import { getElementCoordinatesFromMouseEvent } from '@/tools/utils/event'
import { getHexColorFromRgba, getRgbaColorFromHue } from '@/tools/utils/color'
import { isColorEqual } from '@/tools/utils/image'

type Props = {
  onColorSelect: (color: RgbaColor, type: 'primary' | 'secondary') => void
  color: RgbaColor
  hue: number
}

export const ColorPickerBox: FC<Props> = ({ hue, color, onColorSelect }) => {
  const containerElementRef = useRef<HTMLElement | null>(null)
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const [canvasSize, setCanvasSize] = useState<Size>({ w: 1, h: 1 })
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false)
  const [selectionPointerCoordinates, setSelectionPointerCoordinates] = useState<Coordinates>({ x: 0, y: 0 })
  const [selectionPointerColor, setSelectionPointerColor] = useState<'black' | 'white'>('black')

  const updateCanvas = (context: CanvasRenderingContext2D) => {
    renderColorPicker(context)
    // If the selected color is not the same as the color at the current selectionPointerCoordinates,
    // update the selectionPointerCoordinates to the closest color. Otherwise reuse the coordinated
    // This check acts as an optimization, but also prevents glitches by rendering the pointer
    // on the coordinates of the same color on other coordinates, which can happen for very dark colors
    const selectedColor = getCanvasContextColorFromCoordinates(context, selectionPointerCoordinates)
    if (!isColorEqual(selectedColor, color)) {
      const coordinates = findCanvasClosestColorCoordinates(context.canvas, color)
      setSelectionPointerCoordinates(coordinates)
    }
  }

  const renderColorPicker = (context: CanvasRenderingContext2D) => {
    const { width, height } = context.canvas
    const baseColor = getRgbaColorFromHue(hue)
    // Create an horizontal gradient (white -> baseColor)
    const horizontalGradient = context.createLinearGradient(0, 0, width, 0)
    horizontalGradient.addColorStop(0, '#FFFFFFFF')
    horizontalGradient.addColorStop(1, getHexColorFromRgba(baseColor))
    context.fillStyle = horizontalGradient
    context.fillRect(0, 0, width, height)
    // Create a vertical gradient (transparent -> black)
    const verticalGradient = context.createLinearGradient(0, 0, 0, height)
    verticalGradient.addColorStop(0, '#00000000')
    verticalGradient.addColorStop(1, '#000000FF')
    context.fillStyle = verticalGradient
    context.fillRect(0, 0, width, height)
  }

  const getColorFromClick = (event: React.MouseEvent | MouseEvent) => {
    if (!context) throw new Error('Canvas context not found')
    const coordinates = getElementCoordinatesFromMouseEvent(event)
    const color = getCanvasContextColorFromCoordinates(context, coordinates)
    return color
  }

  const handleContextUpdate = (context: CanvasRenderingContext2D | null) => {
    if (!context) return
    setContext(context)
    updateCanvas(context)
  }

  const handleMouseMove = (event: React.MouseEvent | MouseEvent) => {
    if (!isMouseDown) return
    const coordinates = getElementCoordinatesFromMouseEvent(event)
    setSelectionPointerCoordinates(coordinates)
    const color = getColorFromClick(event)
    onColorSelect(color, 'primary')
  }

  const handleMouseDown = (event: React.MouseEvent | MouseEvent) => {
    // handle left click
    if (event.button === 0) {
      const coordinates = getElementCoordinatesFromMouseEvent(event)
      setSelectionPointerCoordinates(coordinates)
      const color = getColorFromClick(event)
      onColorSelect(color, 'primary')
      setIsMouseDown(true)
    }
    // handle right click
    else if (event.button === 2) {
      const coordinates = getElementCoordinatesFromMouseEvent(event)
      setSelectionPointerCoordinates(coordinates)
      const color = getColorFromClick(event)
      onColorSelect(color, 'secondary')
    }
  }

  const handleMouseUp = () => {
    setIsMouseDown(false)
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
      w: rect.width,
      h: rect.height
    })
  }, [containerElementRef])

  /**
   * 
   * Update the canvas when the Color or Hue props are updated
   * in order to reflect them on the canvas
   * 
   */
  useEffect(() => {
    if (!context) return
    updateCanvas(context)
  }, [color, hue])

  /**
   *  
   * Change the color of the selectionPointer depending on the position of the pointer,
   * to ensure is always visible (use a bright pointer over dark colors and dark pointer 
   * over bright colors)
   * 
   */
  useEffect(() => {
    const color = selectionPointerCoordinates.y < canvasSize.h / 2 ? 'black' : 'white'
    setSelectionPointerColor(color)
  }, [selectionPointerCoordinates])

  return (
    <section
      ref={containerElementRef}
      className={styles.colorPickerContainer}
      style={{
        cursor: isMouseDown ? 'none' : 'default'
      }}
    >
      <div
        className={styles.pointer}
        style={{
          left: `${selectionPointerCoordinates.x}px`,
          top: `${selectionPointerCoordinates.y}px`,
          borderColor: selectionPointerColor,
          cursor: isMouseDown ? 'none' : 'default'
        }}
      />
      <PersistentPixelatedCanvas
        id="ColorPicker"
        width={canvasSize.w}
        height={canvasSize.h}
        willReadFrequently={true}
        contextRef={handleContextUpdate}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      />
    </section>
  )
}
