import { Coordinates, RgbaColor } from '@/pages/sprite-editor/types'

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
