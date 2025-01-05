import type { CustomEventCallback, EventDictionary, EventDictionaryWithEventName } from './types'
import type { EmptyObject } from '@/types'

/**
 *
 * The EventBus Class implements a simple event bus system that allows you to dispatch
 * and subscribe/unsubscribe to typed events, provided by the EventDictionary
 *
 * @Usage
 * ```
 * class MyEventBus extends EventBus<MyEventDictionary>{
 *   constructor(){
 *     super()
 *   }
 *
 *   // ...custom methods
 * }
 *
 */
export class EventBus<
  EVENT_DICTIONARY extends EventDictionary,
  EVENT_DICTIONARY_ENRICHED extends EventDictionary = EventDictionaryWithEventName<EVENT_DICTIONARY>,
  EVENT_NAME extends keyof EVENT_DICTIONARY = keyof EVENT_DICTIONARY,
> {
  /**
   *
   * Dispatch an event
   *
   */
  public dispatch<T extends EVENT_NAME>(
    eventName: T,
    data: EVENT_DICTIONARY[T] extends EmptyObject ? EmptyObject : EVENT_DICTIONARY[T],
  ) {
    const event = new CustomEvent(eventName as string, {
      detail: {
        ...data,
        eventName,
      },
    })
    window.dispatchEvent(event)
  }

  /**
   *
   * Subscribe to an event or several events
   *
   */
  public subscribe<T extends EVENT_NAME | EVENT_NAME[]>(
    eventName: T,
    callback: T extends Array<any>
      ? CustomEventCallback<EVENT_DICTIONARY_ENRICHED[T[number]]>
      : T extends keyof EVENT_DICTIONARY_ENRICHED
        ? CustomEventCallback<EVENT_DICTIONARY_ENRICHED[T]>
        : never,
  ) {
    if (Array.isArray(eventName)) {
      const uniqueEvents = [...new Set(eventName)]
      for (const currentEventName of uniqueEvents) {
        window.addEventListener(currentEventName as string, callback as any)
      }
    } else {
      window.addEventListener(eventName as string, callback as any)
    }
  }

  /**
   *
   * Unsubscribe from an event or several events
   *
   */
  public unsubscribe<T extends EVENT_NAME | EVENT_NAME[]>(
    eventName: T,
    callback: T extends Array<any>
      ? CustomEventCallback<EVENT_DICTIONARY_ENRICHED[T[number]]>
      : T extends keyof EVENT_DICTIONARY_ENRICHED
        ? CustomEventCallback<EVENT_DICTIONARY_ENRICHED[T]>
        : never,
  ) {
    if (Array.isArray(eventName)) {
      const uniqueEvents = [...new Set(eventName)]
      for (const currentEventName of uniqueEvents) {
        window.removeEventListener(currentEventName as string, callback as any)
      }
    } else {
      window.removeEventListener(eventName as string, callback as any)
    }
  }
}
