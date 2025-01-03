import { useEffect, useState } from 'react'
import { useEvent } from '@/tools/hooks'
import { Pixoree } from '@/controller'

interface UseSpriteEditorCanvasKeyBindings {
  redo: () => void | Promise<void>
  undo: () => void | Promise<void>
}

export const useSpriteEditorCanvasKeyBindings = (
  handlers: UseSpriteEditorCanvasKeyBindings
) => {
  const [lastTool, setLastTool] = useState(Pixoree.tools.Tool.BRUSH)

  const handleKeyDown = useEvent(async (e: KeyboardEvent) => {
    // do nothing when the target of the event is an input field
    if (e.target instanceof HTMLInputElement) return

    // allow page reload with metaKey+R, but disable the rest of browser shortcuts
    if (e.code === 'KeyR' && e.metaKey) return
    else e.preventDefault()

    if (e.code === 'KeyZ' && e.metaKey && e.shiftKey) {
      await handlers.redo()
    } else if (e.code === 'KeyZ' && e.metaKey) await handlers.undo()
    else if (e.code === 'Space' && !e.metaKey) {
      if (Pixoree.tools.activeToolName !== Pixoree.tools.Tool.HAND) {
        setLastTool(Pixoree.tools.activeToolName)
        Pixoree.tools.setActiveToolName(Pixoree.tools.Tool.HAND)
      }
    }
  })

  const handleKeyUp = useEvent(async (e: KeyboardEvent) => {
    e.preventDefault()

    if (e.code === 'Space' && !e.metaKey) {
      Pixoree.tools.setActiveToolName(lastTool)
    }
  })

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])
}
