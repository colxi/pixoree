import type { ShortcutEventHandler } from '../../types'
import type { ToolName } from '@/controllers/editor-tools/types'

let previousToolName: ToolName = 'BRUSH'

export const canvasMove: ShortcutEventHandler = (phase, dependencies) => {
  if (phase === 'press') {
    if (dependencies.tools.activeToolName === 'HAND') return
    previousToolName = dependencies.tools.activeToolName
    dependencies.tools.setActiveToolName('HAND')
  } else if (phase === 'release') {
    dependencies.tools.setActiveToolName(previousToolName)
  }
}
