import { Modal } from './modal/Modal'
import { useEffect, useState } from 'react'
import { ImageEditor } from '@/pages/sprite-editor/controller'

export const ModalViewport = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    ImageEditor.eventBus.subscribe(ImageEditor.eventBus.Event.MODAL_OPEN, handleOpenModal)
    ImageEditor.eventBus.subscribe(ImageEditor.eventBus.Event.MODAL_CLOSE, handleCloseModal)

    return () => {
      ImageEditor.eventBus.unsubscribe(ImageEditor.eventBus.Event.MODAL_OPEN, handleOpenModal)
      ImageEditor.eventBus.unsubscribe(ImageEditor.eventBus.Event.MODAL_CLOSE, handleCloseModal)
    }
  }, [])

  return (
    <>
      {isModalOpen && <Modal />}
    </>
  )
}