import { EditorImage } from '../editor-image'
import { EditorEventBus } from '../event-bus'

export interface EditorHistoryEntry {
  action: string
  icon: JSX.Element
  data: Uint8ClampedArray
}

export interface EditorHistoryDependencies {
  eventBus: EditorEventBus
  image: EditorImage
}
