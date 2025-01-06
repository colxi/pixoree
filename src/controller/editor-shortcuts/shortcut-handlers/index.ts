import { canvasMove } from './handlers/canvas-move'
import { colorSwap } from './handlers/color-swap'
import { fileOpen } from './handlers/file-open'
import { fileSave } from './handlers/file-save'
import { historyRedo } from './handlers/history-redo'
import { historyUndo } from './handlers/history-undo'
import { selectBrushTool } from './handlers/select-brush-tool'
import type { ShortcutEventHandlerCatalog } from '../types'

export const eventHandlers: ShortcutEventHandlerCatalog = {
  historyUndo,
  historyRedo,
  selectBrushTool,
  canvasMove,
  colorSwap,
  fileOpen,
  fileSave,
}
