export type DeepReadonly<T> = T extends (infer R)[]
  ? DeepReadonlyArray<R>
  : T extends Function
    ? T
    : T extends object
      ? DeepReadonlyObject<T>
      : T

interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

type DeepReadonlyObject<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>
}

export type Primitive =
  | bigint
  | boolean
  | null
  | number
  | string
  | symbol
  | undefined

export type PlainObject = Record<string, Primitive>

export type EmptyObject = Record<PropertyKey, never>

export type Function<
  PARAMS extends any[] = any[],
  RETURN_VALUE extends any = void,
> = (...params: PARAMS) => RETURN_VALUE

export type RgbaColor = {
  r: number
  g: number
  b: number
  a: number
}
export type CmykColor = {
  c: number
  m: number
  y: number
  k: number
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
