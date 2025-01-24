import "./index.css";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Popup from "../scripts/components/Popup.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation.js";
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

  /*~----=)>. Card function '<(=----~*/
  const deleteConfirmModal = new PopupWithConfirmation(
    "#deletConfirmationModal"
  );
  deleteConfirmModal.setEventListeners();

  function handleDeleteClick(card) {
    console.log("Card being deleted:", card);
    deleteConfirmModal.setSubmitAction(() => {
      api
        .deleteCard(card.getId())
        .then(() => {
          card.deleteCard();
          deleteConfirmModal.close();
        })
        .catch((error) => {
          console.error(error);
        });
    });
    deleteConfirmModal.open();
  }

  function handleLikeClick(cardId, isLiked) {
    console.log("Card ID:", cardId, "isLiked:", isLiked);
    return isLiked ? api.removeLike(cardId) : api.addLike(cardId);
  }

  function createCard(item) {
    console.log("Card data:", item);
    const card = new Card(
      item,
      cardSelector,
      handleImageClick,
      handleDeleteClick,
      handleLikeClick,
      profile._id
    );
    return card.getCardElement();
  }

  /*~----=)>. Card grid setup '<(=----~*/
  const cardSection = new Section(
    {
      items: [],
      renderer: (item) => {
        cardSection.addItem(createCard(item));
      },
    },
    ".cards__grid"
  );

  /*~----=)>. Get initial cards '<(=----~*/
  api
    .getInitialCards()
    .then((cards) => {
      if (Array.isArray(cards)) {
        cardSection.renderItems(cards);
        cards.reverse().forEach((card) => {
          cardSection.addItem(createCard(card));
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });

  // api.postNewCard().then((response) => {
  //   console.log("API Response:", response);
  // });

  /*~----=)>. Profile modal setup '<(=----~*/
  const profile = new UserInfo({
    nameSelector: ".profile__name",
    jobSelector: ".profile__profession",
    avatarSelector: ".profile__avatar",
  });

  const profilePopup = new PopupWithForm("#profileModal", (formData) => {
    profilePopup.renderLoading(true, "Saving...");
    api
      .patchUserInformation({
        name: formData.name,
        about: formData.description,
      })
      .then((userData) => {
        profile.setUserInfo({
          name: userData.name,
          job: userData.about,
          avatar: userData.avatar,
        });
        profilePopup.close();
      })
      .finally(() => {
        profilePopup.renderLoading(false);
      });
  });

  profilePopup.setEventListeners();

  api.getUserInformation().then((userData) => {
    console.log("Initial user data:", userData);
    profile.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });
  });

  // api.patchUserInformation().then((response) => {
  //   console.log("API Response:", response);
  // });

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
    avatarPopup.renderLoading(true, "Saving...");
    api
      .patchAvatar({
        avatar: formData.avatar,
      })
      .then((userData) => {
        profile.setUserInfo({
          name: userData.name,
          job: userData.about,
          avatar: userData.avatar,
        });
        avatarPopup.close();
      })
      .finally(() => {
        avatarPopup.renderLoading(false);
      });
  });

  avatarPopup.setEventListeners();

  document.getElementById("avatarEditButton").addEventListener("click", () => {
    const userData = profile.getUserInfo();
    avatarPopup.setInputValues({
      avatar: userData.avatar,
    });
    avatarPopup.open();
  });

  /*~----=)>. Preview image modal '<(=----~*/
  const previewPopup = new PopupWithImage("#previewModal");

  function handleImageClick(card) {
    previewPopup.open(card);
  }

  /*~----=)>. Image modal setup '<(=----~*/
  const addImagePopup = new PopupWithForm("#imageModal", (formData) => {
    addImagePopup.renderLoading(true, "Saving...");
    api
      .postNewCard({ name: formData.title, link: formData.link })
      .then((CardData) => {
        cardSection.addItem(createCard(CardData));
        addImagePopup.getForm().reset();
        formValidators["imageForm"].disableButton();
        addImagePopup.close();
      })
      .finally(() => {
        addImagePopup.renderLoading(false);
      });
  });

  addImagePopup.setEventListeners();
  previewPopup.setEventListeners();

  document.getElementById("imageEditButton").addEventListener("click", () => {
    addImagePopup.open();
  });

  // cardSection.renderItems();

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
