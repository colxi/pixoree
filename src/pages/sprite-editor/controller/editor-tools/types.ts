import { Coordinates } from '../../types'
import { EditorHistory } from '../editor-history'
import { EditorColor } from '../editor-color'
import { EditorImage } from '../editor-image'
import { EditorViewport } from '../editor-viewport'
import { EditorEventBus } from '../event-bus'

export interface EditorToolsDependencies {
  image: EditorImage
  history: EditorHistory
  eventBus: EditorEventBus
  color: EditorColor
  viewport: EditorViewport
}

export type EditorTool = {
  icon: () => JSX.Element
  enable: () => void
  disable: () => void
  onMouseMove: (coordinates: Coordinates) => void | Promise<void>
  onMouseDown: (coordinates: Coordinates) => void | Promise<void>
  onMouseUp: (coordinates: Coordinates) => void | Promise<void>
}

export type ToolsMap = Record<SpriteEditorTool, EditorTool>

export enum SpriteEditorTool {
  MOVE = 'MOVE',
  BRUSH = 'BRUSH',
  ERASER = 'ERASER',
  HAND = 'HAND',
  ZOOM = 'ZOOM',
  EYE_DROPPER = 'EYE_DROPPER',
  PAINT_BUCKET = 'PAINT_BUCKET',
}
