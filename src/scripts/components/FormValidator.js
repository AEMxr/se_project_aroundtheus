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

  _updateElementState(element, { error = false, message = "" }) {
    const errorSelector =
      element.id === "avatar"
        ? "#name-error"
        : FormValidator.selectors.error(element.id);
    const errorElement = this._form.querySelector(errorSelector);
    if (!errorElement) return;

    element.classList.toggle(this._config.inputError, error);
    errorElement.classList.toggle(this._config.error, error);
    errorElement.textContent = message;
  }

  _validateInput(input) {
    const isValid = input.validity.valid;
    this._updateElementState(input, {
      error: !isValid,
      message: input.validationMessage,
    });
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
