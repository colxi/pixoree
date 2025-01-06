import { getBoxCenter } from '@/tools/utils/geometry'
import { getImageDataFromBuffer, getImageDataFromImage } from '@/tools/utils/image'
import { isEven, minMax, toFixed } from '@/tools/utils/math'
import type { Box, Coordinates, Size } from '../../types'
import type { DeepReadonly } from '@/types'
import type { EditorEventBus } from '../event-bus'
import type { EditorImageOptions } from './types'

const BYTES_PER_PIXEL = 4
const INITIAL_ZOOM = 1
const ZOOM_DECIMALS_RESOLUTION = 2

export class EditorImage {
  public constructor({ eventBus }: EditorImageOptions) {
    this.#eventBus = eventBus
    this.#zoom = INITIAL_ZOOM
    this.#size = { w: 500, h: 500 }
    const arrayBuffer = new Uint8ClampedArray(new ArrayBuffer(this.#size.w * this.#size.h * BYTES_PER_PIXEL))
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

  public open() {
    const inputElement = document.createElement('input')
    inputElement.type = 'file'
    inputElement.accept = 'image/*'
    inputElement.onchange = () => {
      const file = inputElement.files?.[0]
      if (!file) return
      const fileReader = new FileReader()
      fileReader.onload = (event) => {
        const dataAsUrl = event.target?.result
        if (typeof dataAsUrl !== 'string') return
        const imageElement = new Image()
        imageElement.onload = () => {
          const imageData = getImageDataFromImage(imageElement)
          this.#imageBuffer = new Uint8ClampedArray(imageData.data.buffer)
          inputElement.remove()
          this.setImageSize({ w: imageData.width, h: imageData.height })
          this.setZoom(INITIAL_ZOOM)
        }
        imageElement.src = dataAsUrl
      }
      fileReader.readAsDataURL(file)
    }
    inputElement.click()
  }

  public async save() {
    const fileName = 'pixoree.png'
    const mimeType = 'image/png'

    const imageData = getImageDataFromBuffer(this.#imageBuffer, this.#size)
    const canvas = new OffscreenCanvas(this.#size.w, this.#size.h)
    const context = canvas.getContext('2d')
    if (!context) throw new Error('Could not get 2d context')
    context.putImageData(imageData, 0, 0)

    const blob = await canvas.convertToBlob({ type: mimeType })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = fileName
    link.click()
    URL.revokeObjectURL(link.href)

    // to save raw image data... (pixoree .raw rgba data)

    // const fileName = 'pixoree.png'
    // const mimeType = 'image/png'
    // // Create a Blob from the ArrayBuffer
    // const blob = new Blob([this.#imageBuffer], { type: mimeType })

    // // Create a temporary link element
    // const link = document.createElement('a')
    // link.href = URL.createObjectURL(blob) // Generate a URL for the Blob
    // link.download = fileName // Set the file name for download

    // // Programmatically trigger the download
    // link.click()

    // // Clean up
    // URL.revokeObjectURL(link.href)
    // link.remove()
  }

  public get size(): Readonly<Size> {
    return this.#size
  }

  public setImageSize(size: Size) {
    this.#size = size
    // TODO: update image buffer
    this.#eventBus.dispatch('IMAGE_SIZE_CHANGE', {})
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
    this.#eventBus.dispatch('IMAGE_VIEW_BOX_POSITION_CHANGE', {})
  }

  /** @deprecated */
  public setZoom(zoomLevel: number, zoomAt?: Coordinates): void {
    const zoomNew = toFixed(minMax({ value: zoomLevel, min: 1, max: 30 }), ZOOM_DECIMALS_RESOLUTION)

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
    this.#eventBus.dispatch('IMAGE_ZOOM_CHANGE', {})
  }
}
