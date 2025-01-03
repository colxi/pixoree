import { useEffect, type FC } from 'react'
import { Pixoree } from '@/pages/sprite-editor/controller'
import { useForceUpdate } from '@/tools/hooks'
import { SwitchIcon } from '@/tools/ui-components/icons'
import styles from './EditorToolsColor.module.scss'
import { getHexColorFromRgba } from '@/tools/utils/color'

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
      Pixoree.eventBus.Event.PRIMARY_COLOR_CHANGE,
      Pixoree.eventBus.Event.SECONDARY_COLOR_CHANGE
    ], forceUpdate)
    return () => {
      Pixoree.eventBus.unsubscribe([
        Pixoree.eventBus.Event.PRIMARY_COLOR_CHANGE,
        Pixoree.eventBus.Event.SECONDARY_COLOR_CHANGE
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

