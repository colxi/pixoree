import { ToolBox } from './partials/tool-box/ToolBox'
import styles from './ImageEditor.module.scss'
import { Viewport } from './partials/viewport/Viewport'
import { StatusBar } from './partials/status-bar/StatusBar'
import { PanelDock } from './partials/panel-dock/PanelsBar'
import { preventDefault } from '@/tools/utils/event'

export const ImageEditor = () => {
  return <>
    <main className={styles.imageEditor} onContextMenu={preventDefault}>
      <ToolBox />
      <section className={styles.middleColumn}>
        <Viewport />
        <StatusBar />
      </section>
      <PanelDock />
    </main>
  </>
}

