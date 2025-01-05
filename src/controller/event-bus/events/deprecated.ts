import type { EmptyObject } from '@/types'
import type { EventDefinitions } from '@/tools/utils/event-bus/types'

export type DeprecatedEvents = EventDefinitions<{
  // @deprecated
  IMAGE_VIEW_BOX_POSITION_CHANGE: EmptyObject
  // @deprecated
  IMAGE_ZOOM_CHANGE: EmptyObject
}>
