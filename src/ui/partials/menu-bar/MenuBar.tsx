import { MenuItem } from './partials/MenuBarItem'
import { Pixoree } from '@/controllers'
import { menuDefinition } from './menus'
import { useEffect, useState } from 'react'
import styles from './MenuBar.module.scss'

export const MenuBar = () => {
  const [openMenuItemIndex, setOpenMenuItemIndex] = useState<number | null>(null)

  const isMenuOpen = openMenuItemIndex !== null

  const handleMenuItemClick = (index: number) => {
    if (index === openMenuItemIndex) setOpenMenuItemIndex(null)
    else setOpenMenuItemIndex(index)
  }

  const handleMenuItemMouseOver = (index: number) => {
    if (!isMenuOpen) return
    setOpenMenuItemIndex(index)
  }

  const closeMenu = () => {
    setOpenMenuItemIndex(null)
  }

  useEffect(() => {
    Pixoree.eventBus.subscribe('MODAL_OPEN', closeMenu)
    return () => {
      Pixoree.eventBus.unsubscribe('MODAL_OPEN', closeMenu)
    }
  }, [])

  return (
    <>
      {isMenuOpen && <div className={styles.menuOverlay} onClick={closeMenu} />}
      <div className={styles.menuBar}>
        <div className={styles.pixoree}>
          Pixoree
        </div>
        {
          ...menuDefinition.map((menuItem, menuItemIndex) =>
            <MenuItem
              closeMenu={closeMenu}
              isOpen={menuItemIndex === openMenuItemIndex}
              item={menuItem}
              key={menuItemIndex}
              onClick={() => handleMenuItemClick(menuItemIndex)}
              onMouseOver={() => handleMenuItemMouseOver(menuItemIndex)}
            />
          )
        }
        <span className={styles.disclaimer}>
          This application is in Alpha stage. Expect bugs!
        </span>
      </div>
    </>
  )
}