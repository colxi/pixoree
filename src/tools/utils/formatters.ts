import { HexColor, RgbaColor } from '@/types'

export function formatBytes(bytes: number, decimals: number = 2) {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

export function formatHexColorAsRgba(hex: HexColor) {
  // Remove the '#' if it exists
  const color = hex.replace(/^#/, '')

  // Extract RGBA components
  const r = parseInt(color.slice(0, 2), 16) // Red
  const g = parseInt(color.slice(2, 4), 16) // Green
  const b = parseInt(color.slice(4, 6), 16) // Blue
  const a = Number.isNaN(parseInt(color.slice(6, 8), 16))
    ? 255
    : parseInt(color.slice(6, 8), 16) // Alpha

  return { r, g, b, a }
}
