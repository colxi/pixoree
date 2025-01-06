import type { ShortcutEventHandler } from '../../types'

export const toolSelectZoom: ShortcutEventHandler = (phase, dependencies) => {
  if (phase === 'press') {
    dependencies.tools.setActiveToolName('ZOOM')
  } else if (phase === 'release') {
    // Noop
  }
}
