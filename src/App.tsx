import { FPSMonitor } from './tools/ui-components/fps-monitor/FPSMonitor'
import styles from './App.module.scss'
import { disableMouseZoom } from './tools/utils/mouse-zoom'
import { ImageEditor } from './ui/ImageEditor'


export function App() {
  disableMouseZoom()

  return (
    <>
      <div className={styles.app}>
        <FPSMonitor />
        <ImageEditor />
      </div >
    </>
  )
}

