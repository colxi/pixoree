import { PersistentPixelatedCanvas } from '@/tools/ui-components/persistent-pixelated-canvas/PersistentPixelatedCanvas'
import { getElementCoordsFromMouseEvent } from '@/tools/utils/event'
import { FC, useState } from 'react'
import styles from './ColorHue.module.scss'
import { getCanvasContextColorFromCoordinates } from '@/tools/utils/canvas'
import { RgbaColor } from '@/pages/sprite-editor/types'
import { ImageEditor } from '@/pages/sprite-editor/controller'
import { getClosestHexColor, getRgbaColorFromHue, hslColorToRgba, rgbaColorToHsl } from '@/tools/utils/color'
import { isColorEqual } from '@/tools/utils/image'


interface Props {
  onSelectColor: (color: RgbaColor) => void
}

export const ColorHue: FC<Props> = ({ onSelectColor }) => {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const [colors, setColors] = useState<RgbaColor[]>([])
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false)
  const [pointerY, setPointerY] = useState<number>(0)

  const onContextUpdate = (context: CanvasRenderingContext2D | null) => {
    if (!context) return
    setContext(context)
    createRainbow(context)
    populateColorsList(context)
    selectClosestColor()
  }

  const createRainbow = (context: CanvasRenderingContext2D) => {
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

  const populateColorsList = (context: CanvasRenderingContext2D) => {
    const { height } = context.canvas
    if (!colors.length) {
      for (let y = 0; y < height; y++) {
        const color = getCanvasContextColorFromCoordinates(context, { x: 0, y })
        colors.push(color)
        setColors([...colors])
      }
    }
  }

  const selectClosestColor = () => {
    const hslColor = rgbaColorToHsl(ImageEditor.color.primaryColor)
    const baseColor = getRgbaColorFromHue(hslColor.h)
    const closestColor = getClosestHexColor(baseColor, colors)
    const y = colors.indexOf(closestColor)
    setPointerY(y)
    onSelectColor(baseColor)
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!context) throw new Error('Canvas context not found')
    const coords = getElementCoordsFromMouseEvent(event)
    setPointerY(coords.y)
    const color = getCanvasContextColorFromCoordinates(context, coords)
    setIsMouseDown(true)
    onSelectColor(color)
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isMouseDown) return
    handleMouseDown(event)
  }

  const handleMouseUp = () => {
    setIsMouseDown(false)
  }

  const handleMouseOut = () => {
    setIsMouseDown(false)
  }

  return (
    <section className={styles.rainbowContainer}>
      <div
        className={styles.pointer}
        style={{ top: `${pointerY}px` }}
      />
      <PersistentPixelatedCanvas
        id="ColorPickerRainbow"
        width={15}
        height={100}
        willReadFrequently={true}
        contextRef={onContextUpdate}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseOut={handleMouseOut}
      />
    </section>
  )
}
