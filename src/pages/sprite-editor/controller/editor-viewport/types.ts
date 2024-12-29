import { EditorImage } from '../editor-image'
import { EditorEventBus } from '../event-bus'

export interface EditorViewportOptions {
  eventBus: EditorEventBus
  image: EditorImage
}
