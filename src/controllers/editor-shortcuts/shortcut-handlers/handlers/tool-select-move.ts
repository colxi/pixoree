import type { ShortcutEventHandler } from '../../types'

export const toolSelectMove: ShortcutEventHandler = (phase, dependencies) => {
  if (phase === 'press') {
    dependencies.tools.setActiveToolName('MOVE')
  } else if (phase === 'release') {
    // Noop
  }
}
