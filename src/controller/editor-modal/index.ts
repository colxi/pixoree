import {
  ActiveModalDescriptor,
  EditorModalDependencies,
  ModalCatalog,
  ModalName,
} from './types'

export class EditorModal {
  constructor({ eventBus }: EditorModalDependencies) {
    this.#dependencies = { eventBus }
    this.#activeModal = null
    this.#modalTitle = ''
  }

  #dependencies: EditorModalDependencies

  #modalTitle: string
  #activeModal: ActiveModalDescriptor | null

  get activeModal() {
    return this.#activeModal
  }

  get modalTitle() {
    return this.#modalTitle
  }

  openModal<MODAL extends ModalName>(name: MODAL, params: ModalCatalog[MODAL]) {
    this.#activeModal = { name, params }
    this.#dependencies.eventBus.dispatch(
      this.#dependencies.eventBus.Event.MODAL_OPEN,
      {}
    )
  }

  closeModal() {
    this.#activeModal = null
    this.#dependencies.eventBus.dispatch(
      this.#dependencies.eventBus.Event.MODAL_CLOSE,
      {}
    )
  }

  setModalTitle(title: string) {
    this.#modalTitle = title
    this.#dependencies.eventBus.dispatch(
      this.#dependencies.eventBus.Event.MODAL_TITLE_CHANGE,
      {}
    )
  }
}
