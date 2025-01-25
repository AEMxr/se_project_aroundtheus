/*~----=)>. Styles '<(=----~*/
import "./index.css";

/*~----=)>. components '<(=----~*/
import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";

/*~----=)>. Popups '<(=----~*/
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithConfirmation from "../scripts/components/PopupWithConfirmation.js";

/*~----=)>. Utils '<(=----~*/
import FormValidator from "../scripts/components/FormValidator.js";
import Api from "../scripts/components/Api.js";
import { validationConfig, cardSelector } from "../utils/constants.js";

document.addEventListener("DOMContentLoaded", () => {
  const cardsGrid = document.querySelector(".cards__grid");
  setTimeout(() => {
    cardsGrid.style.animation =
      "fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards";
  }, 2000);
  /*~----=)>. API call '<(=----~*/
  const api = new Api({
    baseUrl: "https://around-api.en.tripleten-services.com/v1",
    headers: {
      authorization: "4b5891e6-236c-4083-9664-b0567d688b97",
      "Content-Type": "application/json",
    },
  });

  /*~----=)>. Profile setup '<(=----~*/
  const profile = new UserInfo({
    nameSelector: ".profile__name",
    jobSelector: ".profile__profession",
    avatarSelector: ".profile__avatar",
  });

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

  /*~----=)>. Handlers '<(=----~*/
  const handleSubmit = (request, popup) => {
    return () => {
      popup.renderLoading(true, "Saving...");
      request()
        .then(() => popup.close())
        .finally(() => popup.renderLoading(false));
    };
  };

  function updateUserInfo(userData) {
    profile.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });
  }

  function handleImageClick(card) {
    previewPopup.open(card);
  }

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
    return api.toggleLike(cardId, !isLiked);
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

  function setupModalTrigger(buttonId, popup, getInputValues) {
    document.getElementById(buttonId).addEventListener("click", () => {
      if (getInputValues) {
        const userData = profile.getUserInfo();
        popup.setInputValues(getInputValues(userData));
      }
      popup.open();
    });
  }

  /*~----=)>. Popup initialization '<(=----~*/
  const previewPopup = new PopupWithImage("#previewModal");

  const deleteConfirmModal = new PopupWithConfirmation(
    "#deletConfirmationModal"
  );

  const profilePopup = new PopupWithForm("#profileModal", (formData) => {
    handleSubmit(
      () =>
        api
          .patchUserInformation({
            name: formData.name,
            about: formData.description,
          })
          .then(updateUserInfo),
      profilePopup
    )();
  });

  const avatarPopup = new PopupWithForm("#avatarModal", (formData) => {
    handleSubmit(
      () => api.patchAvatar({ avatar: formData.avatar }).then(updateUserInfo),
      avatarPopup
    )();
  });

  const addImagePopup = new PopupWithForm("#imageModal", (formData) => {
    handleSubmit(
      () =>
        api
          .postNewCard({ name: formData.title, link: formData.link })
          .then((CardData) => {
            cardSection.addItem(createCard(CardData));
            addImagePopup.getForm().reset();
            formValidators["imageForm"].disableButton();
          }),
      addImagePopup
    )();
  });

  /*~----=)>. Initial Data Loading '<(=----~*/
  Promise.all([api.getUserInformation(), api.getInitialCards()])
    .then(([userData, cards]) => {
      updateUserInfo(userData);

      if (Array.isArray(cards)) {
        const reversedCards = cards.reverse();
        reversedCards.forEach((card) => {
          cardSection.addItem(createCard(card));
        });

        // Add this after cards are loaded
        setTimeout(() => {
          const cardsGrid = document.querySelector(".cards__grid");
          cardsGrid.style.animation =
            "fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards";
        }, reversedCards.length * 100 + 500); // Adjust timing based on number of cards
      }
    })
    .catch(console.error);

  /*~----=)>. Popup event listeners '<(=----~*/

  const popups = [
    previewPopup,
    deleteConfirmModal,
    profilePopup,
    avatarPopup,
    addImagePopup,
  ];
  popups.forEach((popup) => popup.setEventListeners());

  /*~----=)>. Button event listeners '<(=----~*/
  setupModalTrigger("profileEditButton", profilePopup, (userData) => ({
    name: userData.name,
    description: userData.job,
  }));

  setupModalTrigger("avatarEditButton", avatarPopup, (userData) => ({
    avatar: userData.avatar,
  }));

  setupModalTrigger("imageEditButton", addImagePopup);
});
