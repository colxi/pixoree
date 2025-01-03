import { Box, Coordinates, Size } from '../../types'
import { minMax, toFixed, isEven } from '@/tools/utils/math'
import { DeepReadonly } from '@/types'
import { getBoxCenter } from '@/tools/utils/geometry'
import { EditorEventBus } from '../event-bus'
import { EditorImageOptions } from './types'

const BYTES_PER_PIXEL = 4
const INITIAL_ZOOM = 1
const ZOOM_DECIMALS_RESOLUTION = 2

export class EditorImage {
  constructor({ eventBus }: EditorImageOptions) {
    this.#eventBus = eventBus
    this.#zoom = INITIAL_ZOOM
    this.#size = { w: 500, h: 500 }
    const arrayBuffer = new Uint8ClampedArray(
      new ArrayBuffer(this.#size.w * this.#size.h * BYTES_PER_PIXEL)
    )
    arrayBuffer.fill(255)
    this.#imageBuffer = arrayBuffer
  }

  #eventBus: EditorEventBus
  #imageBuffer: Uint8ClampedArray
  #size: Size

  /** @deprecated */
  #zoom: number
  /** @deprecated */
  #viewBoxPosition: Coordinates = { x: 0, y: 0 }

  /** @deprecated */
  public get viewBox(): DeepReadonly<Box> {
    const boxWidth = Math.floor(this.#size.w / this.#zoom)
    const boxHeight = Math.floor(this.#size.h / this.#zoom)
    return {
      position: this.#viewBoxPosition,
      size: {
        w: isEven(boxWidth) ? boxWidth - 1 : boxWidth,
        h: isEven(boxHeight) ? boxHeight - 1 : boxHeight,
      },
    }
  }

  public get size(): Readonly<Size> {
    return this.#size
  }

  public setImageSize(size: Size) {
    this.#size = size
    // TODO: update image buffer
    this.#eventBus.dispatch(this.#eventBus.Event.IMAGE_SIZE_CHANGE, {})
  }

  /** @deprecated */
  public get zoom() {
    return this.#zoom
  }

  public get imageBuffer(): Uint8ClampedArray {
    return this.#imageBuffer
  }

  /** @deprecated */
  public setViewBoxPosition(coords: Coordinates) {
    this.#viewBoxPosition.x = coords.x
    this.#viewBoxPosition.y = coords.y
    this.#eventBus.dispatch(
      this.#eventBus.Event.IMAGE_VIEW_BOX_POSITION_CHANGE,
      {}
    )
  }

  /** @deprecated */
  public setZoom(zoomLevel: number, zoomAt?: Coordinates): void {
    const zoomNew = toFixed(
      minMax({ value: zoomLevel, min: 1, max: 30 }),
      ZOOM_DECIMALS_RESOLUTION
    )

    const viewBox = this.viewBox
    const viewBoxCenter = getBoxCenter(viewBox)
    let zoomAtX = zoomAt ? zoomAt.x : viewBoxCenter.x
    let zoomAtY = zoomAt ? zoomAt.y : viewBoxCenter.y
    const viewBoxPositionNew = {
      x: viewBox.position.x + zoomAtX / this.#zoom - zoomAtX / zoomNew,
      y: viewBox.position.y + zoomAtY / this.#zoom - zoomAtY / zoomNew,
    }

    this.setViewBoxPosition(viewBoxPositionNew)
    this.#zoom = zoomNew
    this.#eventBus.dispatch(this.#eventBus.Event.IMAGE_ZOOM_CHANGE, {})
  }
}
