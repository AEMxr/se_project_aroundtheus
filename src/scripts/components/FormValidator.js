export default class FormValidator {
  constructor(options, formElement) {
    this._formElement = formElement;
    this._submitButton = this._formElement.querySelector(
      options.submitButtonSelector
    );
    this._inputElements = Array.from(
      this._formElement.querySelectorAll(options.inputSelector)
    );
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;
  }

  /*~----=)>. Function to show input error message '<(=----~*/
  _showInputError(inputElement) {
    const errorMessageElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    if (!errorMessageElement) return;

    inputElement.classList.add(this._inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(this._errorClass);
  }

  /*~----=)>. Function to hide input error message '<(=----~*/
  _hideInputError(inputElement) {
    const errorMessageElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    if (!errorMessageElement) return;

    inputElement.classList.remove(this._inputErrorClass);
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(this._errorClass);
  }

  /*~----=)>. Function to check input validity and show/hide error messages accordingly '<(=----~*/
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  /*~----=)>. Function to check if any input in the list is invalid '<(=----~*/
  _hasInvalidInput() {
    return this._inputElements.some(
      (inputElement) => !inputElement.validity.valid
    );
  }

  /*~----=)>. Function to disable the submit button '<(=----~*/
  _disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  /*~----=)>. Function to enable the submit button '<(=----~*/
  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  /*~----=)>. Function to toggle the button state based on input validity '<(=----~*/
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputElements.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  /*~----=)>. Function to set event listeners on form inputs '<(=----~*/
  _setEventListeners(formElement) {
    // const inputElements = Array.from(this._inputElements);
    if (!this._submitButton) return;

    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  /*~----=)>. Function to enable validation on all specified forms '<(=----~*/
  enableValidation() {
    this._formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }
  disableButton() {
    this._disableButton();
  }
}
