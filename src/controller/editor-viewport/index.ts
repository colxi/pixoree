import { minMax, toFixed } from '@/tools/utils/math'
import type { Coordinates, Size } from '../../types'
import type { EditorEventBus } from '../event-bus'
import type { EditorImage } from '../editor-image'
import type { EditorViewportOptions } from './types'

const INITIAL_ZOOM = 1
const ZOOM_MIN = 1
const ZOOM_MAX = 30
const ZOOM_DECIMALS_RESOLUTION = 2

export class EditorViewport {
  constructor({ eventBus, image }: EditorViewportOptions) {
    this.#eventBus = eventBus
    this.#image = image
  }

  #image: EditorImage
  #eventBus: EditorEventBus
  #size: Size = { w: 500, h: 500 }
  #scroll: Coordinates = { x: 0, y: 0 }
  #zoom: number = INITIAL_ZOOM
  #zoomResolution = ZOOM_DECIMALS_RESOLUTION

  public get scroll(): Readonly<Coordinates> {
    return this.#scroll
  }

  public get size(): Readonly<Size> {
    return this.#size
  }

  public get zoom() {
    return this.#zoom
  }

  public get zoomResolution(): number {
    return this.#zoomResolution
  }

  public setSize(size: Size) {
    this.#size.w = size.w
    this.#size.h = size.h
    this.#eventBus.dispatch(this.#eventBus.Event.VIEWPORT_SIZE_CHANGE, {})
  }

  public setScroll(coords: Coordinates) {
    const scrollX = minMax({
      value: coords.x,
      min: -this.#image.size.w,
      max: this.#image.size.w * 2,
    })
    const scrollY = minMax({
      value: coords.y,
      min: -this.#image.size.h,
      max: this.#image.size.h * 2,
    })
    this.#scroll.x = scrollX
    this.#scroll.y = scrollY
    this.#eventBus.dispatch(this.#eventBus.Event.VIEWPORT_SCROLL_CHANGE, {})
  }

  public setZoom(zoomLevel: number): void {
    const zoomNew = toFixed(
      minMax({ value: zoomLevel, min: ZOOM_MIN, max: ZOOM_MAX }),
      ZOOM_DECIMALS_RESOLUTION
    )
    if (zoomNew < ZOOM_MIN || zoomNew > ZOOM_MAX) return
    this.#zoom = zoomNew
    this.#eventBus.dispatch(this.#eventBus.Event.VIEWPORT_ZOOM_CHANGE, {})
  }

  /**
   *
   * Converts the provided viewport coords to the equivalent image coords
   * by applying the current zoom and scroll values
   *
   */
  public mapToImageCoordinateSystem(coords: Coordinates): Coordinates {
    const zoomedCoords = {
      x: Math.floor(coords.x / this.#zoom),
      y: Math.floor(coords.y / this.#zoom),
    }
    const zoomedScroll = {
      x: Math.floor(this.#scroll.x * this.#zoom),
      y: Math.floor(this.#scroll.y * this.#zoom),
    }
    const imageCoords = {
      x: zoomedCoords.x - zoomedScroll.x,
      y: zoomedCoords.y - zoomedScroll.y,
    }
    return imageCoords
  }
}
