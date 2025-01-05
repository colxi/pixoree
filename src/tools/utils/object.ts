import type { PlainObject } from '@/types'

export const findObjectKey = (obj: PlainObject, predicate: (value: unknown) => boolean): PropertyKey | null => {
  for (const key in obj) {
    const keyValue = obj[key]
    if (predicate(keyValue)) return key
  }
  return null
}
