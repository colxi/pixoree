import type { EditorColor } from '../editor-color'
import type { EditorFile } from '../editor-files'
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
  file: EditorFile
}

export type ShortcutEventPhase = 'press' | 'release'
export type ShortcutEventHandler = (phase: ShortcutEventPhase, dependencies: EditorShortcutDependencies) => void
export type ShortcutEventHandlerCatalog = Record<ShortcutName, ShortcutEventHandler>
export type ShortcutBindingsCatalog = Record<ShortcutName, string>

export type ShortcutName =
  | 'historyUndo'
  | 'historyRedo'
  | 'colorSwap'
  | 'canvasMove'
  | 'fileOpen'
  | 'fileSave'
  | 'toolSelectBrush'
  | 'toolSelectEraser'
  | 'toolSelectMove'
  | 'toolSelectHand'
  | 'toolSelectZoom'
  | 'toolSelectPaintBucket'
  | 'toolSelectEyeDropper'
