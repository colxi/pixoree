import { EditorTool } from './types/indx'
import { getLinePoints } from '@/tools/utils/geometry'
import { useEvent } from '../../../../../tools/hooks'
import {
  CanvasMouseEvent,
  getCanvasClickMouseCoords,
} from '../../../presentation/utils'
import { Color, Coordinates } from '../../../types'
import { ActionHistory, UseActionHistory } from '../../action-history'
import { CanvasMouse, CanvasMouseContext } from '../../canvas-mouse'
import { EditorImage, UseEditorImage } from '../../editor-image'

const isDistanceGreaterThanOne = (start: Coordinates, end: Coordinates) => {
  return Math.abs(start.x - end.x) > 1 || Math.abs(start.y - end.y) > 1
}

export class BrushTool implements EditorTool {
  constructor(
    editorImage: EditorImage,
    canvasMouse: CanvasMouse,
    actionHistory: ActionHistory
  ) {
    this.#editorImage = editorImage
    this.#canvasMouse = canvasMouse
    this.#actionHistory = actionHistory
  }

  #editorImage: EditorImage
  #canvasMouse: CanvasMouse
  #actionHistory: ActionHistory

  #color: Color = {
    r: 255,
    g: 255,
    b: 255,
    a: 255,
  }

  async #paintPixel(x: number, y: number) {
    const spriteWidth = 500
    const offset = y * spriteWidth * 4 + x * 4
    this.#editorImage.imageBuffer[offset + 0] = this.#color.r // red
    this.#editorImage.imageBuffer[offset + 1] = this.#color.g // green
    this.#editorImage.imageBuffer[offset + 2] = this.#color.b // blue
    this.#editorImage.imageBuffer[offset + 3] = this.#color.a // alpha
    this.#actionHistory.register('Draw')
  }

  public enable = () => {}

  public disable = () => {}

  public async onMouseMove(e: CanvasMouseEvent) {
    if (!this.#canvasMouse.isMouseDown) return

    // fill gaps with a line in case movement is too fast
    const clickCoords = getCanvasClickMouseCoords(e, this.#editorImage.zoom)
    const hasGaps = isDistanceGreaterThanOne(
      this.#canvasMouse.lastMouseCoords,
      clickCoords
    )
    if (!this.#canvasMouse.isFirstActionTick && hasGaps) {
      const points = getLinePoints(
        this.#canvasMouse.lastMouseCoords,
        clickCoords
      )
      for (const point of points) {
        await this.#paintPixel(
          point.x + this.#editorImage.viewBox.position.x,
          point.y + this.#editorImage.viewBox.position.y
        )
      }
    }
    // render the pixel
    await this.#paintPixel(
      clickCoords.x + this.#editorImage.viewBox.position.x,
      clickCoords.y + this.#editorImage.viewBox.position.y
    )
  }

  public async onMouseDown(e: CanvasMouseEvent) {
    const clickCoords = getCanvasClickMouseCoords(e, this.#editorImage.zoom)
    // render the pixel
    await this.#paintPixel(
      clickCoords.x + this.#editorImage.viewBox.position.x,
      clickCoords.y + this.#editorImage.viewBox.position.y
    )
  }

  public onMouseUp(_e: CanvasMouseEvent) {}
}

export const useBrushTool = (
  editorImage: UseEditorImage,
  canvasMouse: CanvasMouseContext,
  actionHistory: UseActionHistory
) => {
  const color: Color = {
    r: 255,
    g: 255,
    b: 255,
    a: 255,
  }

  const enable = () => {}

  const disable = () => {}

  const onMouseMove = useEvent(async (e: CanvasMouseEvent) => {
    if (!canvasMouse.isMouseDown) return

    // fill gaps with a line in case movement is too fast
    const clickCoords = getCanvasClickMouseCoords(e, editorImage.zoom)
    const hasGaps = isDistanceGreaterThanOne(
      canvasMouse.lastMouseCoords,
      clickCoords
    )
    if (!canvasMouse.isFirstActionTick && hasGaps) {
      const points = getLinePoints(canvasMouse.lastMouseCoords, clickCoords)
      for (const point of points) {
        await paintPixel(
          point.x + editorImage.viewBox.position.x,
          point.y + editorImage.viewBox.position.y
        )
      }
    }
    // render the pixel
    await paintPixel(
      clickCoords.x + editorImage.viewBox.position.x,
      clickCoords.y + editorImage.viewBox.position.y
    )
  })

  const onMouseDown = useEvent(async (e: CanvasMouseEvent) => {
    const clickCoords = getCanvasClickMouseCoords(e, editorImage.zoom)
    // render the pixel
    await paintPixel(
      clickCoords.x + editorImage.viewBox.position.x,
      clickCoords.y + editorImage.viewBox.position.y
    )
  })

  const onMouseUp = useEvent((_e: CanvasMouseEvent) => {})

  const paintPixel = async (x: number, y: number) => {
    const spriteWidth = 500
    const offset = y * spriteWidth * 4 + x * 4
    editorImage.imageBuffer[offset + 0] = color.r // red
    editorImage.imageBuffer[offset + 1] = color.g // green
    editorImage.imageBuffer[offset + 2] = color.b // blue
    editorImage.imageBuffer[offset + 3] = color.a // alpha
    actionHistory.register('Draw')
  }

  return {
    enable,
    disable,
    onMouseMove,
    onMouseDown,
    onMouseUp,
  }
}
