import { MagnifyingGlassIcon } from '@/tools/ui-components/icons'
import type { Coordinates } from '@/types'
import type { EditorImage } from '../../editor-image'
import type { EditorTool } from '../types'

interface ZoomToolDependencies {
  image: EditorImage
}

export class ZoomTool implements EditorTool {
  public constructor({ image }: ZoomToolDependencies) {
    this.#dependencies = { image }
  }

  #dependencies: ZoomToolDependencies

  public icon = MagnifyingGlassIcon

  public enable = () => {}

  public disable = () => {}

  public onMouseMove(_coordinates: Coordinates) {
    this.#dependencies
  }

  public onMouseDown(_coordinates: Coordinates) {}

  public onMouseUp(_coordinates: Coordinates) {}
}
