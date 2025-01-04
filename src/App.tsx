import { FPSMonitor } from './tools/ui-components/fps-monitor/FPSMonitor'
import { ImageEditor } from './ui/ImageEditor'
import { disableMouseZoom } from './tools/utils/mouse-zoom'
import styles from './App.module.scss'


export function App() {
  disableMouseZoom()

  return (
    <div className={styles.app}>
      <FPSMonitor />
      <ImageEditor />
    </div >
  )
}

