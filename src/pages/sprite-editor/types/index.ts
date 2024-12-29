export type RgbaColor = {
  r: number
  g: number
  b: number
  a: number
}

export type HslColor = {
  h: number
  s: number
  l: number
}

export type HexColor = `#${string}`

export interface Coordinates {
  x: number
  y: number
}

export interface Size {
  w: number
  h: number
}

export interface Box {
  position: Coordinates
  size: Size
}
