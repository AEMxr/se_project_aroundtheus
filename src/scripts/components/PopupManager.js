import Card from "./Card.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";

export default class PopupManager {
  constructor(api, profile, formValidators, stateManager) {
    this._api = api;
    this._profile = profile;
    this._formValidators = formValidators;
    this._stateManager = stateManager;

    this._handleDeleteClick = (card) => {
      this.openPopup("delete");
      const deletePopup = this._popups.delete;
      deletePopup.setSubmitAction(() => {
        this._api
          .deleteCard(card.getId())
          .then(() => {
            card.deleteCard();
            deletePopup.close();
          })
          .catch(console.error);
      });
    };

    this._handleLikeClick = (cardId, isLiked) => {
      return this._api.toggleLike(cardId, isLiked);
    };

    this._handleImageClick = (cardData) => {
      this._stateManager.setState({ currentModal: "preview" });
      this._popups.preview.open(cardData);
    };

    this._popupConfig = {
      profileForm: {
        selector: "#profileModal",
        action: "patchUserInformation",
        formatData: (data) => ({
          name: data.name,
          about: data.description,
        }),
      },
      avatarEdit: {
        selector: "#avatarModal",
        action: "patchAvatar",
        formatData: (data) => ({ avatar: data.avatar }),
      },
      imageForm: {
        selector: "#imageModal",
        action: "postNewCard",
        formatData: (data) => ({
          name: data.title,
          link: data.link,
        }),
      },
    };

    this._popups = {
      ...Object.entries(this._popupConfig).reduce(
        (acc, [name, config]) => ({
          ...acc,
          [name]: new PopupWithForm(
            config.selector,
            (formData) =>
              this._handleSubmit(config.action, config.formatData(formData)),
            this._formValidators[name]
          ),
        }),
        {}
      ),
      preview: new PopupWithImage("#previewModal"),
      delete: new PopupWithConfirmation("#deletConfirmationModal"),
    };
  }

  _handleSubmit(action, formData) {
    this._stateManager.setState({
      isLoading: true,
      loadingAction: action,
    });

    const currentPopup =
      this._popups[
        action === "patchAvatar"
          ? "avatarEdit"
          : action === "postNewCard"
          ? "imageForm"
          : "profileForm"
      ];

    const submitButton = currentPopup.getSubmitButton();
    submitButton.textContent = "Saving...";

    return this._api[action](formData)
      .then((response) => {
        if (action === "patchUserInformation") {
          this._stateManager.setState({
            user: {
              ...this._stateManager.getState().user,
              name: formData.name,
              job: formData.about,
            },
          });
        } else if (action === "patchAvatar") {
          this._stateManager.setState({
            user: {
              ...this._stateManager.getState().user,
              avatar: formData.avatar,
            },
          });
        } else if (action === "postNewCard") {
          const currentCards = this._stateManager.getState().cards;
          this._stateManager.setState({
            cards: [
              {
                name: response.name,
                link: response.link,
                _id: response._id,
                isLiked: false,
                owner: response.owner,
              },
              ...currentCards,
            ],
          });
        }

        this._stateManager.setState({
          currentModal: null,
          isLoading: false,
          loadingAction: null,
        });

        currentPopup.close();
      })
      .catch((error) => {
        this._stateManager.setState({
          errors: [...this._stateManager.getState().errors, error],
          isLoading: false,
          loadingAction: null,
        });
      })
      .finally(() => {
        submitButton.textContent = "Save";
      });
  }

  openPopup(name) {
    this._stateManager.setState({ currentModal: name });
    this._popups[name].open();
  }

  initializePopups() {
    Object.values(this._popups).forEach((popup) => popup.setEventListeners());
  }
}
