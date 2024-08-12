// import { loadOut } from "./loadOut.js";
import { enableValidation } from "./validate.js";

document.addEventListener("DOMContentLoaded", () => {
  /*~----=)>. Body and modal functionality '<(=----~*/
  // loadOut();

  /*~----=)>. Card data array '<(=----~*/
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
  const userTemplate = document.querySelector("#card-template").content;
  const cardsContainer = document.querySelector(".cards__grid");

  /*~----=)>. Profile elements '<(=----~*/
  const profileName = document.querySelector(".profile__name");
  const profileJob = document.querySelector(".profile__profession");

  /*~----=)>. Universal close button handler '<(=----~*/
  const closeButtons = document.querySelectorAll(".modal__close");

  /*~----=)>. Modal Submit reference '<(=----~*/
  const modalSubmit = document.querySelector(".modal__submit");

  /*~----=)>. Open/close modal functions '<(=----~*/
  function openModal(modal) {
    modal.classList.add("modal_opened");
    document.addEventListener("keydown", handleEscClose);

    document.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("modal_opened")) {
        closeModal(evt.target);
      }
    });
  }

  function closeModal(modal) {
    modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", handleEscClose);

    document.removeEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("modal_opened")) {
        closeModal(evt.target);
      }
    });
  }

  /*~----=)>. Universal close modal overlay event handler '<(=----~*/
  // function universalClose() {
  //   // Close modal when clicking outside of the modal
  //   document.addEventListener("mousedown", (evt) => {
  //     if (evt.target.classList.contains("modal_opened")) {
  //       closeModal(evt.target);
  //     }
  //   });
  // }

  // Function to handle closing modal on 'Esc' key
  function handleEscClose(evt) {
    if (evt.key === "Escape" || evt.key === "Esc") {
      const openModal = document.querySelector(".modal_opened");
      if (openModal) {
        closeModal(openModal);
      }
    }
  }

  /*~----=)>. Modal opener '<(=----~*/
  function addOpenModalListeners(modal, openButton, openCallback) {
    openButton.addEventListener("click", () => {
      openCallback && openCallback();
      openModal(modal);
    });
  }

  /*~----=)>. Card creation '<(=----~*/
  function getCardElement(data) {
    const userElement = userTemplate.cloneNode(true);
    const cardImage = userElement.querySelector(".card__image");
    const cardLabel = userElement.querySelector(".card__label");
    const cardHeart = userElement.querySelector(".card__heart");
    const cardDelete = userElement.querySelector(".card__delete");

    const previewImage = document.getElementById("previewImage");
    const imageViewTitle = document.getElementById("imageViewTitle");

    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardLabel.textContent = data.name;

    cardHeart.addEventListener("click", () => {
      cardHeart.classList.toggle("card__heart_active");
    });

    cardDelete.addEventListener("click", () => {
      const card = cardDelete.closest(".card");
      card && card.remove();
    });

    cardImage.addEventListener("click", () => {
      previewImage.src = cardImage.src;
      previewImage.alt = cardImage.alt;
      imageViewTitle.textContent = data.name;
      openModal(modals.preview);
    });

    return userElement;
  }

  /*~----=)>. Universal function for rendering cards '<(=----~*/
  function renderCard(item, method = "prepend") {
    const cardElement = getCardElement(item);
    cardsContainer[method](cardElement);
  }

  /*~----=)>. Close functionality '<(=----~*/
  // universalClose();

  closeButtons.forEach((button) => {
    const popup = button.closest(".modal");
    button.addEventListener("click", () => closeModal(popup));
  });

  /*~----=)>. Profile modal setup '<(=----~*/
  addOpenModalListeners(
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
  addOpenModalListeners(
    modals.image,
    document.getElementById("imageEditButton")
  );

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

  // /*~----=)>. Validation function '<(=----~*/
  // enableValidation();
});

//Thanks for all your help!!!
