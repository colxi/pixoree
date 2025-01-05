import { Pixoree } from '@/controller'
import { useEffect } from 'react'
import { useForceUpdate } from '@/tools/hooks'
import styles from './EditorToolsPalette.module.scss'
import type { FC } from 'react'
import type { ToolName } from '@/controller/editor-tools/types'

export const EditorToolsPalette: FC = () => {
  const { forceUpdate } = useForceUpdate()

  const handleToolChange = (tool: ToolName) => {
    Pixoree.tools.setActiveToolName(tool)
  }

  useEffect(() => {
    Pixoree.eventBus.subscribe([
      'TOOL_CHANGE',
      'PRIMARY_COLOR_CHANGE',
      'SECONDARY_COLOR_CHANGE'
    ], forceUpdate)
    return () => {
      Pixoree.eventBus.unsubscribe([
        'TOOL_CHANGE',
        'PRIMARY_COLOR_CHANGE',
        'SECONDARY_COLOR_CHANGE'
      ], forceUpdate)
    }
  })

  return (
    <section className={styles.toolsPalette}>
      <div
        className={styles.toolsButton}
        data-active={Pixoree.tools.activeToolName === 'MOVE'}
        onClick={() => handleToolChange('MOVE')}
      >
        {Pixoree.tools.getToolIcon('MOVE')}
      </div>
      <div
        className={styles.toolsButton}
        data-active={Pixoree.tools.activeToolName === 'EYE_DROPPER'}
        onClick={() => handleToolChange('EYE_DROPPER')}
      >
        {Pixoree.tools.getToolIcon('EYE_DROPPER')}
      </div>
      <div
        className={styles.toolsButton}
        data-active={Pixoree.tools.activeToolName === 'BRUSH'}
        onClick={() => handleToolChange('BRUSH')}
      >
        {Pixoree.tools.getToolIcon('BRUSH')}
      </div>
      <div
        className={styles.toolsButton}
        data-active={Pixoree.tools.activeToolName === 'PAINT_BUCKET'}
        onClick={() => handleToolChange('PAINT_BUCKET')}
      >
        {Pixoree.tools.getToolIcon('PAINT_BUCKET')}
      </div>
      <div
        className={styles.toolsButton}
        data-active={Pixoree.tools.activeToolName === 'ERASER'}
        onClick={() => handleToolChange('ERASER')}
      >
        {Pixoree.tools.getToolIcon('ERASER')}
      </div
      >
      <div
        className={styles.toolsButton}
        data-active={Pixoree.tools.activeToolName === 'HAND'}
        onClick={() => handleToolChange('HAND')}
      >
        {Pixoree.tools.getToolIcon('HAND')}
      </div>
      <div
        className={styles.toolsButton}
        data-active={Pixoree.tools.activeToolName === 'ZOOM'}
        onClick={() => handleToolChange('ZOOM')}
      >
        {Pixoree.tools.getToolIcon('ZOOM')}
      </div>
    </section>
  )
}

