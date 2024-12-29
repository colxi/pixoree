import { Coordinates } from '@/pages/sprite-editor/types'
import { EditorImage } from '../../editor-image'
import { EditorTool } from '../types'
import { CrossIcon } from '@/tools/ui-components/icons'

interface MoveToolDependencies {
  image: EditorImage
}

export class MoveTool implements EditorTool {
  constructor({ image }: MoveToolDependencies) {
    this.#dependencies = { image }
  }

  #dependencies: MoveToolDependencies

  public icon = CrossIcon

  public enable = () => {}

  public disable = () => {}

  public onMouseMove(_coordinates: Coordinates) {}

  public onMouseDown(_coordinates: Coordinates) {}

  public onMouseUp(_coordinates: Coordinates) {}
}
