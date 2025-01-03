import { RgbaColor } from '@/pages/sprite-editor/types'
import { FC } from 'react'
import { Input } from '@/tools/ui-components/input/Input'
import styles from './Styles.module.scss'
import { getCmykColorFromRgba, getRgbaColorFromCmyk } from '@/tools/utils/color'

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
        <Input type='number' value={cmykColor.c} min={0} max={100} onInput={handleOnCyanInput} />
        <span>%</span>
      </div>
      <div className={styles.formRow}>
        <span>M:</span>
        <Input type='number' value={cmykColor.m} min={0} max={100} onInput={handleOnMagentaInput} />
        <span>%</span>
      </div>
      <div className={styles.formRow}>
        <span>Y:</span>
        <Input type='number' value={cmykColor.y} min={0} max={100} onInput={handleYellowInput} />
        <span>%</span>
      </div>
      <div className={styles.formRow}>
        <span>K:</span>
        <Input type='number' value={cmykColor.k} min={0} max={100} onInput={handleBlackInput} />
        <span>%</span>
      </div>
    </section>
  )
}