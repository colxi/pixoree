import { ColorPickerPanel } from './panels/color/ColorPickerPanel'
import { HistoryPanel } from './panels/history/HistoryPanel'
import { SpriteEditorNavigator } from './panels/image-navigator/SpriteEditorNavigator'
import { SpriteEditorInfo } from './panels/image-info/SpriteEditorInfo'
import { PalettePanel } from './panels/palette/PalettePanel'
import styles from './PanelDock.module.scss'

export const PanelDock = () => {
  return (
    <div>
      <aside className={styles.panelDock}>
        <SpriteEditorInfo />
        <SpriteEditorNavigator />
        <ColorPickerPanel />
        <PalettePanel />
        <HistoryPanel />
      </aside>
    </div>
  )
}

