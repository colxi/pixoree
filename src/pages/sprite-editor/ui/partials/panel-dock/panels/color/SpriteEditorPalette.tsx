import { useState, type FC } from 'react'
import { ColorBrightness } from './partials/ColorBrightness'
import styles from './SpriteEditorPalette.module.scss'
import { PanelBox } from '@/pages/sprite-editor/ui/partials/panel-dock/panel-box/PanelBox'
import { ColorHue } from './partials/ColorHue'
import { RgbaColor } from '@/pages/sprite-editor/types'

export const SpriteEditorPalette: FC = () => {
  const [baseColor, setBaseColor] = useState<RgbaColor>({ r: 0, g: 0, b: 0, a: 255 })

  const handleSelectColor = (color: RgbaColor) => {
    setBaseColor(color)
  }

  return (
    <>
      <PanelBox title="Palette">
        <section className={styles.colorPicker}>
          <ColorBrightness baseColor={baseColor} />
          <ColorHue onSelectColor={handleSelectColor} />
        </section>
      </PanelBox>
    </>
  )
}

