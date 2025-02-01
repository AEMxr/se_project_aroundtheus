export default class FormValidator {
  static selectors = {
    error: (inputId) => `#${inputId}-error`,
  };

  constructor(options, formElement, stateManager) {
    this._form = formElement;
    this._stateManager = stateManager;
    this._config = {
      submitButton: options.submitButtonSelector,
      input: options.inputSelector,
      buttonInactive: options.inactiveButtonClass,
      inputError: options.inputErrorClass,
      error: options.errorClass,
    };

    this._elements = {
      submit: this._form.querySelector(this._config.submitButton),
      inputs: Array.from(this._form.querySelectorAll(this._config.input)),
    };

    this._formName = this._form.getAttribute("name");
  }

<<<<<<< HEAD
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
=======
  _updateElementState(element, { error = false, message = "" }) {
    const errorElement = this._form.querySelector(
      FormValidator.selectors.error(element.id)
    );
    if (!errorElement) return;
>>>>>>> a311bc355b484c7b0c7360f2bbc4e2678bc2e103

    element.classList.toggle(this._config.inputError, error);
    errorElement.classList.toggle(this._config.error, error);
    errorElement.textContent = message;
  }

<<<<<<< HEAD
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
=======
  _validateInput(input) {
    const isValid = input.validity.valid;
    this._updateElementState(input, {
      error: !isValid,
      message: input.validationMessage,
    });
>>>>>>> a311bc355b484c7b0c7360f2bbc4e2678bc2e103
  }

  _updateFormState() {
    const isValid = this._elements.inputs.every(
      (input) => input.validity.valid
    );

    this._stateManager.setState({
      forms: {
        ...this._stateManager.getState().forms,
        [this._formName]: { isValid, isDirty: true },
      },
    });

    this._elements.submit?.classList.toggle(
      this._config.buttonInactive,
      !isValid
    );
    if (this._elements.submit) {
      this._elements.submit.disabled = !isValid;
    }
  }

  resetValidation() {
    this._elements.inputs.forEach((input) =>
      this._updateElementState(input, { error: false })
    );
    this._updateFormState();
  }

  _initializeEventListeners() {
    if (!this._elements.submit) return;

    this._elements.inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._validateInput(input);
        this._updateFormState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => e.preventDefault());
    this._initializeEventListeners();
  }

  disableButton() {
    if (this._elements.submit) {
      this._elements.submit.classList.add(this._config.buttonInactive);
      this._elements.submit.disabled = true;
    }
  }
}
