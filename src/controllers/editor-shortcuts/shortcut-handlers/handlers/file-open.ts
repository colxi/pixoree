import type { ShortcutEventHandler } from '../../types'

export const fileOpen: ShortcutEventHandler = (phase, dependencies) => {
  if (phase === 'press') {
    dependencies.file.open()
  } else if (phase === 'release') {
    // Noop
  }
}
