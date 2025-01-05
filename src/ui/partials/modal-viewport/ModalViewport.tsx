import { Modal } from './modal/Modal'
import { Pixoree } from '@/controller'
import { useEffect, useState } from 'react'

export const ModalViewport = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    Pixoree.eventBus.subscribe('MODAL_OPEN', handleOpenModal)
    Pixoree.eventBus.subscribe('MODAL_CLOSE', handleCloseModal)

    return () => {
      Pixoree.eventBus.unsubscribe('MODAL_OPEN', handleOpenModal)
      Pixoree.eventBus.unsubscribe('MODAL_CLOSE', handleCloseModal)
    }
  }, [])

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isModalOpen && <Modal />}
    </>
  )
}