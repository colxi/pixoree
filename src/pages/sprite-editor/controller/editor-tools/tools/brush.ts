import { getLinePoints, isDistanceGreaterThanOne } from '@/tools/utils/geometry'
import { hasKeyModifiers } from '@/tools/utils/keyboard'
import {
  getImageByteIndexFromCoordinates,
  getColorFromCoordinates,
  isTransparentColor,
} from '@/tools/utils/image'
import { Coordinates } from '@/pages/sprite-editor/types'
import { EditorHistory } from '../../editor-history'
import { EditorImage } from '../../editor-image'
import { EditorColor } from '../../editor-color'
import { EditorTool } from '../types'
import { BrushIcon } from '@/tools/ui-components/icons'

interface BrushToolDependencies {
  color: EditorColor
  image: EditorImage
  history: EditorHistory
}

export class BrushTool implements EditorTool {
  constructor({ image, history, color }: BrushToolDependencies) {
    this.#dependencies = { image, history, color }
    this.#isEyeDropperModeEnabled = false
    this.#isMOuseDown = false
    this.#brushLastCoords = null
  }

  #dependencies: BrushToolDependencies

  #isEyeDropperModeEnabled: boolean
  #brushLastCoords: Coordinates | null
  #isMOuseDown: boolean

  public icon = BrushIcon

  private paintPixel(coordinates: Coordinates) {
    if (
      coordinates.x < 0 ||
      coordinates.x >= this.#dependencies.image.size.w ||
      coordinates.y < 0 ||
      coordinates.y >= this.#dependencies.image.size.h
    ) {
      this.#brushLastCoords = coordinates
      return
    }
    // If eye-dropper mode is enabled, get the color instead of painting the pixel
    if (this.#isEyeDropperModeEnabled) {
      this.pickColorFromPixel(coordinates)
      return
    }
    const byteIndex = getImageByteIndexFromCoordinates(
      coordinates.x,
      coordinates.y,
      this.#dependencies.image.size.w
    )
    const color = this.#dependencies.color.primaryColor
    this.#dependencies.image.imageBuffer[byteIndex + 0] = color.r // red
    this.#dependencies.image.imageBuffer[byteIndex + 1] = color.g // green
    this.#dependencies.image.imageBuffer[byteIndex + 2] = color.b // blue
    this.#dependencies.image.imageBuffer[byteIndex + 3] = color.a // alpha

    this.#brushLastCoords = coordinates
    this.#dependencies.history.register('Brush', this.icon())
  }

  private pickColorFromPixel(coordinates: Coordinates) {
    const color = getColorFromCoordinates(
      coordinates.x,
      coordinates.y,
      this.#dependencies.image.size.w,
      this.#dependencies.image.imageBuffer
    )
    if (isTransparentColor(color)) return
    this.#dependencies.color.setPrimaryColor(color)
  }

  private onKeyDown = (e: KeyboardEvent) => {
    if (e.code === 'AltLeft' && !hasKeyModifiers(e)) {
      this.#isEyeDropperModeEnabled = true
    }
  }

  private onKeyUp = (e: KeyboardEvent) => {
    if (e.code === 'AltLeft' && !hasKeyModifiers(e)) {
      this.#isEyeDropperModeEnabled = false
    }
  }

  public enable = () => {
    this.#isEyeDropperModeEnabled = false
    this.#isMOuseDown = false
    this.#brushLastCoords = null
    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('keyup', this.onKeyUp)
  }

  public disable = () => {
    window.removeEventListener('keydown', this.onKeyDown)
    window.removeEventListener('keyup', this.onKeyUp)
  }

  public onMouseDown(coordinates: Coordinates) {
    this.#isMOuseDown = true
    this.paintPixel(coordinates)
  }

  public onMouseUp(_coordinates: Coordinates) {
    this.#isMOuseDown = false
    this.#brushLastCoords = null
  }

  public onMouseMove(coordinates: Coordinates) {
    if (!this.#isMOuseDown) return

    // Check if there are gaps between the last known stroke coordinates, and the
    // current ones, and fill the gaps with a line, if necessary
    if (this.#brushLastCoords) {
      const hasGaps = isDistanceGreaterThanOne(
        this.#brushLastCoords,
        coordinates
      )
      if (hasGaps) {
        const points = getLinePoints(this.#brushLastCoords, coordinates)
        for (const point of points) {
          this.paintPixel(point)
        }
      }
    }

    this.paintPixel(coordinates)
  }
}
