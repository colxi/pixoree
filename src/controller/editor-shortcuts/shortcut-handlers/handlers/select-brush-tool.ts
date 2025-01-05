import type { ShortcutEventHandler } from '../../types'

export const selectBrushTool: ShortcutEventHandler = (phase, dependencies) => {
  if (phase === 'press') {
    dependencies.tools.setActiveToolName('BRUSH')
  } else if (phase === 'release') {
    // Noop
  }
}
