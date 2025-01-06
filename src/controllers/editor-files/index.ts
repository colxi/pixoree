import { getImageDataFromBuffer, getImageDataFromImage } from '@/tools/utils/image'
import type { EditorImage } from '../editor-image'

interface EditorFilesDependencies {
  image: EditorImage
}

export class EditorFile {
  public constructor(dependencies: EditorFilesDependencies) {
    this.#dependencies = dependencies
  }

  #dependencies: EditorFilesDependencies

  public open() {
    const inputElement = document.createElement('input')
    inputElement.type = 'file'
    inputElement.accept = 'image/*'
    inputElement.onchange = () => {
      const file = inputElement.files?.[0]
      if (!file) return
      const fileReader = new FileReader()
      fileReader.onload = (event) => {
        const dataAsUrl = event.target?.result
        if (typeof dataAsUrl !== 'string') return
        const imageElement = new Image()
        imageElement.onload = () => {
          const imageData = getImageDataFromImage(imageElement)
          const clampedArray = new Uint8ClampedArray(imageData.data.buffer)
          this.#dependencies.image.setImageSize({ w: imageData.width, h: imageData.height })
          this.#dependencies.image.setImageData(clampedArray)
          inputElement.remove()
        }
        imageElement.src = dataAsUrl
      }
      fileReader.readAsDataURL(file)
    }
    inputElement.click()
  }

  public async save() {
    const fileName = 'pixoree.png'
    const mimeType = 'image/png'

    const imageData = getImageDataFromBuffer(this.#dependencies.image.imageBuffer, this.#dependencies.image.size)
    const canvas = new OffscreenCanvas(this.#dependencies.image.size.w, this.#dependencies.image.size.h)
    const context = canvas.getContext('2d')
    if (!context) throw new Error('Could not get 2d context')
    context.putImageData(imageData, 0, 0)

    const blob = await canvas.convertToBlob({ type: mimeType })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = fileName
    link.click()
    URL.revokeObjectURL(link.href)

    /**
     *
     *  Save raw image data... (pixoree .raw rgba data)
     *
     */

    // const fileName = 'pixoree.png'
    // const mimeType = 'image/png'
    // // Create a Blob from the ArrayBuffer
    // const blob = new Blob([this.#imageBuffer], { type: mimeType })

    // // Create a temporary link element
    // const link = document.createElement('a')
    // link.href = URL.createObjectURL(blob) // Generate a URL for the Blob
    // link.download = fileName // Set the file name for download

    // // Programmatically trigger the download
    // link.click()

    // // Clean up
    // URL.revokeObjectURL(link.href)
    // link.remove()
  }
}
