export default class Popup {
  constructor(popup) {
    // generic open and closes a popup
    this._popupElement = document.querySelector(popup);
  }

  open() {
    // open popup
    // be called in the preexisting event handlers
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("mousedown", handleOverlayClose);
  }

  close() {
    // close popup
    modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", handleEscClose);
    document.removeEventListener("mousedown", handleOverlayClose);
  }

  _handleEscClose() {
    // stores the logic for closing the popup  by pressing the esc key
    if (evt.key === "Escape" || evt.key === "Esc") {
      const openModal = document.querySelector(".modal_opened");
      if (openModal) {
        closeModal(openModal);
      }
    }
  }

  setEventListeners() {
    // adds a click event to close the popup
  }
}
