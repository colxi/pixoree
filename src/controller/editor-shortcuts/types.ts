import type { EditorColor } from '../editor-color'
import type { EditorHistory } from '../editor-history'
import type { EditorModal } from '../editor-modal'
import type { EditorTools } from '../editor-tools'

export interface EditorShortcutDependencies {
  history: EditorHistory
  tools: EditorTools
  color: EditorColor
  modal: EditorModal
}

export type ShortcutName = 'historyUndo' | 'historyRedo' | 'selectBrushTool' | 'colorSwap' | 'canvasMove'
export type ShortcutEventPhase = 'press' | 'release'
export type ShortcutEventHandler = (phase: ShortcutEventPhase, dependencies: EditorShortcutDependencies) => void
export type ShortcutEventHandlerCatalog = Record<ShortcutName, ShortcutEventHandler>
export type ShortcutBindingsCatalog = Record<ShortcutName, string>
