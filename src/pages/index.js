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
  /*~----=)>. API call '<(=----~*/
  const api = new Api({
    baseUrl: "https://around-api.en.tripleten-services.com/v1",
    headers: {
      authorization: "4b5891e6-236c-4083-9664-b0567d688b97",
      "Content-Type": "application/json",
    },
  });

  /*~----=)>. Form handler '<(=----~*/
  const handleSubmit = (request, popup) => {
    return () => {
      popup.renderLoading(true, "Saving...");
      request()
        .then(() => popup.close())
        .finally(() => popup.renderLoading(false));
    };
  };

  /*~----=)>. Profile setup '<(=----~*/
  const profile = new UserInfo({
    nameSelector: ".profile__name",
    jobSelector: ".profile__profession",
    avatarSelector: ".profile__avatar",
  });

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
          .then((userData) => {
            profile.setUserInfo({
              name: userData.name,
              job: userData.about,
              avatar: userData.avatar,
            });
          }),
      profilePopup
    )();
  });

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

  /*~----=)>. Popup event listeners '<(=----~*/
  previewPopup.setEventListeners();
  deleteConfirmModal.setEventListeners();
  profilePopup.setEventListeners();
  avatarPopup.setEventListeners();
  addImagePopup.setEventListeners();

  /*~----=)>. Button event listeners '<(=----~*/
  document.getElementById("profileEditButton").addEventListener("click", () => {
    const userData = profile.getUserInfo();
    profilePopup.setInputValues({
      name: userData.name,
      description: userData.job,
    });
    profilePopup.open();
  });

  document.getElementById("avatarEditButton").addEventListener("click", () => {
    const userData = profile.getUserInfo();
    avatarPopup.setInputValues({
      avatar: userData.avatar,
    });
    avatarPopup.open();
  });

  document.getElementById("imageEditButton").addEventListener("click", () => {
    addImagePopup.open();
  });

  /*~----=)>. Card function '<(=----~*/

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
      console.log("Initial cards data:", cards);
      if (Array.isArray(cards)) {
        cardSection.renderItems(cards);
        cards.reverse().forEach((card) => {
          console.log("Individual card data:", card);
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

  /*~----=)>. Avatar modal setup '<(=----~*/

  /*~----=)>. Preview image modal '<(=----~*/

  function handleImageClick(card) {
    previewPopup.open(card);
  }

  /*~----=)>. Image modal setup '<(=----~*/

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
