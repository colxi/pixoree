import { Coordinates } from '@/types'
import { EditorImage } from '../../editor-image'
import { EditorTool } from '../types'
import { MagnifyingGlassIcon } from '@/tools/ui-components/icons'

interface ZoomToolDependencies {
  image: EditorImage
}

export class ZoomTool implements EditorTool {
  constructor({ image }: ZoomToolDependencies) {
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
