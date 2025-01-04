import { getHexColorFromRgba } from '@/tools/utils/color'
import styles from './ColorPreview.module.scss'
import type { FC } from 'react'
import type { RgbaColor } from '@/types'

type Props = {
  newColor: RgbaColor
  oldColor: RgbaColor
  onClick: (color: RgbaColor) => void
}

export const ColorPreview: FC<Props> = ({ onClick, oldColor, newColor }) => {
  const handleOnClick = () => {
    onClick(oldColor)
  }

  return (
    <section>
      <div className={styles.colorPreview}>
        <div style={{ backgroundColor: getHexColorFromRgba(newColor) }} >
          <div className={styles.colorType}> new</div>
        </div>
        <div style={{ backgroundColor: getHexColorFromRgba(oldColor) }} onClick={handleOnClick}>
          <div className={styles.colorType}>old</div>
        </div>
      </div>
    </section>
  )
}