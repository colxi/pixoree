import { AppRoutesCollection } from '../../../global-contexts/app-router/types'
import { ImageEditor } from '../ui/ImageEditor'

export const spritesEditorRoutes = {
  '/project/sprites': { component: ImageEditor },
} satisfies AppRoutesCollection
