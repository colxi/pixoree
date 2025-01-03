import { RgbaColor } from '@/pages/sprite-editor/types'
import { ColorPicker } from '@/tools/ui-components/color-picker/color/ColorPicker'
import { FC, useEffect, useState } from 'react'
import styles from './ColorPickerModal.module.scss'
import { useImageEditorUi } from '@/pages/sprite-editor/ui/hook'
import { ColorPreview } from './partials/ColorPreview'
import { RgbForm } from './partials/form/RgbForm'
import { Button } from '@/tools/ui-components/button/Button'
import { HslForm } from './partials/form/HslForm'
import { CmykForm } from './partials/form/CmykForm'
import { HexForm } from './partials/form/HexForm'
import { ImageEditor } from '@/pages/sprite-editor/controller'

type Props = {
  type: 'primary' | 'secondary'
  allowSecondary: false
  color: RgbaColor
}

export const ColorPickerModal: FC<Props> = ({ type, color, allowSecondary }) => {
  const { setModalTitle, closeModal } = useImageEditorUi()
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
    closeModal()
  }

  const handleCancelClick = () => {
    closeModal()
  }

  useEffect(() => {
    setModalTitle('Color Picker')
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