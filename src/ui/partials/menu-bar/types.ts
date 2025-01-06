import type { ShortcutName } from '@/controllers/editor-shortcuts/types'

export interface MenuBarItemElement {
  label: string
  shortcutName: ShortcutName | null
  enabled: () => boolean
  handler: () => void
}

export interface MenuBarItem {
  label: string
  elements: MenuBarItemElement[]
}

export type MenuBarOptions = MenuBarItem[]
