export default class Popup {
  static classes = {
    opened: "modal_opened",
    closeButton: "modal__close",
  };

  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add(Popup.classes.opened);
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove(Popup.classes.opened);
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape" || evt.key === "Esc") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains(Popup.classes.opened) ||
        evt.target.classList.contains(Popup.classes.closeButton)
      ) {
        this.close();
      }
    });
  }
}
