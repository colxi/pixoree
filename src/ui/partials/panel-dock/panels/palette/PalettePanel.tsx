import { DropDown } from '@/tools/ui-components/dropdown/DropDown'
import { PanelBox } from '../../panel-box/PanelBox'
import { Pixoree } from '@/controller'
import { formatHexColorAsRgba } from '@/tools/utils/formatters'
import { isColorEqual } from '@/tools/utils/image'
import { useEffect } from 'react'
import { useForceUpdate } from '@/tools/hooks'
import styles from './PalettePanel.module.scss'
import type { DropDownItem, DropDownOptions } from '@/tools/ui-components/dropdown/DropDown'
import type { FC } from 'react'
import type { HexColor } from '@/types'

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
    return (
      <>
        <div>{palette.name}</div>
        <div className={styles.dropDownItem}>
          {
            palette.colors.map(
              (color, i) => (
                <div className={styles.color} key={i} style={{ backgroundColor: color }} />
              ))
          }
        </div>
      </>
    )
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
    Pixoree.eventBus.subscribe('PRIMARY_COLOR_CHANGE', forceUpdate)
    return () => {
      Pixoree.eventBus.unsubscribe('PRIMARY_COLOR_CHANGE', forceUpdate)
    }
  })

  return (
    <PanelBox title="Palette">
      <DropDown options={options} rowRenderer={rowRenderer} />
      <section className={styles.container}>
        {colors.map(
          (color, i) => (
            <div
              className={styles.item}
              data-active={isColorEqual(color, Pixoree.color.primaryColor)}
              key={i}
              style={{ backgroundColor: color }}
              onClick={() => handleColorLeftClick(color)}
              onContextMenu={() => handleColorRightClick(color)}
            />
          ))
        }
        <div className={styles.addItem}>+</div>
      </section>
    </PanelBox>
  )
}

