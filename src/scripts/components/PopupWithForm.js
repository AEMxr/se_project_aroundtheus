import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  static selectors = {
    form: ".form",
    input: ".form__input",
    submit: ".modal__submit",
  };

  static buttonStates = {
    loading: "Saving...",
    default: "Save",
  };

  constructor(popupSelector, handleFormSubmit, validator) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._validator = validator;
    this._elements = this._initializeElements();
  }

  _initializeElements() {
    return {
      form: this._popupElement.querySelector(PopupWithForm.selectors.form),
      inputs: Array.from(
        this._popupElement.querySelectorAll(PopupWithForm.selectors.input)
      ),
      submit: this._popupElement.querySelector(PopupWithForm.selectors.submit),
    };
  }

  close() {
    super.close();
    this._elements.form.reset();
    this._validator.resetValidation();
  }

  setInputValues(data) {
    this._elements.inputs.forEach((input) => {
      input.value = data[input.id] || "";
    });
  }

  _getInputValues() {
    return this._elements.inputs.reduce(
      (values, input) => ({
        ...values,
        [input.id]: input.value,
      }),
      {}
    );
  }

  getForm() {
    return this._elements.form;
  }

  getSubmitButton() {
    return this._elements.submit;
  }

  renderLoading(isLoading) {
    this._elements.submit.textContent = isLoading
      ? PopupWithForm.buttonStates.loading
      : PopupWithForm.buttonStates.default;
  }

  setEventListeners() {
    super.setEventListeners();
    this._elements.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}
