import { useEffect, useState } from 'react'
import { Coordinates } from '@/pages/sprite-editor/types'
import { useEvent } from '@/tools/hooks'
import { getElementCoordinatesFromMouseEvent } from '@/tools/utils/event'
import styles from './Modal.module.scss'
import { useImageEditorUi } from '../../../hook'
import { modalsDictionary } from '../ModalManager'

export const Modal = () => {
  const [isMouseDown, setIsMouseDown] = useState(false)
  const [mouseDownCoordinatesOffset, setMouseDownCoordinatesOffset] = useState<Coordinates>({ x: 0, y: 0 })
  const [modalCoordinates, setMouseCoordinates] = useState<Coordinates>({ x: 0, y: 0 })
  const { activeModal, modalTitle } = useImageEditorUi()

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
    const x = Math.max(event.clientX - mouseDownCoordinatesOffset.x, 0)
    const y = Math.max(event.clientY - mouseDownCoordinatesOffset.y, 0)
    setMouseCoordinates({ x, y })
  })

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <div className={styles.modalOverlay}>
      <div
        className={styles.modalContainer}
        style={{
          top: modalCoordinates.y,
          left: modalCoordinates.x,
        }}
      >
        <div onMouseDown={handleMouseDown} className={styles.modalTitle} >
          {modalTitle}
        </div>
        <div className={styles.modalContent}>
          {modalsDictionary[activeModal!.name](activeModal!.params)}
        </div>
      </div>
    </div>
  )
}