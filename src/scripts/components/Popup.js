export default class Popup {
  constructor(popup) {
    // generic open and closes a popup
    this._popupElement = document.querySelector(popup);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    // open popup
    // be called in the preexisting event handlers
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
    // document.addEventListener("mousedown", this._handleEscClose);
  }

  close() {
    // close popup
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    // stores the logic for closing the popup  by pressing the esc key
    if (evt.key === "Escape" || evt.key === "Esc") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("modal_opened")) {
        this.close();
      }
    });
  }
}

// The constructor accepts a single parameter, the popup selector. -check
// It has public methods called open() and close() to open and close the popup. -check
//The open() method should be called in the preexisting event handlers in index.js.
// It has a private method named _handleEscClose() that stores the logic -check
//for closing the popup by pressing the Esc key. -check
// It has a public method named setEventListeners()  -check
//that adds a click event listener to the close icon of the popup. -check
//The modal window should also close when users click on the shaded area around the form. -check
