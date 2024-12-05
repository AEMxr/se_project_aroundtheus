import "./index.css";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Popup from "../scripts/components/Popup.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import {
  initialCards,
  validationConfig,
  forms,
  inputs,
  cardSelector,
} from "../utils/constants.js";

document.addEventListener("DOMContentLoaded", () => {
  /*~----=)>. Profile modal setup '<(=----~*/
  const profile = new UserInfo({
    nameSelector: ".profile__name",
    jobSelector: ".profile__profession",
  });

  const profilePopup = new PopupWithForm("#profileModal", (formData) => {
    profile.setUserInfo({
      name: formData.name,
      job: formData.description,
    });
    profilePopup.getForm().reset();
    formValidators["profileForm"].disableButton();
    profilePopup.close();
  });

  profilePopup.setEventListeners();

  document.getElementById("profileEditButton").addEventListener("click", () => {
    const userData = profile.getUserInfo();
    profilePopup.setInputValues({
      name: userData.name,
      description: userData.job,
    });
    profilePopup.open();
  });

  /*~----=)>. Preview image modal '<(=----~*/
  const previewPopup = new PopupWithImage("#previewModal");

  function handleImageClick(card) {
    previewPopup.open(card);
  }

  function createCard(item) {
    const card = new Card(item, cardSelector, handleImageClick);
    return card.getCardElement();
  }

  /*~----=)>. Image modal setup '<(=----~*/
  const addImagePopup = new PopupWithForm("#imageModal", (formData) => {
    const newCardData = {
      name: formData.title,
      link: formData.link,
    };

    cardSection.addItem(createCard(newCardData));
    addImagePopup.getForm().reset();
    formValidators["imageForm"].disableButton();
    addImagePopup.close();
  });

  addImagePopup.setEventListeners();
  previewPopup.setEventListeners();

  document.getElementById("imageEditButton").addEventListener("click", () => {
    const addImageForm = addImagePopup.getForm();
    addImagePopup.open();
    addImageForm.reset();
  });

  const cardSection = new Section(
    {
      items: initialCards,
      renderer: (item) => {
        cardSection.addItem(createCard(item));
      },
    },
    ".cards__grid"
  );

  cardSection.renderItems();

  /*~----=)>. Validation class call '<(=----~*/
  const formValidators = {};

  const enableValidation = (validationConfig) => {
    const formList = Array.from(
      document.querySelectorAll(validationConfig.formSelector)
    );
    formList.forEach((formElement) => {
      const validator = new FormValidator(validationConfig, formElement);
      const formName = formElement.getAttribute("name");

      formValidators[formName] = validator;
      validator.enableValidation();
    });
  };

  enableValidation(validationConfig);
});
