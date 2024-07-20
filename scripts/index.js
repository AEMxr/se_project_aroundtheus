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

//save submit button event
const profileForm = document.querySelector(".modal__form");
const nameInput = document.getElementById("name");
const jobInput = document.getElementById("description");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__profession");

// open and close modal events
const page = document.body;
const modal = document.getElementById("modalEdit");
const editModalOpen = document.getElementById("editButton");
const editModalClose = document.getElementsByClassName("modal__close")[0];

function openProfileModal() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  modal.classList.add("modal_opened");
  page.classList.add("modal-backdrop");
}

function closeProfileModal() {
  modal.classList.remove("modal_opened");
  page.classList.remove("modal-backdrop");
}

editModalOpen.addEventListener("click", openProfileModal);
editModalClose.addEventListener("click", closeProfileModal);

// the form submission handler
function saveChanges(evt) {
  evt.preventDefault();

  const newName = nameInput.value;
  const newJob = jobInput.value;

  profileName.textContent = newName;
  profileJob.textContent = newJob;

  closeProfileModal();
}

// connect the handler to the form
profileForm.addEventListener("submit", saveChanges);

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

  console.log("Appending card element:", cardElement);

  // Ensure the returned element is a node before appending
  if (cardElement instanceof Node) {
    cardsContainer.appendChild(cardElement);
  } else {
    console.error(
      "Returned card element is not a valid DOM node:",
      cardElement
    );
  }
});

console.log("All cards have been processed.");
