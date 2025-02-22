// https://fontawesome.com/search?q=zoom&o=r

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowsUpDownLeftRight,
  faEraser,
  faEyeDropper,
  faFileLines,
  faFillDrip,
  faHand,
  faMagnifyingGlass,
  faPaintBrush,
  faRepeat,
  faTrashCan
} from '@fortawesome/free-solid-svg-icons'

export const CrossIcon = () => <FontAwesomeIcon icon={faArrowsUpDownLeftRight} />
export const BrushIcon = () => <FontAwesomeIcon icon={faPaintBrush} />
export const EraserIcon = () => <FontAwesomeIcon icon={faEraser} />
export const HandIcon = () => <FontAwesomeIcon icon={faHand} />
export const MagnifyingGlassIcon = () => <FontAwesomeIcon icon={faMagnifyingGlass} />
export const EyeDropperIcon = () => <FontAwesomeIcon icon={faEyeDropper} />
export const FillDripIcon = () => <FontAwesomeIcon icon={faFillDrip} />
export const SwitchIcon = () => <FontAwesomeIcon icon={faRepeat} />
export const FileTextIcon = () => <FontAwesomeIcon icon={faFileLines} />
export const TrashCanIcon = () => <FontAwesomeIcon icon={faTrashCan} />