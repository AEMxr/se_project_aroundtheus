export default class ConfigManager {
  static config = {
    api: {
      baseUrl: "https://around-api.en.tripleten-services.com/v1",
      headers: {
        authorization: "4b5891e6-236c-4083-9664-b0567d688b97",
        "Content-Type": "application/json",
      },
    },

    validation: {
      formSelector: ".modal__form",
      inputSelector: ".modal__input",
      submitButtonSelector: ".modal__button",
      inactiveButtonClass: "modal__button_disabled",
      inputErrorClass: "modal__input_type_error",
      errorClass: "modal__error_visible",
    },

    selectors: {
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
    },

    buttonActions: {
      profileEditButton: "profileForm",
      avatarEditButton: "avatarEdit",
      imageEditButton: "imageForm",
    },
  };

  getApiConfig() {
    return ConfigManager.config.api;
  }

  getValidationConfig() {
    return ConfigManager.config.validation;
  }

  getSelectors() {
    return ConfigManager.config.selectors;
  }

  getButtonConfig() {
    return ConfigManager.config.buttonActions;
  }
}
