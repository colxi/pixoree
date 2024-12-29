import { Coordinates } from '@/pages/sprite-editor/types'
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

  public onMouseMove(_coordinates: Coordinates) {}

  public onMouseDown(_coordinates: Coordinates) {}

  public onMouseUp(_coordinates: Coordinates) {}
}
