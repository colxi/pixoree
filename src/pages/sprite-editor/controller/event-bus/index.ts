import { EventBus } from '@/tools/utils/event-bus'

export enum PixoreeEvent {
  HISTORY_CHANGE = 'HISTORY_CHANGE',
  IMAGE_SIZE_CHANGE = 'IMAGE_SIZE_CHANGE',
  TOOL_CHANGE = 'TOOL_CHANGE',
  COLOR_PALETTE_CHANGE = 'COLOR_PALETTE_CHANGE',
  PRIMARY_COLOR_CHANGE = 'PRIMARY_COLOR_CHANGE',
  SECONDARY_COLOR_CHANGE = 'SECONDARY_COLOR_CHANGE',
  VIEWPORT_SCROLL_CHANGE = 'VIEWPORT_SCROLL_CHANGE',
  VIEWPORT_ZOOM_CHANGE = 'VIEWPORT_ZOOM_CHANGE',
  VIEWPORT_SIZE_CHANGE = 'VIEWPORT_SIZE_CHANGE',
  MODAL_OPEN = 'MODAL_OPEN',
  MODAL_CLOSE = 'MODAL_CLOSE',
  MODAL_CLOSE_REQUEST = 'MODAL_CLOSE_REQUEST',
  MODAL_TITLE_CHANGE = 'MODAL_TITLE_CHANGE',

  // @deprecated
  IMAGE_VIEW_BOX_POSITION_CHANGE = 'IMAGE_VIEW_BOX_POSITION_CHANGE',
  // @deprecated
  IMAGE_ZOOM_CHANGE = 'IMAGE_ZOOM_CHANGE',
}

export type PixoreeEvents = {
  [PixoreeEvent.HISTORY_CHANGE]: {}
  [PixoreeEvent.TOOL_CHANGE]: {}
  [PixoreeEvent.COLOR_PALETTE_CHANGE]: {}
  [PixoreeEvent.PRIMARY_COLOR_CHANGE]: {}
  [PixoreeEvent.SECONDARY_COLOR_CHANGE]: {}
  [PixoreeEvent.VIEWPORT_SCROLL_CHANGE]: {}
  [PixoreeEvent.VIEWPORT_ZOOM_CHANGE]: {}
  [PixoreeEvent.VIEWPORT_SIZE_CHANGE]: {}
  [PixoreeEvent.IMAGE_SIZE_CHANGE]: {}
  [PixoreeEvent.MODAL_OPEN]: {}
  [PixoreeEvent.MODAL_CLOSE]: {}
  [PixoreeEvent.MODAL_CLOSE_REQUEST]: {}
  [PixoreeEvent.MODAL_TITLE_CHANGE]: {}

  // @deprecated
  [PixoreeEvent.IMAGE_VIEW_BOX_POSITION_CHANGE]: {}
  // @deprecated
  [PixoreeEvent.IMAGE_ZOOM_CHANGE]: {}
}

export class EditorEventBus extends EventBus<PixoreeEvents> {
  constructor() {
    super(PixoreeEvent)
  }
}
