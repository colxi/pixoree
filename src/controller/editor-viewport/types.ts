import type { EditorEventBus } from '../event-bus'
import type { EditorImage } from '../editor-image'

export interface EditorViewportOptions {
  eventBus: EditorEventBus
  image: EditorImage
}
