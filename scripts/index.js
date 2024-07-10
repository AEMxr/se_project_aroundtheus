// open and close modal events
const modal = document.getElementById("modalEdit");
const modalOpen = document.getElementById("editButton");
const modalClose = document.getElementsByClassName("modal__close")[0];

modalOpen.addEventListener("click", function (event) {
  modal.style.display = "block";
});

modalClose.addEventListener("click", function (event) {
  modal.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

//***Save submit button event***

// find the form in the DOM
const profileForm = document.querySelector(".modal__form");

// find the form fields in the DOM
const nameInput = document.getElementById("name");
const jobInput = document.getElementById("description");

// find the profile elements in the DOM
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__profession");

// the form submission handler. Note that its name
// starts with a verb and concisely describes what it does
function saveChanges(evt) {
  evt.preventDefault();

  // get the values of each field from the value property
  // of the corresponding input element
  const newName = nameInput.value;
  const newJob = jobInput.value;

  // insert new values into the textContent property of the
  // corresponding profile elements
  profileName.textContent = newName;
  profileJob.textContent = newJob;

  // Close the modal
  modal.style.display = "none";
}

// connect the handler to the form:
// it will watch the submit event
profileForm.addEventListener("submit", saveChanges);

//*** Card template clone function and heart button function ***
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

const userTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".cards__grid");

function getCardElement(data) {
  // Clone template with all its content and store it into a card element variable
  let userElement = userTemplate.cloneNode(true);

  // Access card title and image and store in variables
  let cardImage = userElement.querySelector(".card__image-size");
  let cardLabel = userElement.querySelector(".card__label");
  let cardHeart = userElement.querySelector(".card__heart");

  // Check if cardImage and cardLabel are correctly selected
  if (!cardImage || !cardLabel || !cardHeart) {
    console.error(
      "Template cloning failed: cardImage or cardLabel is not defined"
    );
    return null;
  }

  // Set path to image to the link field
  cardImage.src = data.link;

  // Set the image alt text to name field
  cardImage.alt = data.name;

  // Set card title to name field
  cardLabel.textContent = data.name;

  cardHeart.addEventListener("click", function () {
    if (
      cardHeart.style.backgroundImage.includes(
        "../images/vector-imgs/heart.svg"
      )
    ) {
      cardHeart.style.backgroundImage =
        'url("../images/vector-imgs/heartFilled.svg")';
    } else {
      cardHeart.style.backgroundImage =
        'url("../images/vector-imgs/heart.svg")';
    }
  });

  // Return the HTML element with filled data
  return userElement;
}

// Iterate the cards array using forEach with a function expression
initialCards.forEach(function (cardData) {
  // Run getCardElement() function on the card object to create the HTML element
  let cardElement = getCardElement(cardData);

  // Log card element
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
