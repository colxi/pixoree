import { BrushTool } from './tools/brush'
import { EraserTool } from './tools/eraser'
import { EyeDropperTool } from './tools/eye-dropper'
import { HandTool } from './tools/hand'
import { MoveTool } from './tools/move'
import { PaintBucketTool } from './tools/paint-bucket'
import { SpriteEditorTool } from './types'
import { ZoomTool } from './tools/zoom'
import { hasKeyModifiers } from '@/tools/utils/keyboard'
import type { EditorToolsDependencies, ToolsMap } from './types';
import type { ReactElement } from 'react'

export class EditorTools {
  constructor({
    image,
    history,
    eventBus,
    color,
    viewport,
  }: EditorToolsDependencies) {
    this.#dependencies = {
      image,
      history,
      eventBus,
      color,
      viewport,
    }

    this.#activeToolName = SpriteEditorTool.BRUSH
    this.#tools = this.getToolsMap()
    this.onKeyDown = this.onKeyDown.bind(this)
    window.addEventListener('keydown', this.onKeyDown)
    this.activeTool.enable()
  }

  #dependencies: EditorToolsDependencies

  #activeToolName = SpriteEditorTool.BRUSH
  #tools: ToolsMap

  public readonly Tool = SpriteEditorTool

  public get activeTool() {
    return this.#tools[this.#activeToolName]
  }

  public get activeToolName() {
    return this.#activeToolName
  }

  public getToolIcon(tool: SpriteEditorTool): ReactElement {
    return this.#tools[tool].icon()
  }

  private getToolsMap(): ToolsMap {
    return {
      [SpriteEditorTool.BRUSH]: new BrushTool({
        color: this.#dependencies.color,
        image: this.#dependencies.image,
        history: this.#dependencies.history,
      }),
      [SpriteEditorTool.ERASER]: new EraserTool({
        image: this.#dependencies.image,
        history: this.#dependencies.history,
      }),
      [SpriteEditorTool.EYE_DROPPER]: new EyeDropperTool({
        color: this.#dependencies.color,
        image: this.#dependencies.image,
      }),
      [SpriteEditorTool.HAND]: new HandTool({
        viewport: this.#dependencies.viewport,
      }),
      [SpriteEditorTool.PAINT_BUCKET]: new PaintBucketTool({
        color: this.#dependencies.color,
        image: this.#dependencies.image,
        history: this.#dependencies.history,
      }),
      [SpriteEditorTool.MOVE]: new MoveTool({
        image: this.#dependencies.image,
      }),
      [SpriteEditorTool.ZOOM]: new ZoomTool({
        image: this.#dependencies.image,
      }),
    }
  }

  private onKeyDown(e: KeyboardEvent) {
    switch (e.code) {
      case 'KeyB': {
        if (hasKeyModifiers(e)) return
        this.setActiveToolName(SpriteEditorTool.BRUSH)
        break
      }
      case 'KeyE': {
        if (hasKeyModifiers(e)) return
        this.setActiveToolName(SpriteEditorTool.ERASER)
        break
      }
      case 'KeyV': {
        if (hasKeyModifiers(e)) return
        this.setActiveToolName(SpriteEditorTool.MOVE)
        break
      }
      case 'KeyH': {
        if (hasKeyModifiers(e)) return
        this.setActiveToolName(SpriteEditorTool.HAND)
        break
      }
      case 'KeyZ': {
        if (hasKeyModifiers(e)) return
        this.setActiveToolName(SpriteEditorTool.ZOOM)
        break
      }
      case 'KeyI': {
        if (hasKeyModifiers(e)) return
        this.setActiveToolName(SpriteEditorTool.EYE_DROPPER)
        break
      }
      case 'KeyG': {
        if (hasKeyModifiers(e)) return
        this.setActiveToolName(SpriteEditorTool.PAINT_BUCKET)
        break
      }
    }
  }

  public setActiveToolName(tool: SpriteEditorTool) {
    this.activeTool.disable()
    this.#activeToolName = tool
    this.activeTool.enable()
    this.#dependencies.eventBus.dispatch(
      this.#dependencies.eventBus.Event.TOOL_CHANGE,
      {}
    )
  }
}
