import { createContextProvider } from '@/tools/utils'
import { useState } from 'react'
import { ModalDictionary } from '../partials/modal/ModalManager'

export const [useImageEditorUi, ImageEditorUiContextProvider] =
  createContextProvider('ImageEditorUi', () => {
    const [modalTitle, setModalTitle] = useState<string>('')
    const [activeModal, setActiveModal] = useState<{
      name: keyof ModalDictionary
      params: ModalDictionary[keyof ModalDictionary]
    } | null>(null)

    const openModal = <MODAL extends keyof ModalDictionary>(
      name: MODAL,
      params: ModalDictionary[MODAL]
    ) => {
      setActiveModal({ name, params })
    }

    const closeModal = () => {
      setActiveModal(null)
    }

    return {
      openModal,
      closeModal,
      setModalTitle,
      activeModal,
      modalTitle,
    }
  })
