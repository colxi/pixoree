import { useImageEditorUi } from '../../hook'
import { ColorPickerModal } from './modals/ColorPickerModal/ColorPickerModal'
import { Modal } from './modal/Modal'

export const modalsDictionary = {
  colorPicker: ColorPickerModal
}

export type ModalDictionary = {
  [K in keyof typeof modalsDictionary]: Parameters<typeof modalsDictionary[K]>[0]
}

export const ModalManager = () => {
  const { activeModal } = useImageEditorUi()


  return (
    <>
      {activeModal && <Modal />}
    </>
  )
}