import type { ShortcutEventHandler } from '../../types'

export const historyUndo: ShortcutEventHandler = (phase, dependencies) => {
  if (phase === 'press') {
    dependencies.history.undo()
  } else if (phase === 'release') {
    // Noop
  }
}
