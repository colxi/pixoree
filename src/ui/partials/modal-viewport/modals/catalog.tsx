import { ColorPickerModal } from './ColorPickerModal/ColorPickerModal'
import { ShortcutEditorModal } from './ShortcutEditorModal/ShortcutEditorModal'
import type { ModalCatalog, ModalName } from '../../../../controllers/editor-modal/types'
import type React from 'react'

export const modalCatalog: { [K in ModalName]: React.FC<ModalCatalog[K]> } = {
  colorPicker: ColorPickerModal,
  shortcutEditor: ShortcutEditorModal,
} 
