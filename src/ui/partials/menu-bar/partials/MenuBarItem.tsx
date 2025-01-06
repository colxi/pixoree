
import { Pixoree } from '@/controllers'
import styles from './MenuBarItem.module.scss'
import type { FC } from 'react'
import type { MenuBarItem } from '../types'
import type { ShortcutName } from '@/controllers/editor-shortcuts/types'

type Props = {
  item: MenuBarItem
  isOpen: boolean
  onClick: () => void
  onMouseOver: () => void
  closeMenu: () => void
}

export const MenuItem: FC<Props> = ({ closeMenu, onClick, onMouseOver, item, isOpen }) => {

  const getShortcut = (shortcutName: ShortcutName | null) => {
    if (shortcutName === null) return ''
    const shortcutKeys = Pixoree.shortcuts.getShortcutKeys(shortcutName)
    if (shortcutKeys === null) return ''
    Pixoree.shortcuts.getFormattedShortcutKeys(shortcutKeys)
  }

  const handleDropdownItemClick = (index: number) => {
    closeMenu()
    item.elements[index].handler()
  }

  return (
    <div className={styles.menuItem} data-active={isOpen}>
      <div className={styles.menuItemLabel} onClick={onClick} onMouseOver={onMouseOver}>{item.label}</div>
      <div className={styles.menuDropdown}>
        {
          ...item.elements.map((menuDropdownItem, menuDropdownItemIndex) =>
            <div
              className={styles.menuDropdownItem}
              key={menuDropdownItemIndex}
              onClick={() => handleDropdownItemClick(menuDropdownItemIndex)}
            >
              <span className={styles.menuDropdownItemLabel}>{menuDropdownItem.label}</span>
              <span className={styles.menuDropdownItemShortcut}>{getShortcut(menuDropdownItem.shortcutName)}</span>
            </div>
          )
        }
      </div>
    </div>
  )
}