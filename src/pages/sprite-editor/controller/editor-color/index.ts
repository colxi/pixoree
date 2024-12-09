import { HexColor } from '../../types'
import { EditorEventBus } from '../event-bus'
import { palettes } from './constants'
import { EditorColorOptions, EditorPalette } from './types'

export class EditorColor {
  constructor({ eventBus }: EditorColorOptions) {
    this.#eventBus = eventBus
    this.#palettes = palettes
    this.#paletteId = this.#palettes[0].id
    this.#primaryColor = '#ffffff'
    this.#secondaryColor = '#000000'
  }

  #eventBus: EditorEventBus
  #palettes: EditorPalette[]
  #primaryColor: HexColor
  #secondaryColor: HexColor
  #paletteId: string

  public get primaryColor() {
    return this.#primaryColor
  }

  public get secondaryColor() {
    return this.#secondaryColor
  }

  public get palette(): Readonly<EditorPalette> {
    const palette = this.#palettes.find(
      (palette) => palette.id === this.#paletteId
    )
    if (!palette) throw new Error('Current palette ID not found')
    return palette
  }

  public get palettes(): Readonly<EditorPalette[]> {
    return this.#palettes
  }

  setPrimaryColor(color: HexColor) {
    this.#primaryColor = color
    this.#eventBus.dispatch(this.#eventBus.Event.PRIMARY_COLOR_CHANGE, {})
  }

  setSecondaryColor(color: HexColor) {
    this.#secondaryColor = color
    this.#eventBus.dispatch(this.#eventBus.Event.SECONDARY_COLOR_CHANGE, {})
  }

  setPalette(paletteId: string) {
    this.#paletteId = paletteId
    this.#eventBus.dispatch(this.#eventBus.Event.COLOR_PALETTE_CHANGE, {})
  }
}
