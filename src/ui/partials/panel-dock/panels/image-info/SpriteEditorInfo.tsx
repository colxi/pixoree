import { PanelBox } from '../../panel-box/PanelBox'
import { Pixoree } from '@/controllers'
import { useEffect } from 'react'
import { useForceUpdate } from '@/tools/hooks'
import type { FC } from 'react'

export const SpriteEditorInfo: FC = () => {
  const { forceUpdate } = useForceUpdate()

  const center = {
    x: Math.floor(Pixoree.image.viewBox.position.x + Pixoree.image.viewBox.size.w / 2),
    y: Math.floor(Pixoree.image.viewBox.position.y + Pixoree.image.viewBox.size.h / 2),
  }
  const viewBoxPositionX = Math.floor(Pixoree.image.viewBox.position.x)
  const viewBoxPositionY = Math.floor(Pixoree.image.viewBox.position.x)

  useEffect(() => {
    Pixoree.eventBus.subscribe([
      'IMAGE_ZOOM_CHANGE',
      'IMAGE_VIEW_BOX_POSITION_CHANGE',
      'HISTORY_CHANGE',
    ], forceUpdate)

    return () => {
      Pixoree.eventBus.unsubscribe([
        'IMAGE_ZOOM_CHANGE',
        'IMAGE_VIEW_BOX_POSITION_CHANGE',
        'HISTORY_CHANGE',
      ], forceUpdate)
    }
  }, [])

  return (
    <PanelBox title="Info">
      <div>Size:{Pixoree.image.size.w} x {Pixoree.image.size.h} </div>
      <div>ViewBox</div>
      <div>Offset: x:{viewBoxPositionX} y:{viewBoxPositionY}</div>
      <div>Size: w:{Pixoree.image.viewBox.size.w} h:{Pixoree.image.viewBox.size.h}</div>
      <div>Center: x:{center.x} y:{center.y}</div>
      <div>Zoom: {Pixoree.image.zoom}</div>
    </PanelBox >
  )
}

