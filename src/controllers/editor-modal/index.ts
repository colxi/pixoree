import type { ActiveModalDescriptor, EditorModalDependencies, ModalCatalog, ModalName } from './types'

export class EditorModal {
  public constructor({ eventBus }: EditorModalDependencies) {
    this.#dependencies = { eventBus }
    this.#activeModal = null
    this.#modalTitle = ''
  }

  #dependencies: EditorModalDependencies

  #modalTitle: string
  #activeModal: ActiveModalDescriptor | null

  public get activeModal() {
    return this.#activeModal
  }

  public get modalTitle() {
    return this.#modalTitle
  }

  public openModal<MODAL extends ModalName>(name: MODAL, params: ModalCatalog[MODAL]) {
    this.#activeModal = { name, params }
    this.#dependencies.eventBus.dispatch('MODAL_OPEN', {})
  }

  public closeModal() {
    this.#activeModal = null
    this.#dependencies.eventBus.dispatch('MODAL_CLOSE', {})
  }

  public setModalTitle(title: string) {
    this.#modalTitle = title
    this.#dependencies.eventBus.dispatch('MODAL_TITLE_CHANGE', {})
  }
}
