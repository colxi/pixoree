import { canvasMove } from './handlers/canvas-move'
import { colorSwap } from './handlers/color-swap'
import { fileOpen } from './handlers/file-open'
import { fileSave } from './handlers/file-save'
import { historyRedo } from './handlers/history-redo'
import { historyUndo } from './handlers/history-undo'
import { toolSelectBrush } from './handlers/tool-select-brush'
import { toolSelectEraser } from './handlers/tool-select-eraser'
import { toolSelectEyeDropper } from './handlers/tool-select-eye-dropper'
import { toolSelectHand } from './handlers/tool-select-hand'
import { toolSelectMove } from './handlers/tool-select-move'
import { toolSelectPaintBucket } from './handlers/tool-select-paint-bucket'
import { toolSelectZoom } from './handlers/tool-select-zoom'
import type { ShortcutEventHandlerCatalog } from '../types'

export const eventHandlers: ShortcutEventHandlerCatalog = {
  historyUndo,
  historyRedo,
  canvasMove,
  colorSwap,
  fileOpen,
  fileSave,
  toolSelectHand,
  toolSelectMove,
  toolSelectZoom,
  toolSelectBrush,
  toolSelectEraser,
  toolSelectPaintBucket,
  toolSelectEyeDropper,
}
