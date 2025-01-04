import { ColorPickerPanel } from './panels/color/ColorPickerPanel'
import { HistoryPanel } from './panels/history/HistoryPanel'
import { PalettePanel } from './panels/palette/PalettePanel'
import { SpriteEditorInfo } from './panels/image-info/SpriteEditorInfo'
import { SpriteEditorNavigator } from './panels/image-navigator/SpriteEditorNavigator'
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

