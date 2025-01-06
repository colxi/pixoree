import { Pixoree } from '@/controller'
import styles from './MenuBar.module.scss'


export const MenuBar = () => {
  const fileOpen = Pixoree.shortcuts.getShortcutKeys('fileOpen')
  const fileSave = Pixoree.shortcuts.getShortcutKeys('fileSave')
  return (
    <div className={styles.menuBar}>
      <div className={styles.pixoree}>
        Pixoree
      </div>
      <div>
        <div className={styles.menuItem} data-active="true">File</div>
        <div className={styles.menuDropdown}>
          <div>Open... {fileOpen}</div>
          <div>Save {fileSave}</div>
          <div>Close</div>
        </div>
      </div>
      <div >Edit</div>
      <div>Image</div>
      <div>Help</div>
    </div>
  )
}