import { CrossIcon } from '@/tools/ui-components/icons'
import type { Coordinates } from '@/types'
import type { EditorImage } from '../../editor-image'
import type { EditorTool } from '../types'

interface MoveToolDependencies {
  image: EditorImage
}

export class MoveTool implements EditorTool {
  public constructor({ image }: MoveToolDependencies) {
    this.#dependencies = { image }
  }

  #dependencies: MoveToolDependencies

  public icon = CrossIcon

  public enable = () => {}

  public disable = () => {}

  public onMouseMove(_coordinates: Coordinates) {
    this.#dependencies
  }

  public onMouseDown(_coordinates: Coordinates) {}

  public onMouseUp(_coordinates: Coordinates) {}
}
