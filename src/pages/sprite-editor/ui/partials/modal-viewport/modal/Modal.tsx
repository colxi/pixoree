import { useEffect, useRef, useState } from 'react'
import { Coordinates } from '@/pages/sprite-editor/types'
import { useEvent } from '@/tools/hooks'
import { getElementCoordinatesFromMouseEvent } from '@/tools/utils/event'
import styles from './Modal.module.scss'
import { Pixoree } from '@/pages/sprite-editor/controller'
import { modalCatalog } from '../modals/catalog'

export const Modal = () => {
  const modalElementRef = useRef<HTMLDivElement | null>(null)
  const overlayElementRef = useRef<HTMLDivElement | null>(null)
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [mouseDownCoordinatesOffset, setMouseDownCoordinatesOffset] = useState<Coordinates>({ x: 0, y: 0 })
  const [modalCoordinates, setModalCoordinates] = useState<Coordinates>({ x: 0, y: 0 })
  const [modalTitle, setModalTitle] = useState<string>('')

  const centerModal = () => {
    if (!modalElementRef.current || !overlayElementRef.current) return
    const modalRect = modalElementRef.current.getBoundingClientRect()
    const overlayRect = overlayElementRef.current.getBoundingClientRect()
    const coordinates = {
      x: (overlayRect.width - modalRect.width) / 2,
      y: (overlayRect.height - modalRect.height) / 2
    }
    setModalCoordinates(coordinates)
    setIsModalVisible(true)
  }

  const getModalComponent = () => {
    return (Pixoree.modal.activeModal
      ? modalCatalog[Pixoree.modal.activeModal.name](Pixoree.modal.activeModal.params)
      : undefined)
  }

  const handleMouseDown = (event: React.MouseEvent) => {
    const coordinates = getElementCoordinatesFromMouseEvent(event)
    setMouseDownCoordinatesOffset(coordinates)
    setIsMouseDown(true)
  }

  const handleMouseUp = () => {
    setIsMouseDown(false)
  }

  const handleMouseMove = useEvent((event: MouseEvent) => {
    if (!isMouseDown) return
    if (!modalElementRef.current || !overlayElementRef.current) return
    // limit position coordinates to ensure modal lives inside the available area
    const modalRect = modalElementRef.current.getBoundingClientRect()
    const overlayRect = overlayElementRef.current.getBoundingClientRect()
    let x: number = event.clientX - mouseDownCoordinatesOffset.x
    let y: number = event.clientY - mouseDownCoordinatesOffset.y
    if (x < overlayRect.left) x = overlayRect.left
    if (x + modalRect.width > overlayRect.right) x = overlayRect.right - modalRect.width
    if (y < overlayRect.top) y = overlayRect.top
    if (y + modalRect.height > overlayRect.bottom) y = overlayRect.bottom - modalRect.height
    setModalCoordinates({ x, y })
  })

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Escape') {
      Pixoree.eventBus.dispatch(Pixoree.eventBus.Event.MODAL_CLOSE_REQUEST, {})
    }
  }

  const handleModalTitleChange = () => {
    setModalTitle(Pixoree.modal.modalTitle)
  }

  useEffect(() => {
    centerModal()
    Pixoree.eventBus.subscribe(Pixoree.eventBus.Event.MODAL_TITLE_CHANGE, handleModalTitleChange)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      Pixoree.eventBus.unsubscribe(Pixoree.eventBus.Event.MODAL_TITLE_CHANGE, handleModalTitleChange)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <main
      ref={overlayElementRef}
      className={styles.modalOverlay}
    >
      <section
        ref={modalElementRef}
        className={styles.modalContainer}
        data-visible={isModalVisible}
        style={{
          top: modalCoordinates.y,
          left: modalCoordinates.x,
        }}
      >
        <div onMouseDown={handleMouseDown} className={styles.modalTitle}>{modalTitle}</div>
        <div className={styles.modalContent}>{getModalComponent()}</div>
      </section>
    </main>
  )
}