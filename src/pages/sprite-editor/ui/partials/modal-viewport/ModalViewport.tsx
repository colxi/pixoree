import { Modal } from './modal/Modal'
import { useEffect, useState } from 'react'
import { Pixoree } from '@/pages/sprite-editor/controller'

export const ModalViewport = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    Pixoree.eventBus.subscribe(Pixoree.eventBus.Event.MODAL_OPEN, handleOpenModal)
    Pixoree.eventBus.subscribe(Pixoree.eventBus.Event.MODAL_CLOSE, handleCloseModal)

    return () => {
      Pixoree.eventBus.unsubscribe(Pixoree.eventBus.Event.MODAL_OPEN, handleOpenModal)
      Pixoree.eventBus.unsubscribe(Pixoree.eventBus.Event.MODAL_CLOSE, handleCloseModal)
    }
  }, [])

  return (
    <>
      {isModalOpen && <Modal />}
    </>
  )
}