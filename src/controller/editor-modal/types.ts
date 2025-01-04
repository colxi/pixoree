import type { EditorEventBus } from '../event-bus'
import type { RgbaColor } from '../../types'
// import { modalsCatalog } from './catalog'

export interface EditorModalDependencies {
  eventBus: EditorEventBus
}

// export type ModalCatalog = {
//   [K in keyof typeof modalsCatalog]: Parameters<(typeof modalsCatalog)[K]>[0]
// }

export type ModalName = keyof ModalCatalog

export interface ActiveModalDescriptor {
  name: ModalName
  params: ModalCatalog[ModalName]
}

export type ModalCatalog = {
  colorPicker: {
    type: 'primary' | 'secondary'
    allowSecondary: false
    color: RgbaColor
  }
}
