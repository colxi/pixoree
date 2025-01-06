import { bindings } from './bindings/photoshop'
import { eventHandlers } from './shortcut-handlers'
import { findObjectKey } from '@/tools/utils/object'
import type {
  EditorShortcutDependencies,
  ShortcutBindingsCatalog,
  ShortcutEventHandler,
  ShortcutEventHandlerCatalog,
  ShortcutName,
} from './types'

/**
 *
 * EditorShortcuts Controller Class handles keyboard shortcuts for the editor, by listening to
 * key-press and key-up events, and calling the corresponding event handlers.
 *
 */
export class EditorShortcuts {
  public constructor(dependencies: EditorShortcutDependencies) {
    this.#dependencies = dependencies
    this.#activeShortcut = null
    this.#shortcutBindings = bindings
    this.#shortcutEventHandlers = eventHandlers
    this.onKeyDown = this.onKeyDown.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)
    window.addEventListener('keydown', this.onKeyDown)
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

  /**
   *
   * Get an array with all the available shortcut names.
   *
   */
  public getAvailableShortcutNames(): string[] {
    return Object.keys(this.#shortcutBindings)
  }

  /**
   *
   * Get the formatted shortcut keys string.
   *
   */
  public getFormattedShortcutKeys(shortcutKeys: string): string {
    const parts = shortcutKeys.split('--')
    const formatted = parts.map((part) => {
      if (part === 'Shift') return '⇧'
      if (part === 'Ctrl') return '⌃'
      if (part === 'Alt') return '⌥'
      if (part === 'Meta') return '⌘'
      return part.replace('Key', '')
    })
    return formatted.join('')
  }

  /**
   *
   *  Get the shortcut keys for a given shortcut name or keyboard event.
   *
   */
  public getShortcutKeys(data: KeyboardEvent | ShortcutName): string {
    // When input is a shortcutName (string)...
    if (typeof data === 'string') {
      const shortcutName = data
      // obtain the keys from the catalog
      const shortcutKeysAsString = this.#shortcutBindings[shortcutName]
      return shortcutKeysAsString
    }
    // When input is a keyboard event...
    else {
      const event = data
      const keys = []
      // track modifier keys
      if (event.shiftKey) keys.push('Shift') // Shift key
      if (event.ctrlKey) keys.push('Ctrl') // Control key
      if (event.altKey) keys.push('Alt') // altKey =  Option (on Mac) | Alt (on Windows)
      if (event.metaKey) keys.push('Meta') // metaKey = Command (on Mac) | Windows key (on Windows)
      // track the main key (ignoring modifier keys as have been already been tracked)
      if (!this.#ignoredKeyCodes.includes(event.code)) keys.push(event.code)
      const shortcutKeys = keys.join('--')
      // done!
      return shortcutKeys
    }
  }

  /**
   *
   * Get the shortcut name for a given shortcut keys string.
   *
   */
  private getShortcutName(shortcutKeys: string): ShortcutName | null {
    const shortcutName = findObjectKey(this.#shortcutBindings, (value) => value === shortcutKeys)
    return shortcutName as ShortcutName
  }

  /**
   *
   * Get the shortcut handler for a given shortcut keys.
   *
   */
  private getShortcutHandler(shortcutKeys: string): ShortcutEventHandler | null {
    const shortcutName = this.getShortcutName(shortcutKeys)
    if (!shortcutName) return null
    const shortcutHandler = this.#shortcutEventHandlers[shortcutName]
    return shortcutHandler
  }

  /**
   *
   * Handle key-press events and execute the corresponding shortcut handler.
   *
   */
  private onKeyDown(event: KeyboardEvent) {
    // DEV: allow page reload with metaKey+R, but disable the rest of browser shortcuts
    if (event.metaKey && event.code === 'KeyR') return
    else event.preventDefault()

    // ignore key-presses when the target of the event is an input or text area field
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return
    // ignore key-presses when modal is open
    if (this.#dependencies.modal.activeModal) return

    // Call the shortcut handler handler (if it exists)
    const shortcutKeys = this.getShortcutKeys(event)
    const shortcutName = this.getShortcutName(shortcutKeys)
    const shortcutHandler = this.getShortcutHandler(shortcutKeys)
    if (!shortcutHandler) return
    shortcutHandler('press', this.#dependencies)

    // set the active shortcut in order to handle key-up events
    this.#activeShortcut = shortcutName
  }

  /**
   *
   * Handle key-up events and execute the corresponding shortcut handler.
   *
   */
  private onKeyUp(event: KeyboardEvent) {
    event.preventDefault()
    if (!this.#activeShortcut) return
    const shortcutHandler = this.#shortcutEventHandlers[this.#activeShortcut]
    shortcutHandler('release', this.#dependencies)
    this.#activeShortcut = null
  }
}
