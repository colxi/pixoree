import type { PlainObject } from '@/types'

export type EventDefinitions<DEF extends Record<string, TYPE>, TYPE = PlainObject> = DEF

export type EventDictionary = Record<string, PlainObject>

export type EventDictionaryWithEventName<EVENT_DICTIONARY> = {
  [K in keyof EVENT_DICTIONARY]: EVENT_DICTIONARY[K] & { eventName: K }
}

export type CustomEventCallback<DATA extends Record<PropertyKey, unknown>> = (
  event: CustomEvent<DATA>,
) => void | Promise<void>
