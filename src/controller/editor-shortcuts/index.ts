import { bindings } from './bindings/photoshop'
import { eventHandlers } from './shortcut-handlers'
import { findObjectKey } from '@/tools/utils/object'
import type {
  EditorShortcutDependencies,
  ShortcutBindingsCatalog,
  ShortcutEventHandlerCatalog,
  ShortcutName,
} from './types'

export class EditorShortcuts {
  public constructor(dependencies: EditorShortcutDependencies) {
    this.#dependencies = dependencies
    this.#activeShortcut = null
    this.#shortcutBindings = bindings
    this.#shortcutEventHandlers = eventHandlers
    this.onKeyPress = this.onKeyPress.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
    window.addEventListener('keydown', this.onKeyPress)
    window.addEventListener('keyup', this.onKeyUp)
  }

  #dependencies: EditorShortcutDependencies

  #activeShortcut: ShortcutName | null
  #shortcutBindings: ShortcutBindingsCatalog
  #shortcutEventHandlers: ShortcutEventHandlerCatalog
  #ignoredKeyCodes = [
    'ShiftLeft',
    'ShiftRight',
    'ControlLeft',
    'ControlRight',
    'AltLeft',
    'AltRight',
    'MetaLeft',
    'MetaRight',
  ]

  public getShortcutCode(event: KeyboardEvent) {
    const keys = []
    if (event.shiftKey) keys.push('Shift') // Shift key
    if (event.ctrlKey) keys.push('Ctrl') // Control key
    if (event.altKey) keys.push('Alt') // altKey =  Option(Mac) | Alt(Windows)
    if (event.metaKey) keys.push('Meta') // metaKey = Command(Mac) | Windows key(Windows)
    if (!this.#ignoredKeyCodes.includes(event.code)) keys.push(event.code)
    const shortcut = keys.join('--')
    return shortcut
  }

  private getShortcutName(shortcutCode: string): ShortcutName | null {
    const eventName = findObjectKey(this.#shortcutBindings, (value) => value === shortcutCode)
    return eventName as ShortcutName
  }

  private onKeyPress(event: KeyboardEvent) {
    const shortcutCode = this.getShortcutCode(event)
    // DEV: allow page reload with metaKey+R, but disable the rest of browser shortcuts
    if (event.metaKey && event.code === 'KeyR') return
    else event.preventDefault()

    // ignore key-presses when the target of the event is an input or text area field
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return
    // ignore key-presses when modal is open
    if (this.#dependencies.modal.activeModal) return

    // Disable default browser shortcuts
    const shortcutName = this.getShortcutName(shortcutCode)
    if (!shortcutName) return
    const shortcutHandler = this.#shortcutEventHandlers[shortcutName]
    shortcutHandler('press', this.#dependencies)
    this.#activeShortcut = shortcutName
  }

  private onKeyUp(event: KeyboardEvent) {
    event.preventDefault()
    if (!this.#activeShortcut) return
    const shortcutHandler = this.#shortcutEventHandlers[this.#activeShortcut]
    shortcutHandler('release', this.#dependencies)
    this.#activeShortcut = null
  }
}
