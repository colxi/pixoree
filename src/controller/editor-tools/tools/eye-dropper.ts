import { EyeDropperIcon } from '@/tools/ui-components/icons'
import {
  getImageColorFromCoordinates,
  isTransparentColor,
} from '@/tools/utils/image'
import type { Coordinates } from '@/types'
import type { EditorColor } from '../../editor-color'
import type { EditorImage } from '../../editor-image'
import type { EditorTool } from '../types'

interface EyeDropperToolDependencies {
  color: EditorColor
  image: EditorImage
}

export class EyeDropperTool implements EditorTool {
  constructor({ image, color }: EyeDropperToolDependencies) {
    this.#dependencies = { image, color }
    this.#isMOuseDown = false
  }

  #dependencies: EyeDropperToolDependencies

  #isMOuseDown: boolean

  public icon = EyeDropperIcon

  private pickColorFromPixel(coordinates: Coordinates) {
    const color = getImageColorFromCoordinates(
      coordinates,
      this.#dependencies.image.size,
      this.#dependencies.image.imageBuffer
    )
    if (isTransparentColor(color)) return
    this.#dependencies.color.setPrimaryColor(color)
  }

  public enable = () => {
    this.#isMOuseDown = false
  }

  public disable = () => {
    // NOOP
  }

  public onMouseDown(coordinates: Coordinates) {
    this.#isMOuseDown = true
    this.pickColorFromPixel(coordinates)
  }

  public onMouseUp(_coordinates: Coordinates) {
    this.#isMOuseDown = false
  }

  public onMouseMove(coordinates: Coordinates) {
    if (!this.#isMOuseDown) return
    this.pickColorFromPixel(coordinates)
  }
}
