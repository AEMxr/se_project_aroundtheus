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

//fix this to work with validationForms
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

/*~----=)>. Validation error messages '<(=----~*/
// const errorMessages = {
//   generic: `Please fill out this field`,
//   textInput: `Please lengthen the text to 2 characters or more. You are currently using ${inputs.value.length} character.`,
//   link: `Please enter a web address`,
// };

/*~----=)>. Validation configuration object '<(=----~*/
// enableValidation({
//   formSelector: ".popup__form",
//   inputSelector: ".popup__input",
//   submitButtonSelector: ".popup__button",
//   inactiveButtonClass: "popup__button_disabled",
//   inputErrorClass: "popup__input_type_error",
//   errorClass: "popup__error_visible",
// });

export { initialCards, modals, forms, inputs };
