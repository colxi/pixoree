import { useState, type FC } from 'react'
import { PanelBox } from '@/pages/sprite-editor/ui/partials/panel-dock/panel-box/PanelBox'
import { RgbaColor } from '@/pages/sprite-editor/types'
import { ImageEditor } from '@/pages/sprite-editor/controller'
import styles from './ColorPickerPanel.module.scss'
import { ColorPicker } from '@/tools/ui-components/color-picker/color/ColorPicker'

export const ColorPickerPanel: FC = () => {

  const handleOnSelect = (color: RgbaColor, type: 'primary' | 'secondary') => {
    if (type === 'primary') ImageEditor.color.setPrimaryColor(color)
    if (type === 'secondary') ImageEditor.color.setSecondaryColor(color)
  }

  return (
    <PanelBox title="Color">
      <section className={styles.colorPicker}>
        <ColorPicker
          color={ImageEditor.color.primaryColor}
          allowSecondary={true}
          onSelect={handleOnSelect}
        />
      </section>
    </PanelBox>
  )
}

