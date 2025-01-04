import type { Coordinates } from '@/types'
import type React from 'react'

type EventWithPreventDefault = {
  preventDefault: Event['preventDefault']
}

export const preventDefault = (event: EventWithPreventDefault) => {
  event.preventDefault()
}

export const getElementCoordinatesFromMouseEvent = (
  event: React.MouseEvent | MouseEvent
): Coordinates => {
  const target = event.target as HTMLElement
  const rect = target.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  // In some browsers, the coordinates can be negative after subtracting the rect values, specially
  // when the event is triggered on the edge of the target element (border). In order to avoid this,
  // we use Math.max to ensure the coordinates are always positive
  const coordinates = {
    x: Math.max(x, 0),
    y: Math.max(y, 0),
  }
  return coordinates
}
