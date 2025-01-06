import { EraserIcon } from '@/tools/ui-components/icons'
import { getImageByteIndexFromCoordinates } from '@/tools/utils/image'
import { getLinePoints, isDistanceGreaterThanOne } from '@/tools/utils/geometry'
import type { Coordinates } from '@/types'
import type { EditorHistory } from '../../editor-history'
import type { EditorImage } from '../../editor-image'
import type { EditorTool } from '../types'

interface EraserToolDependencies {
  image: EditorImage
  history: EditorHistory
}

export class EraserTool implements EditorTool {
  public constructor({ image, history }: EraserToolDependencies) {
    this.#dependencies = { image, history }
    this.#isMOuseDown = false
    this.#eraserLastCoords = null
  }

  #dependencies: EraserToolDependencies

  #isMOuseDown: boolean
  #eraserLastCoords: Coordinates | null

  public icon = EraserIcon

  private erasePixel(coordinates: Coordinates) {
    if (
      coordinates.x < 0 ||
      coordinates.x >= this.#dependencies.image.size.w ||
      coordinates.y < 0 ||
      coordinates.y >= this.#dependencies.image.size.h
    ) {
      this.#eraserLastCoords = null
      return
    }

    const byteIndex = getImageByteIndexFromCoordinates(
      coordinates.x,
      coordinates.y,
      this.#dependencies.image.size.w
    )
    this.#dependencies.image.imageBuffer[byteIndex + 0] = 0 // red
    this.#dependencies.image.imageBuffer[byteIndex + 1] = 0 // green
    this.#dependencies.image.imageBuffer[byteIndex + 2] = 0 // blue
    this.#dependencies.image.imageBuffer[byteIndex + 3] = 0 // alpha

    this.#eraserLastCoords = coordinates
    this.#dependencies.history.register('Erase', this.icon())
  }

  public enable = () => {
    this.#isMOuseDown = false
    this.#eraserLastCoords = null
  }

  public disable = () => {
    // NOOP
  }

  public onMouseDown(coordinates: Coordinates) {
    this.#isMOuseDown = true
    this.erasePixel(coordinates)
  }

  public onMouseUp() {
    this.#isMOuseDown = false
    this.#eraserLastCoords = null
  }

  public onMouseMove(coordinates: Coordinates) {
    if (!this.#isMOuseDown) return

    // Check if there are gaps between the last known stroke coordinates, and the
    // current ones, and fill the gaps with a line, if necessary
    if (this.#eraserLastCoords) {
      const hasGaps = isDistanceGreaterThanOne(
        this.#eraserLastCoords,
        coordinates
      )
      if (hasGaps) {
        const points = getLinePoints(this.#eraserLastCoords, coordinates)
        for (const point of points) {
          this.erasePixel(point)
        }
      }
    }

    this.erasePixel(coordinates)
  }
}
