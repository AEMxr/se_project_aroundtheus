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

/*~----=)>. Template and containers '<(=----~*/
const userTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".cards__grid");

/*~----=)>. Profile elements '<(=----~*/
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__profession");

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

/*~----=)>. Open/close modal functions '<(=----~*/
function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

// /*~----=)>. Universal function for rendering cards '<(=----~*/
// function renderCard(item, method = "prepend") {
//   const cardElement = getCardElement(item);
//   cardsContainer[method](cardElement);
// }

/*~----=)>. Universal close button handler '<(=----~*/
const closeButtons = document.querySelectorAll(".modal__close");

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

/*~----=)>. Universal function for rendering cards '<(=----~*/
function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  cardsContainer[method](cardElement);
}

/*~----=)>. Event listeners '<(=----~*/
function addModalListeners(modal, openButton, openCallback) {
  openButton.addEventListener("click", () => {
    openCallback && openCallback();
    openModal(modal);
  });
}

// add verification event listeners
const formElement = document.querySelector(".modal__form");
const formInput = formElement.querySelector(".modal__input");
document.forms;
const formError = formElement.querySelector(`.${formInput.id}-error`);

formInput.addEventListener("input", function (evt) {
  console.log(evt.target.validity.valid);
});

const showInputError = (formElement, inputElement, errorMessage) => {
  // Find the error message element inside the very function
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // The rest remains unchanged
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("form__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  // Find the error message element
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // The rest remains unchanged
  inputElement.classList.remove("form__input_type_error");
  errorElement.classList.remove("form__input-error_active");
  errorElement.textContent = "";
};

formElement.addEventListener("submit", function (evt) {
  // Cancel the browser default action, so that clicking on the submit button won't refresh the page
  evt.preventDefault();
});

const setEventListeners = (formElement) => {
  // Find all the form fields and make an array of them
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  // Find the submit button in the current form
  const buttonElement = formElement.querySelector(".form__submit");
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);

      // Call the toggleButtonState() and pass an array of fields and the button to it
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// Change checkInputValidity() so that it has formElement and inputElement
// parameters instead of taking corresponding variables from the outer scope

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // The parameter of showInputError() is now a form,
    // which contains a field to be checked
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // The same for hideInputError(), Its parameter is now a form,
    // which contains a field to be checked
    hideInputError(formElement, inputElement);
  }
};

const enableValidation = () => {
  // It will find all forms with the specified class in DOM, and
  // make an array from them using the Array.from() method
  const formList = Array.from(document.querySelectorAll(".form"));

  // Iterate over the resulting array
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      // Cancel default behavior for each form
      evt.preventDefault();
    });

    // Call the setEventListeners() function for each form,
    // taking a form element as an argument
    setEventListeners(formElement);
  });
};

// Call the function
enableValidation();

// The function takes an array of fields

const hasInvalidInput = (inputList) => {
  // iterate over the array using the some() method
  return inputList.some((inputElement) => {
    // If the field is invalid, the callback will return true.
    // The method will then stop, and hasInvalidInput() function will return true
    // hasInvalidInput returns true

    return !inputElement.validity.valid;
  });
};

// The function takes an array of input fields
// and the button element, whose state you need to change

const toggleButtonState = (inputList, buttonElement) => {
  // If there is at least one invalid input
  if (hasInvalidInput(inputList)) {
    // make the button inactive
    buttonElement.classList.add("form__submit_inactive");
  } else {
    // otherwise, make it active
    buttonElement.classList.remove("form__submit_inactive");
  }
};

/*~----=)>. Profile modal setup '<(=----~*/
addModalListeners(
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
addModalListeners(modals.image, document.getElementById("imageEditButton"));

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

/*~----=)>. Initial card rendering '<(=----~*/
initialCards.forEach((cardData) => {
  renderCard(cardData, "append");
});
