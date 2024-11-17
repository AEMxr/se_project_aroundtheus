import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm.querySelector(".modal__container");
    this._handleFormSubmit = handleFormSubmit;
  }

  close() {
    this._popupFrom.reset();
    super.close();
  }
}

//index.js
// const newCardPopup = new PopupWithForm(".modal__container", () => {});
