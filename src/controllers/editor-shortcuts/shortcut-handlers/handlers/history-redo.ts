import type { ShortcutEventHandler } from '../../types'

export const historyRedo: ShortcutEventHandler = (phase, dependencies) => {
  if (phase === 'press') {
    dependencies.history.redo()
  } else if (phase === 'release') {
    // Noop
  }
}
