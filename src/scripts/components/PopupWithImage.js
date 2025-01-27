import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    // Initialize elements after super() call
    this._previewImage = document.querySelector("#previewImage");
    this._popupCaption = document.querySelector("#imageViewTitle");
  }

  open(cardData) {
    // Ensure cardData exists before accessing properties
    if (cardData && cardData.name && cardData.link) {
      this._previewImage.src = cardData.link;
      this._previewImage.alt = cardData.name;
      this._popupCaption.textContent = cardData.name;
      super.open();
    }
  }
}
