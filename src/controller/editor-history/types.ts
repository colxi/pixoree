import type { EditorEventBus } from '../event-bus'
import type { EditorImage } from '../editor-image'
import type { ReactElement } from 'react'

export interface EditorHistoryEntry {
  action: string
  icon: ReactElement
  data: Uint8ClampedArray
}

export interface EditorHistoryDependencies {
  eventBus: EditorEventBus
  image: EditorImage
}
