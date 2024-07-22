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

//image modal constants
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

// image modal open/close functions
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

// Function to add new card
function addCard(evt) {
  evt.preventDefault();

  const newCardData = {
    name: imageTitleInput.value,
    link: imageLinkInput.value,
  };

  // Add new card to the array
  initialCards.push(newCardData);

  // Create card element and add to the container
  const cardElement = getCardElement(newCardData);
  if (cardElement instanceof Node) {
    cardsContainer.appendChild(cardElement);
  }

  // Clear input fields
  imageTitleInput.value = "";
  imageLinkInput.value = "";

  // Close the modal
  closeImageModal();
}

// Listen for form submission
imageForm.addEventListener("submit", addCard);

// profile event listener
profileModalOpen.addEventListener("click", openProfileModal);
profileModalClose.addEventListener("click", closeProfileModal);
profileForm.addEventListener("submit", saveChanges);

// image event listener
imageModalOpen.addEventListener("click", openImageModal);
imageModalClose.addEventListener("click", closeImageModal);

//template clone and card__heart like button
function getCardElement(data) {
  const userElement = userTemplate.cloneNode(true);

  const cardImage = userElement.querySelector(".card__image-size");
  const cardLabel = userElement.querySelector(".card__label");
  const cardHeart = userElement.querySelector(".card__heart");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardLabel.textContent = data.name;

  cardHeart.addEventListener("click", () => {
    cardHeart.classList.toggle("card__heart_active");
  });

  return userElement;
}

// iterate the cards array and appendment
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);

  if (cardElement instanceof Node) {
    cardsContainer.appendChild(cardElement);
  }
});
