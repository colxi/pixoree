import type { ShortcutBindingsCatalog } from '../types'

export const bindings: ShortcutBindingsCatalog = {
  historyUndo: 'Meta--KeyZ',
  historyRedo: 'Shift--Meta--KeyZ',
  colorSwap: 'KeyX',
  canvasMove: 'Space',
  selectBrushTool: 'KeyB',
  fileOpen: 'Meta--KeyO',
  fileSave: 'Meta--KeyS',
}

/**
  private onKeyDown(e: KeyboardEvent) {
    switch (e.code) {
      case 'KeyB': {
        if (hasKeyModifiers(e)) return
        this.setActiveToolName('BRUSH')
        break
      }
      case 'KeyE': {
        if (hasKeyModifiers(e)) return
        this.setActiveToolName('ERASER')
        break
      }
      case 'KeyV': {
        if (hasKeyModifiers(e)) return
        this.setActiveToolName('MOVE')
        break
      }
      case 'KeyH': {
        if (hasKeyModifiers(e)) return
        this.setActiveToolName('HAND')
        break
      }
      case 'KeyZ': {
        if (hasKeyModifiers(e)) return
        this.setActiveToolName('ZOOM')
        break
      }
      case 'KeyI': {
        if (hasKeyModifiers(e)) return
        this.setActiveToolName('EYE_DROPPER')
        break
      }
      case 'KeyG': {
        if (hasKeyModifiers(e)) return
        this.setActiveToolName('PAINT_BUCKET')
        break
      }
    }
  }
    */

// export const shortcutDetails: Record<ShortcutName, { label: string; group: string; configurable: boolean }> = {
//   historyUndo: { label: 'Undo', group: 'History', configurable: true },
//   historyRedo: { label: 'Redo', group: 'History', configurable: true },
//   selectBrushTool: { label: 'Brush Tool', group: 'Tools', configurable: true },
//   colorSwap: { label: 'Color Swap', group: 'Color', configurable: true },
//   canvasMove: { label: 'Move Canvas', group: 'Viewport', configurable: false },
// }
