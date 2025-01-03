import { ToolBox } from './partials/tool-box/ToolBox'
import { ImageViewport } from './partials/image-viewport/ImageViewport'
import { StatusBar } from './partials/status-bar/StatusBar'
import { PanelDock } from './partials/panel-dock/PanelsBar'
import { preventDefault } from '@/tools/utils/event'
import { ModalViewport } from './partials/modal-viewport/ModalViewport'
import styles from './ImageEditor.module.scss'

export const ImageEditor = () => {
  return (
    <main className={styles.imageEditor} onContextMenu={preventDefault}>
      <ToolBox />
      <section className={styles.middleColumn}>
        <ImageViewport />
        <StatusBar />
      </section>
      <PanelDock />
      <ModalViewport />
    </main>
  )
}

