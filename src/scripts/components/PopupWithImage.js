import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._previewImage = document.getElementById("previewImage");
    this._popupCaption = document.getElementById("imageViewTitle");
  }
  open({ name, link }) {
    this._previewImage.src = link;
    this._previewImage.alt = name;
    this._popupCaption.textContent = name;
    super.open();
  }
}
