import type { ShortcutName } from '@/controllers/editor-shortcuts/types'

export const shortcutDetails: Record<ShortcutName, { label: string; group: string; configurable: boolean }> = {
  historyUndo: { label: 'Undo', group: 'History', configurable: true },
  historyRedo: { label: 'Redo', group: 'History', configurable: true },
  colorSwap: { label: 'Color Swap', group: 'Color', configurable: true },
  canvasMove: { label: 'Move Canvas', group: 'Viewport', configurable: false },
  toolSelectBrush: { label: 'Brush Tool', group: 'Tools', configurable: true },
  toolSelectEraser: { label: 'Eraser Tool', group: 'Tools', configurable: true },
  toolSelectMove: { label: 'Move Tool', group: 'Tools', configurable: true },
  toolSelectHand: { label: 'Hand Tool', group: 'Tools', configurable: true },
  toolSelectZoom: { label: 'Zoom Tool', group: 'Tools', configurable: true },
  toolSelectPaintBucket: { label: 'Paint Bucket Tool', group: 'Tools', configurable: true },
  toolSelectEyeDropper: { label: 'Eye Dropper Tool', group: 'Tools', configurable: true },
  fileOpen: { label: 'Open File', group: 'File', configurable: true },
  fileSave: { label: 'Save File', group: 'File', configurable: true },
}
