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
  profile,
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
    profilePopup.close();
  });

  profilePopup.setEventListeners();

  document.getElementById("profileEditButton").addEventListener("click", () => {
    profile.getUserInfo();
    profileForm.resetValidation();
    profilePopup.open();
  });

  /*~----=)>. Preview image modal '<(=----~*/
  const previewPopup = new PopupWithImage("#previewModal");

  function handleImageClick(card) {
    previewPopup.open(card);
  }

  /*~----=)>. Image modal setup '<(=----~*/
  const addImagePopup = new PopupWithForm("#imageModal", (formData) => {
    inputs.image.title.textContent = formData.name;
    inputs.image.link.link = formData.link;

    const newCardData = {
      name: inputs.image.title.value,
      link: inputs.image.link.value,
    };

    const newCard = new Card(newCardData, cardSelector, handleImageClick);
    const cardElement = newCard.getCardElement();
    cardSection.addItem(cardElement);
    addImagePopup.close();
    addImageForm.disableButton();
  });

  addImagePopup.setEventListeners();
  previewPopup.setEventListeners();

  document.getElementById("imageEditButton").addEventListener("click", () => {
    inputs.image.title.value = inputs.image.title.textContent;
    inputs.image.link.value = inputs.image.link.textContent;
    addImageForm.resetValidation();
    addImagePopup.open();
  });

  const cardSection = new Section(
    {
      items: initialCards,
      renderer: (item) => {
        const card = new Card(item, cardSelector, handleImageClick);
        const cardElement = card.getCardElement();
        cardSection.addItem(cardElement);
      },
    },
    ".cards__grid"
  );

  cardSection.renderItems();

  /*~----=)>. Validation class call '<(=----~*/
  const profileForm = new FormValidator(validationConfig, forms.profile);
  profileForm.enableValidation();

  const addImageForm = new FormValidator(validationConfig, forms.image);
  addImageForm.enableValidation();
});
