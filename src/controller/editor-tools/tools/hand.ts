import { Coordinates } from '@/types'
import { EditorTool } from '../types'
import { EditorViewport } from '../../editor-viewport'
import { HandIcon } from '@/tools/ui-components/icons'

interface HandToolDependencies {
  viewport: EditorViewport
}

export class HandTool implements EditorTool {
  constructor({ viewport }: HandToolDependencies) {
    this.#dependencies = { viewport }
    this.#isMouseDown = false
    this.#handLastCoords = null
  }

  #dependencies: HandToolDependencies

  #isMouseDown: boolean
  #handLastCoords: Coordinates | null = { x: 0, y: 0 }

  public icon = HandIcon

  private viewportScroll = (coordinates: Coordinates) => {
    const diff: Coordinates = this.#handLastCoords
      ? {
          x: this.#handLastCoords.x - coordinates.x,
          y: this.#handLastCoords.y - coordinates.y,
        }
      : {
          x: 0,
          y: 0,
        }

    this.#dependencies.viewport.setScroll({
      x: this.#dependencies.viewport.scroll.x + diff.x,
      y: this.#dependencies.viewport.scroll.y + diff.y,
    })
    this.#handLastCoords = coordinates
  }

  public enable = () => {
    this.#handLastCoords = null
    this.#isMouseDown = false
  }

  public disable = () => {
    // NOOP
  }

  public onMouseDown(coordinates: Coordinates) {
    this.#isMouseDown = true
    this.#handLastCoords = coordinates
  }

  public onMouseUp(_coordinates: Coordinates) {
    this.#isMouseDown = false
    this.#handLastCoords = null
  }

  public async onMouseMove(coordinates: Coordinates) {
    if (!this.#isMouseDown) return
    this.viewportScroll(coordinates)
  }
}
