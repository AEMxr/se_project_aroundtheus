import "./index.css";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Popup from "../scripts/components/Popup.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js";
import {
  initialCards,
  validationConfig,
  forms,
  inputs,
  cardSelector,
} from "../utils/constants.js";

document.addEventListener("DOMContentLoaded", () => {
  /*~----=)>. API call '<(=----~*/
  const api = new Api({
    baseUrl: "https://around-api.en.tripleten-services.com/v1",
    headers: {
      authorization: "4b5891e6-236c-4083-9664-b0567d688b97",
      "Content-Type": "application/json",
    },
  });

  /*~----=)>. Profile modal setup '<(=----~*/
  const profile = new UserInfo({
    nameSelector: ".profile__name",
    jobSelector: ".profile__profession",
    avatarSelector: ".profile__avatar",
  });

  const profilePopup = new PopupWithForm("#profileModal", (formData) => {
    profile.setUserInfo({
      name: formData.name,
      job: formData.description,
    });
    profilePopup.close();
  });

  profilePopup.setEventListeners();

  api.userInformation().then((userData) => {
    profile.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });
  });

  document.getElementById("profileEditButton").addEventListener("click", () => {
    const userData = profile.getUserInfo();
    profilePopup.setInputValues({
      name: userData.name,
      description: userData.job,
    });
    profilePopup.open();
  });

  /*~----=)>. Avatar modal setup '<(=----~*/

  const avatarPopup = new PopupWithForm("#avatarModal", (formData) => {
    profile.setUserInfo({
      avatar: formData.src,
    });
    avatarPopup.close();
  });

  avatarPopup.setEventListeners();

  document.getElementById("avatarEditButton").addEventListener("click", () => {
    const userData = profile.getUserInfo();
    avatarPopup.setInputValues({
      avatar: userData.link,
    });
    avatarPopup.open();
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
    addImagePopup.open();
  });

  const cardSection = new Section(
    {
      items: [],
      renderer: (item) => {
        cardSection.addItem(createCard(item));
      },
    },
    ".cards__grid"
  );

  // cardSection.renderItems();

  api
    .getInitialCards()
    .then((cards) => {
      cards.forEach((card) => {
        cardSection.addItem(createCard(card));
      });
    })
    .catch((error) => {
      console.error(error);
    });

  // const cardSection = new Section(
  //   {
  //     items: [],
  //     renderer: (item) => {
  //       cardSection.addItem(createCard(item));
  //     },
  //   },
  //   ".cards__grid"
  // );

  // api
  //   .getInitialCards()
  //   .then((response) => {
  //     console.log("API Response:", response);
  //     if (response) {
  //       response.forEach((card) => {
  //         cardSection.addItem(createCard(card));
  //       });
  //     }
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });

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
