import { RgbaColor } from '@/pages/sprite-editor/types'
import { ColorPicker } from '@/tools/ui-components/color-picker/color/ColorPicker'
import { FC, useEffect, useState } from 'react'
import styles from './ColorPickerModal.module.scss'
import { ColorPreview } from './partials/color-preview/ColorPreview'
import { RgbForm } from './partials/color-form/RgbForm'
import { Button } from '@/tools/ui-components/button/Button'
import { HslForm } from './partials/color-form/HslForm'
import { CmykForm } from './partials/color-form/CmykForm'
import { HexForm } from './partials/color-form/HexForm'
import { ImageEditor } from '@/pages/sprite-editor/controller'
import { ModalCatalog } from '@/pages/sprite-editor/controller/editor-modal/types'

export const ColorPickerModal: FC<ModalCatalog['colorPicker']> = ({ type, color, allowSecondary }) => {
  const [newColor, setNewColor] = useState<RgbaColor>(color)

  const handleOnSelect = (color: RgbaColor) => {
    setNewColor(color)
  }

  const handleOnFormColorChange = (color: RgbaColor) => {
    setNewColor(color)
  }

  const handleAcceptClick = () => {
    if (type === 'primary') ImageEditor.color.setPrimaryColor(newColor)
    if (type === 'secondary') ImageEditor.color.setSecondaryColor(newColor)
    ImageEditor.modal.closeModal()
  }

  const handleCancelClick = () => {
    ImageEditor.modal.closeModal()
  }

  useEffect(() => {
    ImageEditor.modal.setModalTitle('Color Picker')
    ImageEditor.eventBus.subscribe(ImageEditor.eventBus.Event.MODAL_CLOSE_REQUEST, handleCancelClick)

    return () => {
      ImageEditor.eventBus.unsubscribe(ImageEditor.eventBus.Event.MODAL_CLOSE_REQUEST, handleCancelClick)
    }
  }, [])

  return (
    <section className={styles.container}>
      <ColorPicker
        color={newColor}
        allowSecondary={allowSecondary}
        onSelect={handleOnSelect}
      />
      <div>
        <section className={styles.topBlock}>
          <ColorPreview
            oldColor={color}
            newColor={newColor}
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