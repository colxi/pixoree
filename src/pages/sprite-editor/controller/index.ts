import { EditorHistory } from './editor-history'
import { EditorColor } from './editor-color'
import { EditorImage } from './editor-image'
import { EditorTools } from './editor-tools'
import { EditorViewport } from './editor-viewport'
import { EditorEventBus } from './event-bus'
import { EditorModal } from './editor-modal'

export class ImageEditor {
  static eventBus = new EditorEventBus()
  static color = new EditorColor({
    eventBus: this.eventBus,
  })
  static image = new EditorImage({
    eventBus: this.eventBus,
  })
  static viewport = new EditorViewport({
    eventBus: this.eventBus,
    image: this.image,
  })
  static history = new EditorHistory({
    eventBus: this.eventBus,
    image: this.image,
  })
  static tools = new EditorTools({
    image: this.image,
    history: this.history,
    eventBus: this.eventBus,
    color: this.color,
    viewport: this.viewport,
  })
  static modal = new EditorModal({
    eventBus: this.eventBus,
  })
}
