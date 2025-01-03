import { useEffect, type FC } from 'react'
import { PanelBox } from '@/pages/sprite-editor/ui/partials/panel-dock/panel-box/PanelBox'
import { DropDown, DropDownItem, DropDownOptions } from '@/tools/ui-components/dropdown/DropDown'
import { Pixoree } from '@/pages/sprite-editor/controller'
import { useForceUpdate } from '@/tools/hooks'
import { HexColor } from '@/pages/sprite-editor/types'
import { formatHexColorAsRgba } from '@/tools/utils/formatters'
import { isColorEqual } from '@/tools/utils/image'
import styles from './PalettePanel.module.scss'

export const PalettePanel: FC = () => {
  const { forceUpdate } = useForceUpdate()

  const colors = Pixoree.color.palettes[0].colors
  const options: DropDownOptions = {
    groups: [
      {
        name: 'Editor',
        items: Pixoree.color.palettes.map((palette) => ({ key: palette.name, value: palette.id }))
      }, {
        name: 'Project',
        items: []
      }
    ]
  }

  const rowRenderer = (item: DropDownItem) => {
    const palette = Pixoree.color.palettes.find((palette) => palette.id === item.value)
    if (!palette) throw new Error('Palette not found')
    return <>
      <div>{palette.name}</div>
      <div className={styles.dropDownItem}>
        {
          palette.colors.map(
            (color, i) => (
              <div key={i} className={styles.color} style={{ backgroundColor: color }} />
            ))
        }
      </div>
    </>
  }

  const handleColorLeftClick = (color: HexColor) => {
    const rgbaColor = formatHexColorAsRgba(color)
    Pixoree.color.setPrimaryColor(rgbaColor)
  }

  const handleColorRightClick = (color: HexColor) => {
    const rgbaColor = formatHexColorAsRgba(color)
    Pixoree.color.setSecondaryColor(rgbaColor)
  }

  useEffect(() => {
    Pixoree.eventBus.subscribe(Pixoree.eventBus.Event.PRIMARY_COLOR_CHANGE, forceUpdate)
    return () => {
      Pixoree.eventBus.unsubscribe(Pixoree.eventBus.Event.PRIMARY_COLOR_CHANGE, forceUpdate)
    }
  })

  return (
    <>
      <PanelBox title="Palette">
        <DropDown options={options} rowRenderer={rowRenderer} />
        <section className={styles.container}>
          {colors.map(
            (color, i) => (
              <div
                className={styles.item}
                data-active={isColorEqual(color, Pixoree.color.primaryColor)}
                style={{ backgroundColor: color }}
                key={i}
                onClick={() => handleColorLeftClick(color)}
                onContextMenu={() => handleColorRightClick(color)}
              />
            ))
          }
          <div className={styles.addItem}>+</div>
        </section>
      </PanelBox>
    </>
  )
}

