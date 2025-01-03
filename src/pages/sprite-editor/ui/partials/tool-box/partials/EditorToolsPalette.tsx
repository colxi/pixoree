import { useEffect, type FC } from 'react'
import { ImageEditor } from '@/pages/sprite-editor/controller'
import { useForceUpdate } from '@/tools/hooks'
import { SpriteEditorTool } from '@/pages/sprite-editor/controller/editor-tools/types'
import styles from './EditorToolsPalette.module.scss'

export const EditorToolsPalette: FC = () => {
  const { forceUpdate } = useForceUpdate()

  const handleToolChange = (tool: SpriteEditorTool) => {
    ImageEditor.tools.setActiveToolName(tool)
  }

  useEffect(() => {
    ImageEditor.eventBus.subscribe([
      ImageEditor.eventBus.Event.TOOL_CHANGE,
      ImageEditor.eventBus.Event.PRIMARY_COLOR_CHANGE,
      ImageEditor.eventBus.Event.SECONDARY_COLOR_CHANGE
    ], forceUpdate)
    return () => {
      ImageEditor.eventBus.unsubscribe([
        ImageEditor.eventBus.Event.TOOL_CHANGE,
        ImageEditor.eventBus.Event.PRIMARY_COLOR_CHANGE,
        ImageEditor.eventBus.Event.SECONDARY_COLOR_CHANGE
      ], forceUpdate)
    }
  })

  return (
    <section className={styles.toolsPalette}>
      <div
        className={styles.toolsButton}
        data-active={ImageEditor.tools.activeToolName === ImageEditor.tools.Tool.MOVE}
        onClick={() => handleToolChange(ImageEditor.tools.Tool.MOVE)}
      >
        {ImageEditor.tools.getToolIcon(ImageEditor.tools.Tool.MOVE)}
      </div>
      <div
        className={styles.toolsButton}
        data-active={ImageEditor.tools.activeToolName === ImageEditor.tools.Tool.EYE_DROPPER}
        onClick={() => handleToolChange(ImageEditor.tools.Tool.EYE_DROPPER)}
      >
        {ImageEditor.tools.getToolIcon(ImageEditor.tools.Tool.EYE_DROPPER)}
      </div>
      <div
        className={styles.toolsButton}
        data-active={ImageEditor.tools.activeToolName === ImageEditor.tools.Tool.BRUSH}
        onClick={() => handleToolChange(ImageEditor.tools.Tool.BRUSH)}
      >
        {ImageEditor.tools.getToolIcon(ImageEditor.tools.Tool.BRUSH)}
      </div>
      <div
        className={styles.toolsButton}
        data-active={ImageEditor.tools.activeToolName === ImageEditor.tools.Tool.PAINT_BUCKET}
        onClick={() => handleToolChange(ImageEditor.tools.Tool.PAINT_BUCKET)}
      >
        {ImageEditor.tools.getToolIcon(ImageEditor.tools.Tool.PAINT_BUCKET)}
      </div>
      <div
        className={styles.toolsButton}
        data-active={ImageEditor.tools.activeToolName === ImageEditor.tools.Tool.ERASER}
        onClick={() => handleToolChange(ImageEditor.tools.Tool.ERASER)}
      >
        {ImageEditor.tools.getToolIcon(ImageEditor.tools.Tool.ERASER)}
      </div
      >
      <div
        className={styles.toolsButton}
        data-active={ImageEditor.tools.activeToolName === ImageEditor.tools.Tool.HAND}
        onClick={() => handleToolChange(ImageEditor.tools.Tool.HAND)}
      >
        {ImageEditor.tools.getToolIcon(ImageEditor.tools.Tool.HAND)}
      </div>
      <div
        className={styles.toolsButton}
        data-active={ImageEditor.tools.activeToolName === ImageEditor.tools.Tool.ZOOM}
        onClick={() => handleToolChange(ImageEditor.tools.Tool.ZOOM)}
      >
        {ImageEditor.tools.getToolIcon(ImageEditor.tools.Tool.ZOOM)}
      </div>
    </section>
  )
}

