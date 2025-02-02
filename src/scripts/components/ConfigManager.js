export default class ConfigManager {
  constructor() {
    this.apiConfig = {
      baseUrl: "https://around-api.en.tripleten-services.com/v1",
      headers: {
        authorization: "4b5891e6-236c-4083-9664-b0567d688b97",
        "Content-Type": "application/json",
      },
    };

    this.validationConfig = {
      formSelector: ".modal__form",
      inputSelector: ".modal__input",
      submitButtonSelector: ".modal__button",
      inactiveButtonClass: "modal__button_disabled",
      inputErrorClass: "modal__input_type_error",
      errorClass: "modal__error_visible",
    };

    this.selectors = {
      cardTemplate: "#card-template",
      profileName: ".profile__name",
      profileJob: ".profile__profession",
      profileAvatar: ".profile__avatar",
      cardsGrid: ".cards__grid",
      profileEditButton: "#profileEditButton",
      avatarEditButton: "#avatarEditButton",
      imageEditButton: "#imageEditButton",
      profileForm: "#profileModal",
      avatarForm: "#avatarModal",
      imageForm: "#imageModal",
      previewModal: "#previewModal",
      deleteConfirmModal: "#deletConfirmationModal",
    };

    this.buttonConfig = {
      profileEditButton: "profileForm",
      avatarEditButton: "avatarEdit",
      imageEditButton: "imageForm",
    };
  }

  getApiConfig() {
    return this.apiConfig;
  }

  getValidationConfig() {
    return this.validationConfig;
  }

  getSelectors() {
    return this.selectors;
  }

  getButtonConfig() {
    return this.buttonConfig;
  }
}
