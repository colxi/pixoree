import type { Coordinates } from '../../types'
import type { EditorColor } from '../editor-color'
import type { EditorEventBus } from '../event-bus'
import type { EditorHistory } from '../editor-history'
import type { EditorImage } from '../editor-image'
import type { EditorViewport } from '../editor-viewport'
import type { ReactElement } from 'react'

export interface EditorToolsDependencies {
  image: EditorImage
  history: EditorHistory
  eventBus: EditorEventBus
  color: EditorColor
  viewport: EditorViewport
}

export type EditorTool = {
  icon: () => ReactElement
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
