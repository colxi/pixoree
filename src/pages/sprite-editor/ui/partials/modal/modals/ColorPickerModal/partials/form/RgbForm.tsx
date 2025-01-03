import { RgbaColor } from '@/pages/sprite-editor/types'
import { FC } from 'react'
import { Input } from '@/tools/ui-components/input/Input'
import styles from './Styles.module.scss'

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
        <Input type='number' value={color.r} min={0} max={255} onInput={handleOnRedInput} />
        <span></span>
      </div>
      <div className={styles.formRow}>
        <span>G:</span>
        <Input type='number' value={color.g} min={0} max={255} onInput={handleOnGreenInput} />
        <span></span>
      </div>
      <div className={styles.formRow}>
        <span>B:</span>
        <Input type='number' value={color.b} min={0} max={255} onInput={handleBlueInput} />
        <span></span>
      </div>
    </section>
  )
}