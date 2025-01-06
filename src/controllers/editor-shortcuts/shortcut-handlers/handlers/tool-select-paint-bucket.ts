import type { ShortcutEventHandler } from '../../types'

export const toolSelectPaintBucket: ShortcutEventHandler = (phase, dependencies) => {
  if (phase === 'press') {
    dependencies.tools.setActiveToolName('PAINT_BUCKET')
  } else if (phase === 'release') {
    // Noop
  }
}
