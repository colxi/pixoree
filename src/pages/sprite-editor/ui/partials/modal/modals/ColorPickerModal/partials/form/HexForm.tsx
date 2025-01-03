import { RgbaColor } from '@/pages/sprite-editor/types'
import { FC, useEffect, useState } from 'react'
import { Input } from '@/tools/ui-components/input/Input'
import styles from './Styles.module.scss'
import { getHexColorFromRgba, getRgbaColorFromHex } from '@/tools/utils/color'

type Props = {
  color: RgbaColor
  onChange: (color: RgbaColor) => void
}

export const HexForm: FC<Props> = ({ onChange, color }) => {
  const [hexColor, setHexColor] = useState<string>(
    getHexColorFromRgba(color).replace('#', '').slice(0, -2)
  )

  const handleOnInput = (value: string) => {
    setHexColor(value)
    const rgbaColor = getRgbaColorFromHex(`#${value}`)
    console.log(rgbaColor)
    onChange(rgbaColor)
  }

  useEffect(() => {
    if (hexColor.length < 6) return
    setHexColor(getHexColorFromRgba(color).replace('#', '').slice(0, -2))
  }, [color])

  return (
    <section>
      <div className={styles.formRowTitle}>HEX</div>
      <div className={styles.formRow}>
        <span>#</span>
        <Input
          type='hex'
          value={hexColor}
          length={6}
          onInput={handleOnInput}
        />
        <span></span>
      </div>
    </section >
  )
}