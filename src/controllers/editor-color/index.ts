import { palettes } from './constants'
import type { EditorColorOptions, EditorPalette } from './types'
import type { EditorEventBus } from '../event-bus'
import type { RgbaColor } from '../../types'

export class EditorColor {
  public constructor({ eventBus }: EditorColorOptions) {
    this.#eventBus = eventBus
    this.#palettes = palettes
    this.#paletteId = this.#palettes[0].id
    this.#primaryColor = { r: 0, g: 100, b: 98, a: 255 }
    this.#secondaryColor = { r: 255, g: 255, b: 255, a: 255 }
  }

  #eventBus: EditorEventBus
  #palettes: EditorPalette[]
  #primaryColor: RgbaColor
  #secondaryColor: RgbaColor
  #paletteId: string

  public get primaryColor() {
    return this.#primaryColor
  }

  public get secondaryColor() {
    return this.#secondaryColor
  }

  public get palette(): Readonly<EditorPalette> {
    const palette = this.#palettes.find((palette) => palette.id === this.#paletteId)
    if (!palette) throw new Error('Current palette ID not found')
    return palette
  }

  public get palettes(): Readonly<EditorPalette[]> {
    return this.#palettes
  }

  public setPrimaryColor(color: RgbaColor) {
    this.#primaryColor = color
    this.#eventBus.dispatch('PRIMARY_COLOR_CHANGE', {})
  }

  public setSecondaryColor(color: RgbaColor) {
    this.#secondaryColor = color
    this.#eventBus.dispatch('SECONDARY_COLOR_CHANGE', {})
  }

  public setPalette(paletteId: string) {
    this.#paletteId = paletteId
    this.#eventBus.dispatch('COLOR_PALETTE_CHANGE', {})
  }
}
