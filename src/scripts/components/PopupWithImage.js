import Popup from "./Popup.js";

// export default class PopupWithImage extends Popup {
//   constructor(popupSelector, handleFormSubmit) {
//     super(popupSelector);
//     this._popupForm.querySelector(".modal__container");
//     this._handleFormSubmit = handleFormSubmit;
//   }

//   close() {
//     this._popupFrom.reset();
//     super.close();
//   }
// }

export default class PopupWithImage extends Popup {
  open(name, link) {
    // set the image's src and alt
    // set the caption's textContent
    super.open();
  }
}
