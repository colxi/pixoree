import { hasKeyModifiers } from '@/tools/utils/keyboard'
import { getColorFromByteIndex } from '@/tools/utils/image'
import {
  getImageByteIndexFromCoordinates,
  getColorFromCoordinates,
  isColorEqual,
  isTransparentColor,
  setColorInCoordinates,
  getCoordinatesFromImageByteIndex,
} from '@/tools/utils/image'
import { Coordinates, RgbaColor } from '@/pages/sprite-editor/types'
import { EditorHistory } from '../../editor-history'
import { EditorImage } from '../../editor-image'
import { EditorColor } from '../../editor-color'
import { EditorTool } from '../types'
import { FillDripIcon } from '@/tools/ui-components/icons'

interface PaintBucketToolDependencies {
  color: EditorColor
  image: EditorImage
  history: EditorHistory
}

export class PaintBucketTool implements EditorTool {
  constructor({ image, history, color }: PaintBucketToolDependencies) {
    this.#dependencies = { image, history, color }

    this.#isMouseDown = false
    this.#isEyeDropperModeEnabled = false
  }

  #dependencies: PaintBucketToolDependencies

  #isMouseDown: boolean
  #isEyeDropperModeEnabled: boolean

  public icon = FillDripIcon

  private fill(coordinates: Coordinates) {
    // If eye-dropper mode is enabled, get the color instead of painting it
    if (this.#isEyeDropperModeEnabled) {
      this.pickColorFromPixel(coordinates)
      return
    }

    const pixelColor = getColorFromCoordinates(
      coordinates.x,
      coordinates.y,
      this.#dependencies.image.size.w,
      this.#dependencies.image.imageBuffer
    )
    // if is same color, no action is needed, return
    if (isColorEqual(pixelColor, this.#dependencies.color.primaryColor)) return
    this.floodFill(coordinates, pixelColor)
    this.#dependencies.history.register('Fill', this.icon())
  }

  private floodFill = (coordinates: Coordinates, targetColor: RgbaColor) => {
    const canFillPixel = (byteIndex: number) => {
      const pixelColor = getColorFromByteIndex(
        byteIndex,
        this.#dependencies.image.imageBuffer
      )
      return isColorEqual(pixelColor, targetColor)
    }

    const stack: number[] = [
      getImageByteIndexFromCoordinates(
        coordinates.x,
        coordinates.y,
        this.#dependencies.image.size.w
      ),
    ]

    while (stack.length) {
      let byteIndex = stack.pop()!
      const { x, y } = getCoordinatesFromImageByteIndex(
        byteIndex,
        this.#dependencies.image.size.w
      )
      setColorInCoordinates(
        x,
        y,
        this.#dependencies.image.size.w,
        this.#dependencies.image.imageBuffer,
        this.#dependencies.color.primaryColor
      )

      // evaluate all directions
      const rightPixelIndex = byteIndex + 4
      if (canFillPixel(rightPixelIndex)) stack.push(rightPixelIndex)
      const leftPixelIndex = byteIndex - 4
      if (canFillPixel(leftPixelIndex)) stack.push(leftPixelIndex)
      const topPixelIndex = byteIndex - this.#dependencies.image.size.w * 4
      if (canFillPixel(topPixelIndex)) stack.push(topPixelIndex)
      const bottomPixelIndex = byteIndex + this.#dependencies.image.size.w * 4
      if (canFillPixel(bottomPixelIndex)) stack.push(bottomPixelIndex)
    }
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
    this.#isMouseDown = false
    this.#isEyeDropperModeEnabled = false
    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('keyup', this.onKeyUp)
  }

  public disable = () => {
    window.removeEventListener('keydown', this.onKeyDown)
    window.removeEventListener('keyup', this.onKeyUp)
  }

  public onMouseMove(coordinates: Coordinates) {
    if (!this.#isMouseDown) return
    if (this.#isEyeDropperModeEnabled) this.pickColorFromPixel(coordinates)
  }

  public onMouseDown(coordinates: Coordinates) {
    this.#isMouseDown = true
    this.fill(coordinates)
  }

  public onMouseUp(_coordinates: Coordinates) {
    this.#isMouseDown = false
  }
}
