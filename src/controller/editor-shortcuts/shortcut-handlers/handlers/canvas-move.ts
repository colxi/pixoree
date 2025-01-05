import type { ShortcutEventHandler } from '../../types'
import type { ToolName } from '@/controller/editor-tools/types'

let previousToolName: ToolName = 'BRUSH'

export const canvasMove: ShortcutEventHandler = (phase, dependencies) => {
  if (phase === 'press') {
    previousToolName = dependencies.tools.activeToolName
    dependencies.tools.setActiveToolName('HAND')
  } else if (phase === 'release') {
    dependencies.tools.setActiveToolName(previousToolName)
  }
}
