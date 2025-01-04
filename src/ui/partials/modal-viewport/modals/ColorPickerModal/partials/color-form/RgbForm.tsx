import { Input } from '@/tools/ui-components/input/Input'
import styles from './Styles.module.scss'
import type { FC } from 'react'
import type { RgbaColor } from '@/types'

type Props = {
  color: RgbaColor
  onChange: (color: RgbaColor) => void
}

export const RgbForm: FC<Props> = ({ onChange, color }) => {
  const handleOnRedInput = (value: number) => {
    onChange({ ...color, r: value })
  }

  const handleOnGreenInput = (value: number) => {
    onChange({ ...color, g: value })
  }

  const handleBlueInput = (value: number) => {
    onChange({ ...color, b: value })
  }

  return (
    <section>
      <div className={styles.formRowTitle}>RGB</div>
      <div className={styles.formRow}>
        <span>R:</span>
        <Input max={255} min={0} type='number' value={color.r} onInput={handleOnRedInput} />
        <span></span>
      </div>
      <div className={styles.formRow}>
        <span>G:</span>
        <Input max={255} min={0} type='number' value={color.g} onInput={handleOnGreenInput} />
        <span></span>
      </div>
      <div className={styles.formRow}>
        <span>B:</span>
        <Input max={255} min={0} type='number' value={color.b} onInput={handleBlueInput} />
        <span></span>
      </div>
    </section>
  )
}