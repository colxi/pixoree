import { debounce } from 'lodash-es'
import type { EditorHistoryDependencies, EditorHistoryEntry } from './types'
import type { ReactElement } from 'react'

const MAX_ITEMS = 100

export class EditorHistory {
  public constructor({ eventBus, image }: EditorHistoryDependencies) {
    this.#dependencies = { eventBus, image }
    this.#currentIndex = 0
    this.#maxItems = MAX_ITEMS

    this.undo = this.undo.bind(this)
    this.redo = this.redo.bind(this)
  }

  #dependencies: EditorHistoryDependencies

  #maxItems: number
  #currentIndex: number
  #entries: EditorHistoryEntry[] = []

  public get currentIndex() {
    return this.#currentIndex
  }

  public get entries() {
    return this.#entries
  }

  private createEntry(action: string, icon: ReactElement) {
    // create history data
    const arrayBuffer = new ArrayBuffer(this.#dependencies.image.size.w * this.#dependencies.image.size.h * 4)
    const imageData = new Uint8ClampedArray(arrayBuffer)
    imageData.set(this.#dependencies.image.imageBuffer)
    const entry = { action, icon, data: imageData }

    // add to history
    const isFirstItem = !this.#currentIndex && !this.#entries.length
    if (isFirstItem) this.#entries.push(entry)
    else {
      const newIndex = this.#currentIndex + 1
      this.#entries[newIndex] = entry
      const tail = this.#entries.length - 1 - newIndex
      if (tail) this.#entries.splice(-tail)
      this.#currentIndex = newIndex
    }

    // apply history length limits
    if (this.#entries.length > this.#maxItems) {
      this.#entries.shift()
      this.#currentIndex--
    }

    this.emitHistoryChangeEvent()
  }

  private loadIndex(index: number) {
    const data = this.#entries[index].data
    this.#dependencies.image.imageBuffer.set(data)
    this.#currentIndex = index
    this.emitHistoryChangeEvent()
  }

  private emitHistoryChangeEvent() {
    this.#dependencies.eventBus.dispatch('HISTORY_CHANGE', {})
  }

  public deleteEntry(index: number) {
    const newIndex = this.#currentIndex - 1
    if (!this.#entries.length || this.#currentIndex === 0) return
    this.#entries.splice(index, 1)
    this.loadIndex(newIndex)
  }

  public undo() {
    const newIndex = this.#currentIndex - 1
    if (!this.#entries.length || !this.#currentIndex) return
    this.loadIndex(newIndex)
  }

  public redo() {
    const newIndex = this.#currentIndex + 1
    if (!this.#entries.length || newIndex > this.#entries.length - 1) return
    this.loadIndex(newIndex)
  }

  public load(index: number) {
    if (!this.#entries.length || index > this.#entries.length - 1) return
    this.loadIndex(index)
  }

  public register = debounce(this.createEntry, 200)
}
