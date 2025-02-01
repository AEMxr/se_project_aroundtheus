import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  static selectors = {
    image: "#previewImage",
    caption: "#imageViewTitle",
  };

  constructor(popupSelector) {
    super(popupSelector);
    this._elements = this._initializeElements();
  }

  _initializeElements() {
    return {
      image: document.querySelector(PopupWithImage.selectors.image),
      caption: document.querySelector(PopupWithImage.selectors.caption),
    };
  }

  open({ name, link } = {}) {
    if (name && link) {
      this._elements.image.src = link;
      this._elements.image.alt = name;
      this._elements.caption.textContent = name;
      super.open();
    }
  }
}
