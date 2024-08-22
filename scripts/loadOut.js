import { initialCards, modals, forms, inputs } from "./objects.js";
import { profileName, profileJob, closeButtons } from "./globalVariables.js";
import { closeModal, universalClose } from "./openCloseFunctions.js";
import { addModalListeners } from "./addModalListenersFunction.js";
import { renderCard } from "./renderCardFunction.js";

function loadOut() {
  /*~----=)>. Close functionality '<(=----~*/
  universalClose();

  closeButtons.forEach((button) => {
    const popup = button.closest(".modal");
    button.addEventListener("click", () => closeModal(popup));
  });

  /*~----=)>. Profile modal setup '<(=----~*/
  addModalListeners(
    modals.profile,
    document.getElementById("profileEditButton"),
    () => {
      inputs.profile.name.value = profileName.textContent;
      inputs.profile.description.value = profileJob.textContent;
    }
  );

  forms.profile.addEventListener("submit", (evt) => {
    evt.preventDefault();
    profileName.textContent = inputs.profile.name.value;
    profileJob.textContent = inputs.profile.description.value;
    closeModal(modals.profile);
  });

  /*~----=)>. Image modal setup '<(=----~*/
  addModalListeners(modals.image, document.getElementById("imageEditButton"));

  forms.image.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const newCardData = {
      name: inputs.image.title.value,
      link: inputs.image.link.value,
    };

    renderCard(newCardData, "prepend");
    evt.target.reset();
    closeModal(modals.image);
  });

  /*~----=)>. Initial card rendering '<(=----~*/
  initialCards.forEach((cardData) => {
    renderCard(cardData, "append");
  });
}

export { loadOut };

class FormValidator {
  constructor(settings, formElement) {}
}

/*~----=)>. Function to show input error message '<(=----~*/
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

/*~----=)>. Function to hide input error message '<(=----~*/
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

/*~----=)>. Function to check input validity and show/hide error messages accordingly '<(=----~*/
function checkInputValidity(formElement, inputElement, options) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, options);
  } else {
    hideInputError(formElement, inputElement, options);
  }
}

/*~----=)>. Function to check if any input in the list is invalid '<(=----~*/
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => !inputElement.validity.valid);
}

/*~----=)>. Function to disable the submit button '<(=----~*/
function disableButton(buttonElement, { inactiveButtonClass }) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
}

/*~----=)>. Function to enable the submit button '<(=----~*/
function enableButton(buttonElement, { inactiveButtonClass }) {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = false;
}

/*~----=)>. Function to toggle the button state based on input validity '<(=----~*/
function toggleButtonState(inputElements, submitButton, options) {
  if (hasInvalidInput(inputElements)) {
    disableButton(submitButton, options);
  } else {
    enableButton(submitButton, options);
  }
}

/*~----=)>. Function to set event listeners on form inputs '<(=----~*/
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

/*~----=)>. Function to enable validation on all specified forms '<(=----~*/
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

/*~----=)>. Validation configuration object '<(=----~*/
enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".modal__submit",
  inactiveButtonClass: "modal__submit_disabled",
  inputErrorClass: "form__input-error",
  errorClass: "form__input-error_visible",
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
