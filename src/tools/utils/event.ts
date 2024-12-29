import { CanvasMouseEvent } from '@/pages/sprite-editor/ui/utils'
import { Coordinates } from '@/pages/sprite-editor/types'
import { MouseEvent } from 'react'

type EventWithPreventDefault = {
  preventDefault: Event['preventDefault']
}

export const preventDefault = (event: EventWithPreventDefault) => {
  event.preventDefault()
}

export const getElementCoordsFromMouseEvent = (
  event: CanvasMouseEvent | MouseEvent
): Coordinates => {
  const target = event.target as HTMLElement
  const rect = target.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top
  return { x, y }
}
