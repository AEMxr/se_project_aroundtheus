export const apiConfig = {
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "4b5891e6-236c-4083-9664-b0567d688b97",
    "Content-Type": "application/json",
  },
};

export const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

export const selectors = {
  cardTemplate: "#card-template",
  profile: {
    name: ".profile__name",
    job: ".profile__profession",
    avatar: ".profile__avatar",
  },
  buttons: {
    profileEdit: "#profileEditButton",
    avatarEdit: "#avatarEditButton",
    imageEdit: "#imageEditButton",
  },
  forms: {
    profile: "#profileModal",
    avatar: "#avatarModal",
    image: "#imageModal",
  },
  modals: {
    preview: "#previewModal",
    delete: "#deletConfirmationModal",
  },
  cardsGrid: ".cards__grid",
};

export const buttonActions = {
  profileEditButton: "profileForm",
  avatarEditButton: "avatarEdit",
  imageEditButton: "imageForm",
};

export const forms = {
  profile: document.forms.profileForm,
  image: document.forms.imageForm,
};

export const inputs = {
  profile: {
    name: document.getElementById("name"),
    description: document.getElementById("description"),
  },
  image: {
    title: document.getElementById("title"),
    link: document.getElementById("link"),
  },
};
