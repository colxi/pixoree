import { ColorPickerModal } from './ColorPickerModal/ColorPickerModal'
import { ModalCatalog, ModalName } from '../../../../controller/editor-modal/types'
import React from 'react'

export const modalCatalog: { [K in ModalName]: React.FC<ModalCatalog[K]> } = {
  colorPicker: ColorPickerModal,
} 
