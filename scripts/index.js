import { initialCards, modals, forms, inputs } from "./objects.js";
import { profileName, profileJob, closeButtons } from "./globalVariables.js";
import { closeModal } from "./openCloseFunctions.js";
import { addModalListeners } from "./addModalListenersFunction.js";
import { renderCard } from "./renderCardFunction.js";

document.addEventListener("DOMContentLoaded", () => {
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

  // //fix this so work with forms object
  // const validationForms = {
  //   profile: {
  //     form: document.forms.profileForm,
  //     fieldset: document.forms.profileForm.querySelector("#profileFormFieldset"),
  //     nameLabel: document.forms.profileForm.querySelector("#nameLabel"),
  //     descriptionLabel:
  //       document.forms.profileForm.querySelector("#descriptionLabel"),
  //     input: document.forms.profileForm.querySelector(".modal__input"),
  //     nameinput: document.forms.profileForm.querySelector("#name"),
  //     descriptioninput: document.forms.profileForm.querySelector("#description"),
  //     button: document.forms.profileForm.querySelector("button"),
  //     nameError: document.forms.profileForm.querySelector("#nameError"),
  //     descriptionError:
  //       document.forms.profileForm.querySelector("#descriptionError"),
  //   },
  //   image: {
  //     form: document.forms.imageForm,
  //     fieldset: document.forms.imageForm.querySelector("fieldset"),
  //     label: document.forms.imageForm.querySelector("label"),
  //     input: document.forms.imageForm.querySelector("input"),
  //     button: document.forms.imageForm.querySelector("button"),
  //   },
  // };

  // const errorMessages = {
  //   generic: `Please fill out this field`,
  //   textInput: `Please lengthen the text to 2 characters or more. You are currently using ${inputs.value.length} character.`,
  //   link: `Please enter a web address`,
  // };

  // /*~----=)>. Show error message '<(=----~*/

  // function showError(inputElement, errorMessage) {}
  // //3 & 4

  // /*~----=)>. key press listener '<(=----~*/
  // document.addEventListener("keydown", (evt) => {
  //   Object.values(inputs).forEach((inputGroup) => {
  //     Object.values(inputGroup).forEach((input) => {
  //       if (input instanceof HTMLInputElement) {
  //         console.log(input.validity.valid);
  //       }
  //     });
  //   });
  // });

  // /*~----=)>. Validation configuration object '<(=----~*/
  // enableValidation({
  //   formSelector: ".popup__form",
  //   inputSelector: ".popup__input",
  //   submitButtonSelector: ".popup__button",
  //   inactiveButtonClass: "popup__button_disabled",
  //   inputErrorClass: "popup__input_type_error",
  //   errorClass: "popup__error_visible",
  // });
});
