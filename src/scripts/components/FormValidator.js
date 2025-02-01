export default class FormValidator {
  constructor(options, formElement, stateManager) {
    this._formElement = formElement;
    this._stateManager = stateManager;
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
    this._formName = this._formElement.getAttribute("name");
  }

  _getErrorElement(inputElement) {
    const errorSelector =
      inputElement.id === "avatar"
        ? "#name-error"
        : `#${inputElement.id}-error`;
    return this._formElement.querySelector(errorSelector);
  }

  _showInputError(inputElement) {
    const errorMessageElement = this._getErrorElement(inputElement);
    if (!errorMessageElement) return;

    inputElement.classList.add(this._inputErrorClass);
    errorMessageElement.textContent = inputElement.validationMessage;
    errorMessageElement.classList.add(this._errorClass);

    this._updateFormState();
  }

  _hideInputError(inputElement) {
    const errorMessageElement = this._getErrorElement(inputElement);
    if (!errorMessageElement) return;

    inputElement.classList.remove(this._inputErrorClass);
    errorMessageElement.textContent = "";
    errorMessageElement.classList.remove(this._errorClass);

    this._updateFormState();
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputElements.some(
      (inputElement) => !inputElement.validity.valid
    );
  }

  _updateFormState() {
    const isValid = !this._hasInvalidInput();
    this._stateManager.setState({
      forms: {
        ...this._stateManager.getState().forms,
        [this._formName]: {
          isValid,
          isDirty: true,
        },
      },
    });
  }

  _disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
    this._updateFormState();
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputElements.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  _setEventListeners() {
    if (!this._submitButton) return;

    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

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
