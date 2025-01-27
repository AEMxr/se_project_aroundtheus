import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";

export default class PopupManager {
  constructor(api, profile, formValidators, stateManager, sectionManager) {
    this._api = api;
    this._profile = profile;
    this._formValidators = formValidators;
    this._stateManager = stateManager;
    this._sectionManager = sectionManager;
    this._popupConfig = this._initializePopupConfig();
    this._popups = this._initializePopups();

    [
      "_handleDeleteClick",
      "_handleLikeClick",
      "_handleImageClick",
      "_handleError",
      "_handleStateUpdate",
    ].forEach((method) => (this[method] = this[method].bind(this)));
  }

  _handleStateUpdate(action, data) {
    const stateUpdates = {
      modal: (name) => ({ currentModal: name }),
      loading: (isLoading) => ({
        isLoading,
        loadingAction: isLoading ? action : null,
      }),
      error: (error) => ({
        errors: [...this._stateManager.getState().errors, error],
      }),
      data: (newData) => newData,
    };
    this._stateManager.setState(stateUpdates[action](data));
  }

  _createPopup(type, config = {}) {
    const popupTypes = {
      form: (config) =>
        new PopupWithForm(
          config.selector,
          (data) => this._handleSubmit(config.name, config.formatData(data)),
          this._formValidators[config.name]
        ),
      image: () => new PopupWithImage("#previewModal"),
      confirmation: () => new PopupWithConfirmation("#deletConfirmationModal"),
    };
    return popupTypes[type](config);
  }

  _initializePopupConfig() {
    return {
      profileForm: {
        name: "profileForm",
        selector: "#profileModal",
        type: "form",
        action: "patchUserInformation",
        formatData: (data) => ({
          name: data.name,
          about: data.description,
        }),
        updateState: (response, formData) => ({
          user: {
            ...this._stateManager.getState().user,
            name: formData.name,
            job: formData.about,
          },
        }),
      },
      avatarEdit: {
        name: "avatarEdit",
        selector: "#avatarModal",
        type: "form",
        action: "patchAvatar",
        formatData: (data) => ({ avatar: data.avatar }),
        updateState: (response, formData) => ({
          user: {
            ...this._stateManager.getState().user,
            avatar: formData.avatar,
          },
        }),
      },
      imageForm: {
        name: "imageForm",
        selector: "#imageModal",
        type: "form",
        action: "postNewCard",
        formatData: (data) => ({
          name: data.title,
          link: data.link,
        }),
        updateState: (response) => ({
          cards: [
            {
              name: response.name,
              link: response.link,
              _id: response._id,
              isLiked: false,
              owner: response.owner,
            },
            ...this._stateManager.getState().cards,
          ],
        }),
      },
    };
  }

  _initializePopups() {
    const formPopups = Object.entries(this._popupConfig).reduce(
      (acc, [name, config]) => ({
        ...acc,
        [name]: this._createPopup(config.type, { ...config, name }),
      }),
      {}
    );

    return {
      ...formPopups,
      preview: this._createPopup("image"),
      delete: this._createPopup("confirmation"),
    };
  }

  _executeApiAction(action, data, onSuccess) {
    this._handleStateUpdate("loading", true);
    return this._api[action](data)
      .then(onSuccess)
      .catch(this._handleError)
      .finally(() => this._handleStateUpdate("loading", false));
  }

  _handleError(error) {
    this._handleStateUpdate("error", error);
    console.error("Error:", error);
  }

  _handleDeleteClick(card) {
    const popup = this._popups.delete;
    this._handleStateUpdate("modal", "delete");
    popup.open();
    popup.setSubmitAction(() => {
      this._executeApiAction("deleteCard", card.getId(), () => {
        card.deleteCard();
        this._handleStateUpdate("modal", null);
        popup.close();
      });
    });
  }

  _handleLikeClick(cardId, isLiked) {
    return this._api.toggleLike(cardId, isLiked);
  }

  _handleImageClick(cardData) {
    this._handleStateUpdate("modal", "preview");
    this._popups.preview.open(cardData);
  }

  _handleSubmit(action, formData) {
    const config = this._popupConfig[action];
    const currentPopup = this._popups[action];
    const submitButton = currentPopup.getSubmitButton();

    submitButton.textContent = "Saving...";

    return this._executeApiAction(config.action, formData, (response) => {
      const newState = config.updateState(response, formData);
      this._handleStateUpdate("data", newState);

      if (action === "imageForm") {
        this._sectionManager.addCard(newState.cards[0]);
      }

      this._handleStateUpdate("modal", null);
      currentPopup.close();
      submitButton.textContent = "Save";
    });
  }

  openPopup(name) {
    this._handleStateUpdate("modal", name);
    this._popups[name].open();
  }

  initializePopups() {
    Object.values(this._popups).forEach((popup) => popup.setEventListeners());
  }
}
