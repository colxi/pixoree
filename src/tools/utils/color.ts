import { CmykColor, HexColor, HslColor, RgbaColor } from '@/types'

/**
 *
 * Converts an RGBA color to an HSL Color (Hue, Saturation, Lightness) color.
 *
 */
export const getHslColorFromRgba = (color: RgbaColor): HslColor => {
  const r = color.r / 255
  const g = color.g / 255
  const b = color.b / 255

  let max = Math.max(r, g, b)
  let min = Math.min(r, g, b)
  let distance = max - min
  let hue: number

  if (distance === 0) hue = 0
  else if (max === r) hue = ((((g - b) / distance) % 6) + 6) % 6
  else if (max === g) hue = (b - r) / distance + 2
  else if (max === b) hue = (r - g) / distance + 4
  else throw new Error('Invalid color')

  let lightness = (min + max) / 2
  let saturation =
    distance === 0 ? 0 : distance / (1 - Math.abs(2 * lightness - 1))

  return {
    h: Math.floor(hue * 60),
    s: saturation,
    l: lightness,
  }
}

/**
 *
 * Converts an HSL color to an RGBA color.
 *
 */
export const getRgbaColorFromHsl = (color: HslColor): RgbaColor => {
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
    r: Math.floor(255 * (rgb1[0] + m)),
    g: Math.floor(255 * (rgb1[1] + m)),
    b: Math.floor(255 * (rgb1[2] + m)),
    a: 255,
  }
}

/**
 *
 * Calculate Euclidean distance between two colors
 *
 */
export const getColorDistance = (
  color1: RgbaColor,
  color2: RgbaColor
): number => {
  return Math.sqrt(
    Math.pow(color1.r - color2.r, 2) +
      Math.pow(color1.g - color2.g, 2) +
      Math.pow(color1.b - color2.b, 2)
  )
}

/**
 *
 * Get the RGBA color from a hue value
 *
 */
export const getRgbaColorFromHue = (hue: number): RgbaColor => {
  return getRgbaColorFromHsl({
    h: hue,
    s: 1,
    l: 0.5,
  })
}

/**
 *
 * Extract the hue value from an RGBA color.
 *
 */
export const getHueFromRgba = (color: RgbaColor): number => {
  const hslColor = getHslColorFromRgba(color)
  return Math.floor(hslColor.h)
}

/**
 *
 * Get the HEX color from an RGBA color.
 *
 */
export const getHexColorFromRgba = (rgbaColor: RgbaColor): HexColor => {
  // Convert each component to a two-digit hex value
  const red = rgbaColor.r.toString(16).padStart(2, '0').toUpperCase()
  const green = rgbaColor.g.toString(16).padStart(2, '0').toUpperCase()
  const blue = rgbaColor.b.toString(16).padStart(2, '0').toUpperCase()
  const alpha = rgbaColor.a.toString(16).padStart(2, '0').toUpperCase()

  return `#${red}${green}${blue}${alpha}`
}

/**
 * Get RGBA color from HEX
 */
export const getRgbaColorFromHex = (hexColor: HexColor): RgbaColor => {
  // Remove the '#'
  const color = hexColor.replace(/^#/, '')
  // Extract RGBA components
  const r = parseInt(color.slice(0, 2) || '00', 16) // Red
  const g = parseInt(color.slice(2, 4) || '00', 16) // Green
  const b = parseInt(color.slice(4, 6) || '00', 16) // Blue
  const a = parseInt(color.slice(6, 8) || 'FF', 16) // Alpha

  return { r, g, b, a }
}
/**
 *
 * Get the CMYK color from a Rgba color.
 *
 */
export const getCmykColorFromRgba = ({ r, g, b }: RgbaColor): CmykColor => {
  // Normalize RGB values to the range [0, 1]
  r /= 255
  g /= 255
  b /= 255

  // Calculate CMY values
  const c = 1 - r
  const m = 1 - g
  const y = 1 - b

  // Calculate K (Black key)
  const k = Math.min(c, m, y)

  // Calculate the final CMYK values
  const cyan = k < 1 ? (c - k) / (1 - k) : 0
  const magenta = k < 1 ? (m - k) / (1 - k) : 0
  const yellow = k < 1 ? (y - k) / (1 - k) : 0

  return {
    c: Math.floor(cyan * 100),
    m: Math.floor(magenta * 100),
    y: Math.floor(yellow * 100),
    k: Math.floor(k * 100),
  }
}

/**
 *
 * Get Rgba color from CMYK
 *
 */
export const getRgbaColorFromCmyk = ({ c, m, y, k }: CmykColor): RgbaColor => {
  // Normalize CMYK values to the range [0, 1]
  c /= 100
  m /= 100
  y /= 100
  k /= 100

  // Calculate the RGB values
  const r = 255 * (1 - c) * (1 - k)
  const g = 255 * (1 - m) * (1 - k)
  const b = 255 * (1 - y) * (1 - k)

  return {
    r: Math.floor(r),
    g: Math.floor(g),
    b: Math.floor(b),
    a: 255,
  }
}
