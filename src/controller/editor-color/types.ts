import type { EditorEventBus } from '../event-bus'
import type { HexColor } from '../../types'

export interface EditorColorOptions {
  eventBus: EditorEventBus
}

export interface EditorPalette {
  id: string
  name: string
  colors: HexColor[]
}
