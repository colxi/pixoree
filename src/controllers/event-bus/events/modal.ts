import type { EmptyObject } from '@/types'
import type { EventDefinitions } from '@/tools/utils/event-bus/types'

export type ModalEvents = EventDefinitions<{
  MODAL_OPEN: EmptyObject
  MODAL_CLOSE: EmptyObject
  MODAL_CLOSE_REQUEST: EmptyObject
  MODAL_TITLE_CHANGE: EmptyObject
}>
