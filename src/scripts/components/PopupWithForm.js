import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, validator) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector(".form");
    this._inputList = Array.from(this._form.querySelectorAll(".form__input"));
    this._submitButton = this._form.querySelector(".modal__submit");
    this._validator = validator;
  }

  close() {
    super.close();
    this._form.reset();
    this._validator.resetValidation();
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.id];
    });
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.id] = input.value;
    });
    return inputValues;
  }

  getForm() {
    return this._form;
  }

  getSubmitButton() {
    return this._submitButton;
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    this._submitButton.textContent = isLoading ? loadingText : "Save";
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
