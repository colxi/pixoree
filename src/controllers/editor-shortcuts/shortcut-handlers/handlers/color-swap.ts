import type { ShortcutEventHandler } from '../../types'

export const colorSwap: ShortcutEventHandler = (phase, dependencies) => {
  if (phase === 'press') {
    const primary = dependencies.color.primaryColor
    const secondary = dependencies.color.secondaryColor
    dependencies.color.setPrimaryColor(secondary)
    dependencies.color.setSecondaryColor(primary)
  } else if (phase === 'release') {
    // Noop
  }
}
