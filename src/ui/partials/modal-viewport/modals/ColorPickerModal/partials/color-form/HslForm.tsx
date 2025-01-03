import { RgbaColor } from '@/types'
import { FC, useEffect, useState } from 'react'
import { Input } from '@/tools/ui-components/input/Input'
import styles from './Styles.module.scss'
import { getHslColorFromRgba, getRgbaColorFromHsl } from '@/tools/utils/color'

type Props = {
  color: RgbaColor
  onChange: (color: RgbaColor) => void

}

export const HslForm: FC<Props> = ({ onChange, color }) => {
  const [activeColor, setActiveColor] = useState(color)

  const hslColor = getHslColorFromRgba(color)

  const handleHueInput = (value: number) => {
    const rgbaColor = getRgbaColorFromHsl({ ...hslColor, h: value })
    onChange(rgbaColor)
  }

  const handleSaturationInput = (value: number) => {
    const rgbaColor = getRgbaColorFromHsl({ ...hslColor, s: value / 100 })
    onChange(rgbaColor)
  }

  const handleLuminosityInput = (value: number) => {
    const rgbaColor = getRgbaColorFromHsl({ ...hslColor, l: value / 100 })
    onChange(rgbaColor)
  }

  useEffect(() => {
    if (activeColor === activeColor) return
    setActiveColor(color)
  }, [color])

  return (
    <section>
      <div className={styles.formRowTitle}>HSL</div>
      <div className={styles.formRow}>
        <span>H:</span>
        <Input type='number' value={hslColor.h} min={0} max={360} onInput={handleHueInput} />
        <span>ª</span>
      </div>
      <div className={styles.formRow}>
        <span>S:</span>
        <Input type='number' value={Math.floor(hslColor.s * 100)} min={0} max={100} onInput={handleSaturationInput} />
        <span>%</span>
      </div>
      <div className={styles.formRow}>
        <span>L:</span>
        <Input type='number' value={Math.floor(hslColor.l * 100)} min={0} max={100} onInput={handleLuminosityInput} />
        <span>%</span>
      </div>
    </section>
  )
}