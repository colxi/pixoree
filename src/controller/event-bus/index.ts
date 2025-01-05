import { EventBus } from '@/tools/utils/event-bus'
import type { DeprecatedEvents } from './events/deprecated'
import type { ModalEvents } from './events/modal'
import type { OtherEvents } from './events/other'

type PixoreeEvents = ModalEvents & OtherEvents & DeprecatedEvents

export type PixoreeEventName = keyof PixoreeEvents

export class EditorEventBus extends EventBus<PixoreeEvents> {
  public constructor() {
    super()
  }
}
