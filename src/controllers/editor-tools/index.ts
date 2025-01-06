import { BrushTool } from './tools/brush'
import { EraserTool } from './tools/eraser'
import { EyeDropperTool } from './tools/eye-dropper'
import { HandTool } from './tools/hand'
import { MoveTool } from './tools/move'
import { PaintBucketTool } from './tools/paint-bucket'
import { ZoomTool } from './tools/zoom'
import type { EditorToolsDependencies, ToolName, ToolsMap } from './types'
import type { ReactElement } from 'react'

export class EditorTools {
  public constructor({ image, history, eventBus, color, viewport }: EditorToolsDependencies) {
    this.#dependencies = {
      image,
      history,
      eventBus,
      color,
      viewport,
    }

    this.#activeToolName = 'BRUSH'
    this.#tools = this.getToolsMap()
    this.activeTool.enable()
  }

  #dependencies: EditorToolsDependencies

  #activeToolName: ToolName
  #tools: ToolsMap

  public get activeTool() {
    return this.#tools[this.#activeToolName]
  }

  public get activeToolName() {
    return this.#activeToolName
  }

  public getToolIcon(tool: ToolName): ReactElement {
    return this.#tools[tool].icon()
  }

  private getToolsMap(): ToolsMap {
    return {
      BRUSH: new BrushTool({
        color: this.#dependencies.color,
        image: this.#dependencies.image,
        history: this.#dependencies.history,
      }),
      ERASER: new EraserTool({
        image: this.#dependencies.image,
        history: this.#dependencies.history,
      }),
      EYE_DROPPER: new EyeDropperTool({
        color: this.#dependencies.color,
        image: this.#dependencies.image,
      }),
      HAND: new HandTool({
        viewport: this.#dependencies.viewport,
      }),
      PAINT_BUCKET: new PaintBucketTool({
        color: this.#dependencies.color,
        image: this.#dependencies.image,
        history: this.#dependencies.history,
      }),
      MOVE: new MoveTool({
        image: this.#dependencies.image,
      }),
      ZOOM: new ZoomTool({
        image: this.#dependencies.image,
      }),
    }
  }

  public setActiveToolName(tool: ToolName) {
    this.activeTool.disable()
    this.#activeToolName = tool
    this.activeTool.enable()
    this.#dependencies.eventBus.dispatch('TOOL_CHANGE', {})
  }
}
