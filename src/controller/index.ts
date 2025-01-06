import { EditorColor } from './editor-color'
import { EditorEventBus } from './event-bus'
import { EditorHistory } from './editor-history'
import { EditorImage } from './editor-image'
import { EditorModal } from './editor-modal'
import { EditorShortcuts } from './editor-shortcuts'
import { EditorTools } from './editor-tools'
import { EditorViewport } from './editor-viewport'

export class Pixoree {
  public static eventBus = new EditorEventBus()

  public static color = new EditorColor({
    eventBus: this.eventBus,
  })

  public static image = new EditorImage({
    eventBus: this.eventBus,
  })

  public static viewport = new EditorViewport({
    eventBus: this.eventBus,
    image: this.image,
  })

  public static history = new EditorHistory({
    eventBus: this.eventBus,
    image: this.image,
  })

  public static tools = new EditorTools({
    image: this.image,
    history: this.history,
    eventBus: this.eventBus,
    color: this.color,
    viewport: this.viewport,
  })

  public static modal = new EditorModal({
    eventBus: this.eventBus,
  })

  public static shortcuts = new EditorShortcuts({
    history: this.history,
    color: this.color,
    tools: this.tools,
    modal: this.modal,
    image: this.image,
  })
}
