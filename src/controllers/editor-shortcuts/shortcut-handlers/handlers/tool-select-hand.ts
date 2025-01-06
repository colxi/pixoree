import type { ShortcutEventHandler } from '../../types'

export const toolSelectHand: ShortcutEventHandler = (phase, dependencies) => {
  if (phase === 'press') {
    dependencies.tools.setActiveToolName('HAND')
  } else if (phase === 'release') {
    // Noop
  }
}
