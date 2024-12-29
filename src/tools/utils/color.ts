import { HslColor, RgbaColor } from '@/pages/sprite-editor/types'

/**
 *
 * Converts an RGBA color to an HSL Color (Hue, Saturation, Lightness) color.
 *
 */
export const rgbaColorToHsl = (color: RgbaColor): HslColor => {
  const r = color.r / 255
  const g = color.g / 255
  const b = color.b / 255

  let max = Math.max(r, g, b)
  let min = Math.min(r, g, b)
  let distance = max - min
  let hue: number

  if (distance === 0) hue = 0
  else if (max === r) hue = ((g - b) / distance) % 6
  else if (max === g) hue = (b - r) / distance + 2
  else if (max === b) hue = (r - g) / distance + 4
  else throw new Error('Invalid color')

  let lightness = (min + max) / 2
  let saturation =
    distance === 0 ? 0 : distance / (1 - Math.abs(2 * lightness - 1))

  return {
    h: hue * 60,
    s: saturation,
    l: lightness,
  }
}

export const hslColorToRgba = (color: HslColor): RgbaColor => {
  let c = (1 - Math.abs(2 * color.l - 1)) * color.s
  let hp = color.h / 60.0
  let x = c * (1 - Math.abs((hp % 2) - 1))
  let rgb1: [number, number, number]
  if (isNaN(color.h)) rgb1 = [0, 0, 0]
  else if (hp <= 1) rgb1 = [c, x, 0]
  else if (hp <= 2) rgb1 = [x, c, 0]
  else if (hp <= 3) rgb1 = [0, c, x]
  else if (hp <= 4) rgb1 = [0, x, c]
  else if (hp <= 5) rgb1 = [x, 0, c]
  else if (hp <= 6) rgb1 = [c, 0, x]
  else throw new Error('Invalid color')

  let m = color.l - c * 0.5
  return {
    r: Math.round(255 * (rgb1[0] + m)),
    g: Math.round(255 * (rgb1[1] + m)),
    b: Math.round(255 * (rgb1[2] + m)),
    a: 255,
  }
}

/**
 *
 * Calculate Euclidean distance between two colors
 *
 */
const getColorDistance = (color1: RgbaColor, color2: RgbaColor): number => {
  return Math.sqrt(
    Math.pow(color1.r - color2.r, 2) +
      Math.pow(color1.g - color2.g, 2) +
      Math.pow(color1.b - color2.b, 2)
  )
}

/**
 *
 * Get the closest color from a list of colors
 *
 */
export const getClosestHexColor = (
  sourceColor: RgbaColor,
  colorList: RgbaColor[]
): RgbaColor => {
  let closestColor: RgbaColor | null = null
  let smallestDistance = Infinity

  for (const colorToEvaluate of colorList) {
    const distance = getColorDistance(sourceColor, colorToEvaluate)
    if (distance < smallestDistance) {
      smallestDistance = distance
      closestColor = colorToEvaluate
    }
  }

  if (!closestColor) throw new Error('No closest color found')
  return closestColor
}

/**
 *
 * Get the RGBA color from a hue value
 *
 */
export const getRgbaColorFromHue = (hue: number): RgbaColor => {
  return hslColorToRgba({ h: hue, s: 1, l: 0.5 })
}
