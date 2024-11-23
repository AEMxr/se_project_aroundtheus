import "./index.css";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import Popup from "../scripts/components/Popup.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
// import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Section from "../scripts/components/Section.js";

document.addEventListener("DOMContentLoaded", () => {
  const initialCards = [
    {
      name: "Yosemite Valley",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    },
    {
      name: "Lake Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    },
    {
      name: "Bald Mountains",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    },
    {
      name: "Latemar",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    },
    {
      name: "Vanoise National Park",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    },
    {
      name: "Lago di Braies",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
    },
  ];

  /*~----=)>. Validation configuration object '<(=----~*/
  const validationConfig = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".modal__submit",
    inactiveButtonClass: "modal__submit_disabled",
    inputErrorClass: "form__input-error",
    errorClass: "form__input-error_visible",
  };

  /*~----=)>. Modals and forms '<(=----~*/
  const modals = {
    profile: document.getElementById("profileModal"),
    image: document.getElementById("imageModal"),
    preview: document.getElementById("previewModal"),
  };

  const forms = {
    profile: document.forms.profileForm,
    image: document.forms.imageForm,
  };

  const inputs = {
    profile: {
      name: document.getElementById("name"),
      description: document.getElementById("description"),
    },
    image: {
      title: document.getElementById("title"),
      link: document.getElementById("link"),
    },
  };

  /*~----=)>. Template and containers '<(=----~*/
  const cardsContainer = document.querySelector(".cards__grid");

  /*~----=)>. Profile elements '<(=----~*/
  const profileName = document.querySelector(".profile__name");
  const profileJob = document.querySelector(".profile__profession");

  /*~----=)>. Add Image elements '<(=----~*/
  const imageTitle = document.querySelector(".card__label");
  const imageLink = document.querySelector(".profile__profession");

  /*~----=)>. Universal close button handler '<(=----~*/
  const closeButtons = document.querySelectorAll(".modal__close");

  /*~----=)>. Preview image modal '<(=----~*/
  const previewImage = document.getElementById("previewImage");
  const imageViewTitle = document.getElementById("imageViewTitle");

  // /*~----=)>. Cards grid for initial card render '<(=----~*/
  // const cardsGrid = document.querySelector(".cards__grid");

  /*~----=)>. Open/close modal functions '<(=----~*/
  function openModal(modal) {
    modal.classList.add("modal_opened");
    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("mousedown", handleOverlayClose);
  }

  function closeModal(modal) {
    modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", handleEscClose);
    document.removeEventListener("mousedown", handleOverlayClose);
  }

  /*~----=)>. Universal close modal overlay event handler '<(=----~*/
  function handleOverlayClose(evt) {
    // Close modal when clicking outside of the modal
    if (evt.target.classList.contains("modal_opened")) {
      closeModal(evt.target);
    }
  }

  // Function to handle closing modal on 'Esc' key
  function handleEscClose(evt) {
    if (evt.key === "Escape" || evt.key === "Esc") {
      const openModal = document.querySelector(".modal_opened");
      if (openModal) {
        closeModal(openModal);
      }
    }
  }

  /*~----=)>. Close functionality '<(=----~*/
  closeButtons.forEach((button) => {
    const popup = button.closest(".modal");
    button.addEventListener("click", () => closeModal(popup));
  });

  /*~----=)>. Modal opener '<(=----~*/
  function addOpenModalListeners({ modal, openButton, openCallback }) {
    openButton.addEventListener("click", () => {
      openCallback && openCallback();
      openModal(modal);
    });
  }

  /*~----=)>. Profile modal setup '<(=----~*/

  const profilePopup = new PopupWithForm("#profileModal", (formData) => {
    profileName.textContent = formData.name;
    profileJob.textContent = formData.description;
    profilePopup.close();
  });
  profilePopup.setEventListeners();

  document.getElementById("profileEditButton").addEventListener("click", () => {
    inputs.profile.name.value = profileName.textContent;
    inputs.profile.description.value = profileJob.textContent;
    profileForm.resetValidation();
    profilePopup.open();
  });

  // addOpenModalListeners(
  //   modals.profile,
  //   document.getElementById("profileEditButton"),
  //   () => {
  //     inputs.profile.name.value = profileName.textContent;
  //     inputs.profile.description.value = profileJob.textContent;
  //     profileForm.resetValidation();
  //   }
  // );

  // forms.profile.addEventListener("submit", (evt) => {
  //   evt.preventDefault();
  //   profileName.textContent = inputs.profile.name.value;
  //   profileJob.textContent = inputs.profile.description.value;
  //   closeModal(modals.profile);
  //   profileForm.disableButton();
  // });

  /*~----=)>. Universal function for rendering cards '<(=----~*/
  function renderCard(cardData, method = "prepend") {
    const card = new Card(cardData, "#card-template", handlePreviewModal);
    const cardElement = card.getCardElement();
    if (method === "prepend") {
      cardsContainer.prepend(cardElement);
    } else {
      cardsContainer.append(cardElement);
    }
  }

  /*~----=)>. Image modal setup '<(=----~*/

  const addImagePopup = new PopupWithForm("#imageModal", (formData) => {
    inputs.image.title.textContent = formData.name;
    inputs.image.link.link = formData.link;

    const newCardData = {
      name: inputs.image.title.value,
      link: inputs.image.link.value,
    };
    const newCard = new Section({ newCardData, renderCard }, "#card-template");
    newCard.renderItems();
    // renderCard(newCardData);
    // evt.target.reset();
    addImagePopup.close();
    addImageForm.disableButton();
  });
  addImagePopup.setEventListeners();

  document.getElementById("imageEditButton").addEventListener("click", () => {
    inputs.image.title.value = inputs.image.title.textContent;
    inputs.image.link.value = inputs.image.link.textContent;
    addImageForm.resetValidation();
    addImagePopup.open();
  });

  // addOpenModalListeners(
  //   modals.image,
  //   document.getElementById("imageEditButton")
  // );

  // forms.image.addEventListener("submit", (evt) => {
  //   evt.preventDefault();
  //   const newCardData = {
  //     name: inputs.image.title.value,
  //     link: inputs.image.link.value,
  //   };

  // renderCard(newCardData);
  // evt.target.reset();
  // closeModal(modals.image);
  // addImageForm.disableButton();
  // });

  /*~----=)>. Preview image modal '<(=----~*/
  function handlePreviewModal(card) {
    previewImage.src = card.link;
    previewImage.alt = card.name;
    imageViewTitle.textContent = card.name;
    openModal(modals.preview);
  }

  /*~----=)>. Initiate initial cards object '<(=----~*/
  initialCards.forEach((cardData) => {
    renderCard(cardData, "append");
  });

  /*~----=)>. Validation class call '<(=----~*/
  const profileForm = new FormValidator(validationConfig, forms.profile);
  profileForm.enableValidation();

  const addImageForm = new FormValidator(validationConfig, forms.image);
  addImageForm.enableValidation();
});
