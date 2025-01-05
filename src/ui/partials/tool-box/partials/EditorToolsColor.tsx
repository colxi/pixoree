import { Pixoree } from '@/controller'
import { SwitchIcon } from '@/tools/ui-components/icons'
import { getHexColorFromRgba } from '@/tools/utils/color'
import { useEffect } from 'react'
import { useForceUpdate } from '@/tools/hooks'
import styles from './EditorToolsColor.module.scss'
import type { FC } from 'react'


export const EditorToolsColor: FC = () => {
  const { forceUpdate } = useForceUpdate()

  const handleBlackAndWhiteClick = () => {
    Pixoree.color.setPrimaryColor({ r: 0, g: 0, b: 0, a: 255 })
    Pixoree.color.setSecondaryColor({ r: 255, g: 255, b: 255, a: 255 })
  }

  const handleSwitchColorsClick = () => {
    const primaryColor = Pixoree.color.primaryColor
    const secondaryColor = Pixoree.color.secondaryColor
    Pixoree.color.setPrimaryColor(secondaryColor)
    Pixoree.color.setSecondaryColor(primaryColor)
  }

  const handlePrimaryColorClick = () => {
    Pixoree.modal.openModal('colorPicker', {
      type: 'primary',
      allowSecondary: false,
      color: Pixoree.color.primaryColor
    })
  }

  const handleSecondaryColorClick = () => {
    Pixoree.modal.openModal('colorPicker', {
      type: 'secondary',
      allowSecondary: false,
      color: Pixoree.color.secondaryColor
    })
  }

  useEffect(() => {
    Pixoree.eventBus.subscribe([
      'PRIMARY_COLOR_CHANGE',
      'SECONDARY_COLOR_CHANGE'
    ], forceUpdate)
    return () => {
      Pixoree.eventBus.unsubscribe([
        'PRIMARY_COLOR_CHANGE',
        'SECONDARY_COLOR_CHANGE'
      ], forceUpdate)
    }
  })

  return (
    <main>
      <section className={styles.colorOptions}>
        <div className={styles.blackAndWhite} onClick={handleBlackAndWhiteClick}>
          <div />
          <div />
        </div>
        <div className={styles.switchColors} onClick={handleSwitchColorsClick}>
          <SwitchIcon />
        </div>
      </section>

      <section className={styles.colors}>
        <div onClick={handlePrimaryColorClick}>
          <div style={{ backgroundColor: getHexColorFromRgba(Pixoree.color.primaryColor) }} />
        </div>
        <div onClick={handleSecondaryColorClick}>
          <div style={{ backgroundColor: getHexColorFromRgba(Pixoree.color.secondaryColor) }} />
        </div>
      </section>
    </main>
  )
}

