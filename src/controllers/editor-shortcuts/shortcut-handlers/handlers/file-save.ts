import { Pixoree } from '@/controllers'
import type { ShortcutEventHandler } from '../../types'

export const fileSave: ShortcutEventHandler = (phase, _dependencies) => {
  if (phase === 'press') {
    Pixoree.file.save()
  } else if (phase === 'release') {
    // Noop
  }
}
