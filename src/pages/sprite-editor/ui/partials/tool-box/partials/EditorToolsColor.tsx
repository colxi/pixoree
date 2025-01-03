import { useEffect, type FC } from 'react'
import { ImageEditor } from '@/pages/sprite-editor/controller'
import { useForceUpdate } from '@/tools/hooks'
import { SwitchIcon } from '@/tools/ui-components/icons'
import styles from './EditorToolsColor.module.scss'
import { useImageEditorUi } from '../../../hook'
import { getHexColorFromRgba } from '@/tools/utils/color'

export const EditorToolsColor: FC = () => {
  const { openModal } = useImageEditorUi()
  const { forceUpdate } = useForceUpdate()

  const handleBlackAndWhiteClick = () => {
    ImageEditor.color.setPrimaryColor({ r: 0, g: 0, b: 0, a: 255 })
    ImageEditor.color.setSecondaryColor({ r: 255, g: 255, b: 255, a: 255 })
  }

  const handleSwitchColorsClick = () => {
    const primaryColor = ImageEditor.color.primaryColor
    const secondaryColor = ImageEditor.color.secondaryColor
    ImageEditor.color.setPrimaryColor(secondaryColor)
    ImageEditor.color.setSecondaryColor(primaryColor)
  }

  const handlePrimaryColorClick = () => {
    openModal('colorPicker', {
      type: 'primary',
      allowSecondary: false,
      color: ImageEditor.color.primaryColor
    })
  }

  const handleSecondaryColorClick = () => {
    openModal('colorPicker', {
      type: 'secondary',
      allowSecondary: false,
      color: ImageEditor.color.secondaryColor
    })
  }

  useEffect(() => {
    ImageEditor.eventBus.subscribe([
      ImageEditor.eventBus.Event.PRIMARY_COLOR_CHANGE,
      ImageEditor.eventBus.Event.SECONDARY_COLOR_CHANGE
    ], forceUpdate)
    return () => {
      ImageEditor.eventBus.unsubscribe([
        ImageEditor.eventBus.Event.PRIMARY_COLOR_CHANGE,
        ImageEditor.eventBus.Event.SECONDARY_COLOR_CHANGE
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
          <div style={{ backgroundColor: getHexColorFromRgba(ImageEditor.color.primaryColor) }} />
        </div>
        <div onClick={handleSecondaryColorClick}>
          <div style={{ backgroundColor: getHexColorFromRgba(ImageEditor.color.secondaryColor) }} />
        </div>
      </section>
    </main>
  )
}

