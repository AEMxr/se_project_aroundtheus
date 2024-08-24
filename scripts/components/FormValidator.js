export default class FormValidator {
  constructor(options, formElement) {
    this._formElement = formElement;
    this._submitButton = this._formElement.querySelector(options.submitButton);
    this._inputElements = this._formElement.querySelectorAll(
      options.inputSelector
    );
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;
  }

  /*~----=)>. Function to show input error message '<(=----~*/
  _showInputError(formElement, inputElement) {
    const errorMessageElement = formElement.querySelector(
      `#${inputElement.id}-error`
    );
    if (!errorMessageElement) return;

    inputElement.classList.add(this._inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(this._errorClass);
  }

  /*~----=)>. Function to hide input error message '<(=----~*/
  _hideInputError(formElement, inputElement) {
    const errorMessageElement = formElement.querySelector(
      `#${inputElement.id}-error`
    );
    if (!errorMessageElement) return;

    inputElement.classList.remove(this._inputErrorClass);
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(this._errorClass);
  }

  /*~----=)>. Function to check input validity and show/hide error messages accordingly '<(=----~*/
  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  /*~----=)>. Function to check if any input in the list is invalid '<(=----~*/
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  }

  /*~----=)>. Function to disable the submit button '<(=----~*/
  _disableButton(buttonElement) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.disabled = true;
  }

  /*~----=)>. Function to enable the submit button '<(=----~*/
  _enableButton(buttonElement) {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.disabled = false;
  }

  /*~----=)>. Function to toggle the button state based on input validity '<(=----~*/
  _toggleButtonState(inputElements, submitButton) {
    if (this._hasInvalidInput(inputElements)) {
      this._disableButton(submitButton);
    } else {
      this._enableButton(submitButton);
    }
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach(() => {
      this._hideInputError(this._inputSelector);
    });
  }

  /*~----=)>. Function to set event listeners on form inputs '<(=----~*/
  _setEventListeners(formElement) {
    // const inputElements = Array.from(this._inputElements);
    if (!this._submitButton) return;

    this._inputElements.forEach((inputElement) => {
      this._inputElements.addEventListener("input", () => {
        this._checkInputValidity(formElement, inputElement);
        this._toggleButtonState(inputElements, submitButton);
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
}
