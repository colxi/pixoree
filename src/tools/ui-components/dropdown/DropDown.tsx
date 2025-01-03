import { FC, useState } from 'react'
import styles from './DropDown.module.scss'

type Props = {
  options: DropDownOptions
  rowRenderer: (item: DropDownItem, index: number, group: number) => JSX.Element
}

export interface DropDownItem {
  key: string
  value: string | number
}

export interface DropDownOptions {
  groups: { name: string, items: DropDownItem[] }[]
}


export const DropDown: FC<Props> = ({ options, rowRenderer }) => {
  const [isFolded, setIsFolded] = useState(true)

  const toggleFold = () => setIsFolded(!isFolded)

  return (
    <div>
      <div onClick={toggleFold}>Select</div>
      <div className={styles.dropdownPanel} data-folded={isFolded}>
        {
          // Group
          options.groups.map(
            (group, groupIndex) =>
              <div key={`group-${groupIndex}`}>
                <div>{group.name}</div>
                {!group.items.length && <div>(Empty)</div>}
                <div>
                  {
                    // Items
                    group.items.map(
                      (item, itemIndex) =>
                        <div key={`group-${groupIndex}-${itemIndex}`}>
                          {rowRenderer(item, itemIndex, groupIndex)}
                        </div>
                    )
                  }
                </div>
              </div>
          )
        }
      </div>
    </div >
  )
}


