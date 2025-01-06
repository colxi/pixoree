import type { EditorColor } from '../editor-color'
import type { EditorHistory } from '../editor-history'
import type { EditorImage } from '../editor-image'
import type { EditorModal } from '../editor-modal'
import type { EditorTools } from '../editor-tools'

export interface EditorShortcutDependencies {
  history: EditorHistory
  tools: EditorTools
  color: EditorColor
  modal: EditorModal
  image: EditorImage
}

export type ShortcutEventPhase = 'press' | 'release'
export type ShortcutEventHandler = (phase: ShortcutEventPhase, dependencies: EditorShortcutDependencies) => void
export type ShortcutEventHandlerCatalog = Record<ShortcutName, ShortcutEventHandler>
export type ShortcutBindingsCatalog = Record<ShortcutName, string>

export type ShortcutName =
  | 'historyUndo'
  | 'historyRedo'
  | 'selectBrushTool'
  | 'colorSwap'
  | 'canvasMove'
  | 'fileOpen'
  | 'fileSave'
