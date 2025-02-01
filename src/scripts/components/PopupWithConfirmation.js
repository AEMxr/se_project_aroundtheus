import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  static selectors = {
    form: ".form",
  };

  constructor(popupSelector) {
    super(popupSelector);
    this._elements = {
      form: this._popupElement.querySelector(
        PopupWithConfirmation.selectors.form
      ),
    };
    this._handleFormSubmit = () => {};
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._elements.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }
}
