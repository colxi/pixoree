import type { ShortcutEventHandler } from '../../types'

export const fileOpen: ShortcutEventHandler = (phase, dependencies) => {
  if (phase === 'press') {
    dependencies.image.open()
  } else if (phase === 'release') {
    // Noop
  }
}
