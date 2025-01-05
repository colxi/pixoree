import { Button } from '@/tools/ui-components/button/Button'
import { CmykForm } from './partials/color-form/CmykForm'
import { ColorPicker } from '@/tools/ui-components/color-picker/color/ColorPicker'
import { ColorPreview } from './partials/color-preview/ColorPreview'
import { HexForm } from './partials/color-form/HexForm'
import { HslForm } from './partials/color-form/HslForm'
import { Pixoree } from '@/controller'
import { RgbForm } from './partials/color-form/RgbForm'
import { useEffect, useState } from 'react'
import styles from './ColorPickerModal.module.scss'
import type { FC } from 'react'
import type { ModalCatalog } from '@/controller/editor-modal/types'
import type { RgbaColor } from '@/types'

export const ColorPickerModal: FC<ModalCatalog['colorPicker']> = ({ type, color, allowSecondary }) => {
  const [newColor, setNewColor] = useState<RgbaColor>(color)

  const handleOnSelect = (color: RgbaColor) => {
    setNewColor(color)
  }

  const handleOnFormColorChange = (color: RgbaColor) => {
    setNewColor(color)
  }

  const handleAcceptClick = () => {
    if (type === 'primary') Pixoree.color.setPrimaryColor(newColor)
    if (type === 'secondary') Pixoree.color.setSecondaryColor(newColor)
    Pixoree.modal.closeModal()
  }

  const handleCancelClick = () => {
    Pixoree.modal.closeModal()
  }

  useEffect(() => {
    Pixoree.modal.setModalTitle('Color Picker')
    Pixoree.eventBus.subscribe('MODAL_CLOSE_REQUEST', handleCancelClick)

    return () => {
      Pixoree.eventBus.unsubscribe('MODAL_CLOSE_REQUEST', handleCancelClick)
    }
  }, [])

  return (
    <section className={styles.container}>
      <ColorPicker
        allowSecondary={allowSecondary}
        color={newColor}
        onSelect={handleOnSelect}
      />
      <div>
        <section className={styles.topBlock}>
          <ColorPreview
            newColor={newColor}
            oldColor={color}
            onClick={handleOnFormColorChange}
          />
          <div className={styles.action}>
            <Button onClick={handleAcceptClick}>OK</Button>
            <Button onClick={handleCancelClick}>Cancel</ Button>
          </div>
        </section>
        <section className={styles.bottomBlock}>
          <RgbForm color={newColor} onChange={handleOnFormColorChange} />
          <HslForm color={newColor} onChange={handleOnFormColorChange} />
          <HexForm color={newColor} onChange={handleOnFormColorChange} />
          <CmykForm color={newColor} onChange={handleOnFormColorChange} />
        </section>
      </div>
    </section>
  )
}