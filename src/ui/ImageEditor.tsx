import { ImageViewport } from './partials/image-viewport/ImageViewport'
import { ModalViewport } from './partials/modal-viewport/ModalViewport'
import { PanelDock } from './partials/panel-dock/PanelsBar'
import { StatusBar } from './partials/status-bar/StatusBar'
import { ToolBox } from './partials/tool-box/ToolBox'
import { preventDefault } from '@/tools/utils/event'
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

