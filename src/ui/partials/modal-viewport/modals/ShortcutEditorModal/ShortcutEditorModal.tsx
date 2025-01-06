import { Button } from '@/tools/ui-components/button/Button'
import { type FC, useEffect } from 'react'
import { Pixoree } from '@/controllers'
import { shortcutDetails } from './shortcuts'
import styles from './ShortcutEditorModal.module.scss'
import type { ModalCatalog } from '@/controllers/editor-modal/types'
import type { ShortcutName } from '@/controllers/editor-shortcuts/types'


export const ShortcutEditorModal: FC<ModalCatalog['shortcutEditor']> = (_props) => {
  const handleCancelClick = () => {
    Pixoree.modal.closeModal()
  }

  const handleSaveClick = () => {
    Pixoree.modal.closeModal()
  }

  const getFormattedShortcutKeys = (shortcutName: string) => {
    const keys = Pixoree.shortcuts.getShortcutKeys(shortcutName as ShortcutName)
    return Pixoree.shortcuts.getFormattedShortcutKeys(keys)
  }

  useEffect(() => {
    Pixoree.modal.setModalTitle('Edit shortcuts')
    Pixoree.eventBus.subscribe('MODAL_CLOSE_REQUEST', handleCancelClick)

    return () => {
      Pixoree.eventBus.unsubscribe('MODAL_CLOSE_REQUEST', handleCancelClick)
    }
  }, [])

  return (
    <section className={styles.container}>
      <div>
        {Object.entries(shortcutDetails).map(([shortcutName, entry], index) => (
          <div className={styles.shortcut} key={index}>
            <span>{entry.label}</span>
            <span>{getFormattedShortcutKeys(shortcutName)}</span>
          </div>
        ))}
      </div>
      <div className={styles.action}>
        <Button onClick={handleSaveClick}>OK</Button>
        <Button onClick={handleCancelClick}>Cancel</Button>
      </div>
    </section>
  )
}