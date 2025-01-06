import type { EditorEventBus } from '../event-bus'
import type { RgbaColor } from '../../types'

export interface EditorModalDependencies {
  eventBus: EditorEventBus
}

export type ModalName = keyof ModalCatalog

export interface ActiveModalDescriptor {
  name: ModalName
  params: ModalCatalog[ModalName]
}

export type ModalCatalog = {
  shortcutEditor: {}
  colorPicker: {
    type: 'primary' | 'secondary'
    allowSecondary: false
    color: RgbaColor
  }
}
