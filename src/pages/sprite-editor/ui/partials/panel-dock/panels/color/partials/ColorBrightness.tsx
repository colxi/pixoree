import { ImageEditor } from '@/pages/sprite-editor/controller'
import { RgbaColor, Size } from '@/pages/sprite-editor/types'
import { PersistentPixelatedCanvas } from '@/tools/ui-components/persistent-pixelated-canvas/PersistentPixelatedCanvas'
import { formatRgbaColorAsHex } from '@/tools/utils/formatters'
import { FC, useEffect, useRef, useState } from 'react'

interface Props {
  baseColor: RgbaColor
}

export const ColorBrightness: FC<Props> = ({ baseColor }) => {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const [canvasSize, setCanvasSize] = useState<Size>({ w: 0, h: 0 })
  const containerElementRef = useRef<HTMLElement | null>(null)

  const onContextUpdate = (ctx: CanvasRenderingContext2D | null) => {
    if (!ctx) return
    setContext(ctx)
    createPalette(ctx)
  }

  const createPalette = (context: CanvasRenderingContext2D) => {
    const { width, height } = context.canvas
    var gradient = context.createLinearGradient(0, 0, width, 0)
    // Create an horizontal gradient (white -> baseColor)
    gradient.addColorStop(0, '#FFFFFFFF')
    gradient.addColorStop(1, formatRgbaColorAsHex(baseColor))
    context.fillStyle = gradient
    context.fillRect(0, 0, width, height)
    // Create a vertical gradient (transparent -> black)
    gradient = context.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, '#00000000')
    gradient.addColorStop(1, '#000000FF')
    context.fillStyle = gradient
    context.fillRect(0, 0, width, height)
  }

  const getColorFromClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = event.target as HTMLCanvasElement
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    if (!context) throw new Error('Canvas context not found')

    const pixelData = context.getImageData(x, y, 1, 1).data
    return {
      r: pixelData[0],
      g: pixelData[1],
      b: pixelData[2],
      a: pixelData[3]
    }
  }

  const handleLeftClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const color = getColorFromClick(event)
    ImageEditor.color.setPrimaryColor(color)
  }

  const handRightClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const color = getColorFromClick(event)
    ImageEditor.color.setSecondaryColor(color)
  }


  useEffect(() => {
    if (!containerElementRef.current) return
    const rect = containerElementRef.current.getBoundingClientRect()
    setCanvasSize({
      w: rect.width,
      h: rect.height
    })
  }, [containerElementRef])

  useEffect(() => {
    if (!context) return
    createPalette(context)


  }, [baseColor])

  return (
    <section ref={containerElementRef}>
      <PersistentPixelatedCanvas
        id="ColorPicker"
        width={canvasSize.w}
        height={canvasSize.h}
        willReadFrequently={true}
        contextRef={onContextUpdate}
        onClick={handleLeftClick}
        onContextMenu={handRightClick}
      />
    </section>
  )
}
