import { Pixoree } from '@/controller'
import type { ShortcutEventHandler } from '../../types'

export const fileSave: ShortcutEventHandler = (phase, _dependencies) => {
  if (phase === 'press') {
    Pixoree.image.save()
  } else if (phase === 'release') {
    // Noop
  }
}
