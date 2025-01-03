import { useEffect, useState, type FC } from 'react'
import { ColorPickerBox } from './partials/ColorPickerBox'
import { HuePickerBox } from './partials/HuePickerBox'
import { RgbaColor } from '@/pages/sprite-editor/types'
import { getHslColorFromRgba, getHueFromRgba, getRgbaColorFromHsl } from '@/tools/utils/color'
import styles from './ColorPicker.module.scss'

type Props = {
  onSelect: (color: RgbaColor, type: 'primary' | 'secondary') => void
  color: RgbaColor
  allowSecondary: boolean
}

export const ColorPicker: FC<Props> = ({ onSelect, color, allowSecondary }) => {
  const [selectedHue, setSelectedHue] = useState<number>(0)
  const [selectedColor, setSelectedColor] = useState<RgbaColor>({ r: 0, g: 0, b: 0, a: 255 })

  const handleHueSelect = (hue: number) => {
    // update the hue value...
    setSelectedHue(hue)
    // ...and update also the selected color, by using the old color saturation 
    // and lightness but using the new hue
    const selectedColorHsl = getHslColorFromRgba(selectedColor)
    selectedColorHsl.h = hue
    const newSelectedColor = getRgbaColorFromHsl(selectedColorHsl)
    setSelectedColor(newSelectedColor)
    onSelect(newSelectedColor, 'primary')
  }

  const handleColorSelect = (newColor: RgbaColor, type: 'primary' | 'secondary') => {
    if (type === 'secondary' && !allowSecondary) return
    setSelectedColor(newColor)
    onSelect(newColor, type)
  }

  /**
   * 
   * Initialize with the provided color, and react to color changes
   * 
   */
  useEffect(() => {
    if (color === selectedColor) return
    const hue = getHueFromRgba(color)
    setSelectedHue(hue)
    setSelectedColor(color)
  }, [color])

  return (
    <section className={styles.colorPicker}>
      <ColorPickerBox hue={selectedHue} color={selectedColor} onColorSelect={handleColorSelect} />
      <HuePickerBox hue={selectedHue} onHueSelect={handleHueSelect} />
    </section>
  )
}

