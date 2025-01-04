import { ColorPickerModal } from './ColorPickerModal/ColorPickerModal'
import type { ModalCatalog, ModalName } from '../../../../controller/editor-modal/types'
import type React from 'react'

export const modalCatalog: { [K in ModalName]: React.FC<ModalCatalog[K]> } = {
  colorPicker: ColorPickerModal,
} 
