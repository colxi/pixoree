import { SpriteEditorPalette } from './panels/color/SpriteEditorPalette'
import { HistoryPanel } from './panels/history/HistoryPanel'
import { SpriteEditorNavigator } from './panels/image-navigator/SpriteEditorNavigator'
import { SpriteEditorInfo } from './panels/image-info/SpriteEditorInfo'
import styles from './PanelDock.module.scss'

export const PanelDock = () => {
  return (
    <div>
      <aside className={styles.panelDock}>
        <SpriteEditorInfo />
        <SpriteEditorNavigator />
        <SpriteEditorPalette />
        <HistoryPanel />
      </aside>
    </div>
  )
}

