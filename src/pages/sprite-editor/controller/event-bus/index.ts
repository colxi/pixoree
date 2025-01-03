import { EventBus } from '@/tools/utils/event-bus'

export enum ImageEditorEvent {
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

export type ImageEditorEvents = {
  [ImageEditorEvent.HISTORY_CHANGE]: {}
  [ImageEditorEvent.TOOL_CHANGE]: {}
  [ImageEditorEvent.COLOR_PALETTE_CHANGE]: {}
  [ImageEditorEvent.PRIMARY_COLOR_CHANGE]: {}
  [ImageEditorEvent.SECONDARY_COLOR_CHANGE]: {}
  [ImageEditorEvent.VIEWPORT_SCROLL_CHANGE]: {}
  [ImageEditorEvent.VIEWPORT_ZOOM_CHANGE]: {}
  [ImageEditorEvent.VIEWPORT_SIZE_CHANGE]: {}
  [ImageEditorEvent.IMAGE_SIZE_CHANGE]: {}
  [ImageEditorEvent.MODAL_OPEN]: {}
  [ImageEditorEvent.MODAL_CLOSE]: {}
  [ImageEditorEvent.MODAL_CLOSE_REQUEST]: {}
  [ImageEditorEvent.MODAL_TITLE_CHANGE]: {}

  // @deprecated
  [ImageEditorEvent.IMAGE_VIEW_BOX_POSITION_CHANGE]: {}
  // @deprecated
  [ImageEditorEvent.IMAGE_ZOOM_CHANGE]: {}
}

export class EditorEventBus extends EventBus<ImageEditorEvents> {
  constructor() {
    super(ImageEditorEvent)
  }
}
