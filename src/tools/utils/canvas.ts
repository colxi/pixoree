import { Coordinates, RgbaColor } from '@/pages/sprite-editor/types'
import { getColorDistance } from './color'
import { getImageCoordinatesFromByteIndex } from './image'

export const clearCanvas = (canvasContext: CanvasRenderingContext2D) => {
  canvasContext.clearRect(
    0,
    0,
    canvasContext.canvas.width,
    canvasContext.canvas.height
  )
}

export const getCanvasContextColorFromCoordinates = (
  context: CanvasRenderingContext2D,
  coordinates: Coordinates
): RgbaColor => {
  const pixelData = context.getImageData(
    coordinates.x,
    coordinates.y,
    1,
    1
  ).data
  return {
    r: pixelData[0],
    g: pixelData[1],
    b: pixelData[2],
    a: pixelData[3],
  }
}

export function findCanvasClosestColorCoordinates(
  canvas: HTMLCanvasElement,
  targetColor: RgbaColor
): Coordinates {
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas context not found')
  const { data, width, height } = ctx.getImageData(
    0,
    0,
    canvas.width,
    canvas.height
  )

  let closestColor: RgbaColor | null = null
  let closestCoordinates: Coordinates = { x: 0, y: 0 }
  let smallestDistance = Infinity

  for (let i = 0; i < data.length; i += 4) {
    const pixelColor: RgbaColor = {
      r: data[i],
      g: data[i + 1],
      b: data[i + 2],
      a: data[i + 3],
    }
    const pixelCoordinates: Coordinates = getImageCoordinatesFromByteIndex(i, {
      w: width,
      h: height,
    })

    const distance = getColorDistance(targetColor, pixelColor)
    if (distance < smallestDistance) {
      smallestDistance = distance
      closestColor = pixelColor
      closestCoordinates = pixelCoordinates
    }
  }

  if (!closestColor) throw new Error('No closest color found')
  return closestCoordinates
}
