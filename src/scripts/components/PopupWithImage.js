import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._previewImage = document.getElementById("previewImage");
    this._popupCaption = document.getElementById("imageViewTitle");
    this._popupAlt = document.getElementById("previewImage");
  }
  open({ name, link }) {
    // set the image's src and alt
    // set the caption's textContent
    this._previewImage.src = link;
    this._popupAlt.alt = name;
    this._popupCaption.textContent = name;
    super.open();
  }
}
