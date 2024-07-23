// card data array
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

//card clone template
const userTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".cards__grid");

// Form for adding new cards
const imageForm = document.querySelector("#imageModal .modal__form");
const imageTitleInput = document.getElementById("title");
const imageLinkInput = document.getElementById("link");

// image modal constants
const imageModal = document.getElementById("imageModal");
const imageModalOpen = document.getElementById("imageEditButton");
const imageModalClose = document.getElementById("imageClose");
const imageTitle = document.querySelector("#title");
const imageLink = document.querySelector("#link");

// profile modal constants
const profileModal = document.getElementById("profileModal");
const profileModalOpen = document.getElementById("profileEditButton");
const profileModalClose = document.getElementById("profileClose");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__profession");

//general modal constants
const page = document.body;
const profileForm = document.querySelector(".modal__form");
const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");

// profile modal open/close functions
function openProfileModal() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileJob.textContent;
  profileModal.classList.add("modal_opened");
  page.classList.add("modal-backdrop");
}

function closeProfileModal() {
  profileModal.classList.remove("modal_opened");
  page.classList.remove("modal-backdrop");
}

// image modal open/close functions - need help with textcontent input field
function openImageModal() {
  nameInput.value = imageTitle.textContent;
  descriptionInput.value = imageLink.textContent;
  imageModal.classList.add("modal_opened");
  page.classList.add("modal-backdrop");
}

function closeImageModal() {
  imageModal.classList.remove("modal_opened");
  page.classList.remove("modal-backdrop");
}

// profile form submission handler
function saveChanges(evt) {
  evt.preventDefault();

  const newName = nameInput.value;
  const newJob = descriptionInput.value;

  profileName.textContent = newName;
  profileJob.textContent = newJob;

  closeProfileModal();
}

//template clone, like, delete
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
    if (card) {
      card.remove();
    }
  });

  return userElement;
}

// image preview
document.addEventListener("DOMContentLoaded", () => {
  const previewModal = document.getElementById("previewModal");
  const previewClose = document.getElementById("previewClose");
  const previewImage = document.getElementById("previewImage");

  document.querySelectorAll(".card__image").forEach((image) => {
    image.addEventListener("click", () => {
      previewImage.src = image.src;

      previewModal.classList.add("modal_opened");
      page.classList.add("modal-backdrop");
    });
  });

  previewClose.addEventListener("click", () => {
    previewModal.classList.remove("modal_opened");
    page.classList.remove("modal-backdrop");
  });
});

// add new card
function addCard(evt) {
  evt.preventDefault();

  const newCardData = {
    name: imageTitleInput.value,
    link: imageLinkInput.value,
  };

  initialCards.unshift(newCardData);

  const cardElement = getCardElement(newCardData);
  if (cardElement instanceof Node) {
    cardsContainer.prepend(cardElement);
  }

  imageTitleInput.value = "";
  imageLinkInput.value = "";

  closeImageModal();
}

// iterate the cards array and appendment
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);

  if (cardElement instanceof Node) {
    cardsContainer.appendChild(cardElement);
  }
});

// profile event listener
profileModalOpen.addEventListener("click", openProfileModal);
profileModalClose.addEventListener("click", closeProfileModal);
profileForm.addEventListener("submit", saveChanges);

// image event listener
imageModalOpen.addEventListener("click", openImageModal);
imageModalClose.addEventListener("click", closeImageModal);

// card array event listener
imageForm.addEventListener("submit", addCard);
