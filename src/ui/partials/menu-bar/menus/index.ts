import { Pixoree } from '@/controllers'
import type { MenuBarItem, MenuBarOptions } from '../types'

const file: MenuBarItem = {
  label: 'File',
  elements: [
    {
      label: 'Open',
      shortcutName: 'fileOpen',
      enabled: () => true,
      handler: () => Pixoree.file.open(),
    },
    {
      label: 'Save',
      shortcutName: 'fileSave',
      enabled: () => true,
      handler: () => Pixoree.file.save(),
    },
  ],
}

const edit: MenuBarItem = {
  label: 'Edit',
  elements: [
    {
      label: 'Undo',
      shortcutName: 'historyUndo',
      enabled: () => true,
      handler: () => Pixoree.history.undo(),
    },
    {
      label: 'Redo',
      shortcutName: 'historyRedo',
      enabled: () => true,
      handler: () => Pixoree.history.redo(),
    },
    {
      label: 'Edit Shortcuts',
      shortcutName: null,
      enabled: () => true,
      handler: () => Pixoree.modal.openModal('shortcutEditor', {}),
    },
  ],
}

export const menuDefinition: MenuBarOptions = [file, edit]
