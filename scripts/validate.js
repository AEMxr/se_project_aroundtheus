// function showInputError(
//   formElement,
//   inputElement,
//   { inputErrorClass, errorClass }
// ) {
//   const errorMessageElement = formElement.querySelector(
//     `#${inputElement.id}-error`
//   );
//   inputElement.classList.add(inputErrorClass);
//   errorMessageElement.textContent = inputElement.validationMessage;
//   errorMessageElement.classList.add(errorClass);
// }

// function hideInputError(
//   formElement,
//   inputElement,
//   { inputErrorClass, errorClass }
// ) {
//   const errorMessageElement = formElement.querySelector(
//     `#${inputElement.id}-error`
//   );
//   inputElement.classList.remove(inputErrorClass);
//   errorMessageElement.textContent = "";
//   errorMessageElement.classList.remove(errorClass);
// }

// function checkInputValidity(formElement, inputElement, options) {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, options);
//   } else {
//     hideInputError(formElement, inputElement, options);
//   }
// }

// function hasInvalidInput(inputList) {
//   return !inputList.every((inputElement) => inputElement.validity.valid);
// }

// //disable button function

// //enable button function

// function toggleButtonState(
//   inputElements,
//   submitButton,
//   { inactiveButtonClass }
// ) {
//   // let foundInvalid = false;
//   // inputElements.forEach((inputElement) => {
//   //   if (!inputElement.validity.valid) {
//   //     foundInvalid = true;
//   //   }
//   // });

//   if (hasInvalidInput(inputElements)) {
//     submitButton.classList.add(inactiveButtonClass);
//     submitButton.disabled = true;
//     return;
//   }
//   submitButton.classList.remove(inactiveButtonClass);
//   submitButton.disabled = false;
// }

// function setEventListeners(formElements, options) {
//   const { inputSelector } = options;
//   const inputElements = [...formElements.querySelectorAll(inputSelector)];
//   const submitButton = formElement.querySelector(".modal__submit");
//   inputElements.forEach((inputElement) => {
//     inputElement.addEventListener("input", (e) => {
//       checkInputValidity(formElement, inputElement, options);
//       toggleButtonState(inputElements, submitButton, options);
//     });
//   });
// }

// function enableValidation(options) {
//   const formElements = [...document.querySelectorAll(options.formSelector)];
//   formElements.forEach((formElement) => {
//     formElement.addEventListener("submit", () => {
//       e.preventDefault();
//     });
//     setEventListeners(formElements, options);
//   });
// }

// /*~----=)>. Validation configuration object '<(=----~*/
// enableValidation({
//   formSelector: ".form",
//   inputSelector: ".form__input",
//   submitButtonSelector: ".modal__button",
//   inactiveButtonClass: ".modal__submit_disabled",
//   inputErrorClass: ".form__input_type_error",
//   errorClass: ".form__error_visible",
// });

// Function to show input error message
function showInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  if (!errorMessageElement) return;

  inputElement.classList.add(inputErrorClass);
  errorMessageElement.textContent = inputElement.validationMessage;
  errorMessageElement.classList.add(errorClass);
}

// Function to hide input error message
function hideInputError(
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) {
  const errorMessageElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
  if (!errorMessageElement) return;

  inputElement.classList.remove(inputErrorClass);
  errorMessageElement.textContent = "";
  errorMessageElement.classList.remove(errorClass);
}

// Function to check input validity and show/hide error messages accordingly
function checkInputValidity(formElement, inputElement, options) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
}

// Function to check if any input in the list is invalid
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

// Function to disable the submit button
function disableButton(buttonElement, { inactiveButtonClass }) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
}

// Function to enable the submit button
function enableButton(buttonElement, { inactiveButtonClass }) {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = false;
}

// Function to toggle the button state based on input validity
function toggleButtonState(inputElements, submitButton, options) {
  if (hasInvalidInput(inputElements)) {
    disableButton(submitButton, options);
  } else {
    enableButton(submitButton, options);
  }
}

// Function to set event listeners on form inputs
function setEventListeners(formElement, options) {
  const inputElements = Array.from(
    formElement.querySelectorAll(options.inputSelector)
  );
  const submitButton = formElement.querySelector(options.submitButtonSelector);

  if (!submitButton) return;

  inputElements.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, options);
      toggleButtonState(inputElements, submitButton, options);
    });
  });
}

// Function to enable validation on all specified forms
function enableValidation(options) {
  const formElements = Array.from(
    document.querySelectorAll(options.formSelector)
  );
  formElements.forEach((formElement) => {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    setEventListeners(formElement, options);
  });
}

// Validation configuration object
enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".modal__submit",
  inactiveButtonClass: ".modal__submit_disabled",
  inputErrorClass: ".form__input_type_error",
  errorClass: ".form__error_visible",
});

export {
  showInputError,
  hideInputError,
  checkInputValidity,
  hasInvalidInput,
  disableButton,
  enableButton,
  toggleButtonState,
  setEventListeners,
  enableValidation,
};
