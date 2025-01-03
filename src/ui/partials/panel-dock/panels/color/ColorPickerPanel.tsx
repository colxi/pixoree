import { type FC } from 'react'
import { RgbaColor } from '@/types'
import { Pixoree } from '@/controller'
import styles from './ColorPickerPanel.module.scss'
import { ColorPicker } from '@/tools/ui-components/color-picker/color/ColorPicker'
import { PanelBox } from '../../panel-box/PanelBox'

export const ColorPickerPanel: FC = () => {

  const handleOnSelect = (color: RgbaColor, type: 'primary' | 'secondary') => {
    if (type === 'primary') Pixoree.color.setPrimaryColor(color)
    if (type === 'secondary') Pixoree.color.setSecondaryColor(color)
  }

  return (
    <PanelBox title="Color">
      <section className={styles.colorPicker}>
        <ColorPicker
          color={Pixoree.color.primaryColor}
          allowSecondary={true}
          onSelect={handleOnSelect}
        />
      </section>
    </PanelBox>
  )
}

