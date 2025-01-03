import { ToolBox } from './partials/tool-box/ToolBox'
import styles from './ImageEditor.module.scss'
import { Viewport } from './partials/viewport/Viewport'
import { StatusBar } from './partials/status-bar/StatusBar'
import { PanelDock } from './partials/panel-dock/PanelsBar'
import { preventDefault } from '@/tools/utils/event'
import { ImageEditorUiContextProvider } from './hook'
import { ModalManager } from './partials/modal/ModalManager'

export const ImageEditor = () => {
  return (
    <ImageEditorUiContextProvider>
      <main className={styles.imageEditor} onContextMenu={preventDefault}>
        <ToolBox />
        <section className={styles.middleColumn}>
          <Viewport />
          <StatusBar />
        </section>
        <PanelDock />
        <ModalManager />
      </main>
    </ImageEditorUiContextProvider>
  )
}

