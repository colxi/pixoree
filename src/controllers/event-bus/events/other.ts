import type { EmptyObject } from '@/types'
import type { EventDefinitions } from '@/tools/utils/event-bus/types'

export type OtherEvents = EventDefinitions<{
  HISTORY_CHANGE: EmptyObject
  TOOL_CHANGE: EmptyObject
  COLOR_PALETTE_CHANGE: EmptyObject
  PRIMARY_COLOR_CHANGE: EmptyObject
  SECONDARY_COLOR_CHANGE: EmptyObject
  VIEWPORT_SCROLL_CHANGE: EmptyObject
  VIEWPORT_ZOOM_CHANGE: EmptyObject
  VIEWPORT_SIZE_CHANGE: EmptyObject
  IMAGE_SIZE_CHANGE: EmptyObject
}>
