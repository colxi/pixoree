import type { ShortcutEventHandler } from '../../types'

export const toolSelectEyeDropper: ShortcutEventHandler = (phase, dependencies) => {
  if (phase === 'press') {
    dependencies.tools.setActiveToolName('EYE_DROPPER')
  } else if (phase === 'release') {
    // Noop
  }
}
