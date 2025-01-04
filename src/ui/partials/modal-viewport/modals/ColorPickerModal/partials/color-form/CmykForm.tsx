import { Input } from '@/tools/ui-components/input/Input'
import { getCmykColorFromRgba, getRgbaColorFromCmyk } from '@/tools/utils/color'
import styles from './Styles.module.scss'
import type { FC } from 'react'
import type { RgbaColor } from '@/types'

type Props = {
  color: RgbaColor
  onChange: (color: RgbaColor) => void
}

export const CmykForm: FC<Props> = ({ onChange, color }) => {

  const cmykColor = getCmykColorFromRgba(color)

  const handleOnCyanInput = (value: number) => {
    const rgbaColor = getRgbaColorFromCmyk({ ...cmykColor, c: value })
    onChange(rgbaColor)
  }

  const handleOnMagentaInput = (value: number) => {
    const rgbaColor = getRgbaColorFromCmyk({ ...cmykColor, m: value })
    onChange(rgbaColor)
  }

  const handleYellowInput = (value: number) => {
    const rgbaColor = getRgbaColorFromCmyk({ ...cmykColor, y: value })
    onChange(rgbaColor)
  }

  const handleBlackInput = (value: number) => {
    const rgbaColor = getRgbaColorFromCmyk({ ...cmykColor, k: value })
    onChange(rgbaColor)
  }


  return (
    <section>
      <div className={styles.formRowTitle}>CMYK</div>
      <div className={styles.formRow}>
        <span>C:</span>
        <Input max={100} min={0} type='number' value={cmykColor.c} onInput={handleOnCyanInput} />
        <span>%</span>
      </div>
      <div className={styles.formRow}>
        <span>M:</span>
        <Input max={100} min={0} type='number' value={cmykColor.m} onInput={handleOnMagentaInput} />
        <span>%</span>
      </div>
      <div className={styles.formRow}>
        <span>Y:</span>
        <Input max={100} min={0} type='number' value={cmykColor.y} onInput={handleYellowInput} />
        <span>%</span>
      </div>
      <div className={styles.formRow}>
        <span>K:</span>
        <Input max={100} min={0} type='number' value={cmykColor.k} onInput={handleBlackInput} />
        <span>%</span>
      </div>
    </section>
  )
}