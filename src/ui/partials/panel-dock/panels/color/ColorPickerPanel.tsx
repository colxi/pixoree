import { ColorPicker } from '@/tools/ui-components/color-picker/color/ColorPicker'
import { PanelBox } from '../../panel-box/PanelBox'
import { Pixoree } from '@/controllers'
import styles from './ColorPickerPanel.module.scss'
import type { FC } from 'react'
import type { RgbaColor } from '@/types'

export const ColorPickerPanel: FC = () => {

  const handleOnSelect = (color: RgbaColor, type: 'primary' | 'secondary') => {
    if (type === 'primary') Pixoree.color.setPrimaryColor(color)
    if (type === 'secondary') Pixoree.color.setSecondaryColor(color)
  }

  return (
    <PanelBox title="Color">
      <section className={styles.colorPicker}>
        <ColorPicker
          allowSecondary={true}
          color={Pixoree.color.primaryColor}
          onSelect={handleOnSelect}
        />
      </section>
    </PanelBox>
  )
}

