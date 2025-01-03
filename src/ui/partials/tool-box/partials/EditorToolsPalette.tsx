import { useEffect, type FC } from 'react'
import { Pixoree } from '@/controller'
import { useForceUpdate } from '@/tools/hooks'
import styles from './EditorToolsPalette.module.scss'
import { SpriteEditorTool } from '@/controller/editor-tools/types'

export const EditorToolsPalette: FC = () => {
  const { forceUpdate } = useForceUpdate()

  const handleToolChange = (tool: SpriteEditorTool) => {
    Pixoree.tools.setActiveToolName(tool)
  }

  useEffect(() => {
    Pixoree.eventBus.subscribe([
      Pixoree.eventBus.Event.TOOL_CHANGE,
      Pixoree.eventBus.Event.PRIMARY_COLOR_CHANGE,
      Pixoree.eventBus.Event.SECONDARY_COLOR_CHANGE
    ], forceUpdate)
    return () => {
      Pixoree.eventBus.unsubscribe([
        Pixoree.eventBus.Event.TOOL_CHANGE,
        Pixoree.eventBus.Event.PRIMARY_COLOR_CHANGE,
        Pixoree.eventBus.Event.SECONDARY_COLOR_CHANGE
      ], forceUpdate)
    }
  })

  return (
    <section className={styles.toolsPalette}>
      <div
        className={styles.toolsButton}
        data-active={Pixoree.tools.activeToolName === Pixoree.tools.Tool.MOVE}
        onClick={() => handleToolChange(Pixoree.tools.Tool.MOVE)}
      >
        {Pixoree.tools.getToolIcon(Pixoree.tools.Tool.MOVE)}
      </div>
      <div
        className={styles.toolsButton}
        data-active={Pixoree.tools.activeToolName === Pixoree.tools.Tool.EYE_DROPPER}
        onClick={() => handleToolChange(Pixoree.tools.Tool.EYE_DROPPER)}
      >
        {Pixoree.tools.getToolIcon(Pixoree.tools.Tool.EYE_DROPPER)}
      </div>
      <div
        className={styles.toolsButton}
        data-active={Pixoree.tools.activeToolName === Pixoree.tools.Tool.BRUSH}
        onClick={() => handleToolChange(Pixoree.tools.Tool.BRUSH)}
      >
        {Pixoree.tools.getToolIcon(Pixoree.tools.Tool.BRUSH)}
      </div>
      <div
        className={styles.toolsButton}
        data-active={Pixoree.tools.activeToolName === Pixoree.tools.Tool.PAINT_BUCKET}
        onClick={() => handleToolChange(Pixoree.tools.Tool.PAINT_BUCKET)}
      >
        {Pixoree.tools.getToolIcon(Pixoree.tools.Tool.PAINT_BUCKET)}
      </div>
      <div
        className={styles.toolsButton}
        data-active={Pixoree.tools.activeToolName === Pixoree.tools.Tool.ERASER}
        onClick={() => handleToolChange(Pixoree.tools.Tool.ERASER)}
      >
        {Pixoree.tools.getToolIcon(Pixoree.tools.Tool.ERASER)}
      </div
      >
      <div
        className={styles.toolsButton}
        data-active={Pixoree.tools.activeToolName === Pixoree.tools.Tool.HAND}
        onClick={() => handleToolChange(Pixoree.tools.Tool.HAND)}
      >
        {Pixoree.tools.getToolIcon(Pixoree.tools.Tool.HAND)}
      </div>
      <div
        className={styles.toolsButton}
        data-active={Pixoree.tools.activeToolName === Pixoree.tools.Tool.ZOOM}
        onClick={() => handleToolChange(Pixoree.tools.Tool.ZOOM)}
      >
        {Pixoree.tools.getToolIcon(Pixoree.tools.Tool.ZOOM)}
      </div>
    </section>
  )
}

