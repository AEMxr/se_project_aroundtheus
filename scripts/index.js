// Card data array
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

// Template and containers
const userTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".cards__grid");

// Modals and forms
const modals = {
  profile: document.getElementById("profileModal"),
  image: document.getElementById("imageModal"),
  preview: document.getElementById("previewModal"),
};

const forms = {
  profile: document.querySelector("#profileModal .modal__form"),
  image: document.querySelector("#imageModal .modal__form"),
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

// Profile elements
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__profession");

// Open/close modal functions
function openModal(modal) {
  modal.classList.add("modal_opened");
  document.body.classList.add("modal-backdrop");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.body.classList.remove("modal-backdrop");
}

// Event listeners
function addModalListeners(modal, openButton, closeButton, openCallback) {
  openButton.addEventListener("click", () => {
    openCallback && openCallback();
    openModal(modal);
  });
  closeButton.addEventListener("click", () => closeModal(modal));
}

// Profile modal setup
addModalListeners(
  modals.profile,
  document.getElementById("profileEditButton"),
  document.getElementById("profileClose"),
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

// Image modal setup
addModalListeners(
  modals.image,
  document.getElementById("imageEditButton"),
  document.getElementById("imageClose")
);

forms.image.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const newCardData = {
    name: inputs.image.title.value,
    link: inputs.image.link.value,
  };
  initialCards.unshift(newCardData);
  cardsContainer.prepend(getCardElement(newCardData));
  inputs.image.title.value = "";
  inputs.image.link.value = "";
  closeModal(modals.image);
});

// Card creation
function getCardElement(data) {
  const userElement = userTemplate.cloneNode(true);
  const cardImage = userElement.querySelector(".card__image");
  const cardLabel = userElement.querySelector(".card__label");
  const cardHeart = userElement.querySelector(".card__heart");
  const cardDelete = userElement.querySelector(".card__delete");

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
    document.getElementById("previewImage").src = cardImage.src;
    openModal(modals.preview);
  });

  return userElement;
}

document
  .getElementById("previewClose")
  .addEventListener("click", () => closeModal(modals.preview));

// Initial card rendering
initialCards.forEach((cardData) => {
  cardsContainer.appendChild(getCardElement(cardData));
});
