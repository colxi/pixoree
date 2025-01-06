import type { ShortcutEventHandler } from '../../types'

export const toolSelectEraser: ShortcutEventHandler = (phase, dependencies) => {
  if (phase === 'press') {
    dependencies.tools.setActiveToolName('ERASER')
  } else if (phase === 'release') {
    // Noop
  }
}
