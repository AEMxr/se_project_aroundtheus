import UserInfo from "./UserInfo.js";
import PopupManager from "./PopupManager.js";
import FormValidator from "./FormValidator.js";
import Api from "./Api.js";
import SectionManager from "./SectionManager.js";
import ConfigManager from "./ConfigManager.js";
import StateManager from "./StateManager.js";
import ErrorBoundary from "./ErrorBoundary.js";
import { validationConfig, cardSelector } from "../../utils/constants.js";

export default class App {
  constructor() {
    this.config = new ConfigManager();
    this.stateManager = new StateManager();
    this.api = null;
    this.profile = null;
    this.popupManager = null;
    this.sectionManager = null;
    this.formValidators = null;
    this.initialCardsRendered = false;
  }

  initializeApi() {
    return new Api(this.config.getApiConfig());
  }

  initializeProfile() {
    const selectors = this.config.getSelectors();
    return new UserInfo({
      nameSelector: selectors.profileName,
      jobSelector: selectors.profileJob,
      avatarSelector: selectors.profileAvatar,
      stateManager: this.stateManager,
    });
  }

  initializeValidation(config) {
    const formValidators = {};
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
      const validator = new FormValidator(
        config,
        formElement,
        this.stateManager
      );
      formValidators[formElement.getAttribute("name")] = validator;
      validator.enableValidation();
    });
    return formValidators;
  }

  initializeEventListeners() {
    const buttons = this.config.getButtonConfig();
    Object.entries(buttons).forEach(([buttonId, popupName]) => {
      document.getElementById(buttonId).addEventListener("click", () => {
        console.log("Before modal:", this.stateManager.getState());
        this.stateManager.setState({ currentModal: popupName });
        console.log("After modal:", this.stateManager.getState());
        this.popupManager.openPopup(popupName);
      });
    });
  }

  async initialize() {
    ErrorBoundary.setStateManager(this.stateManager);
    this.api = this.initializeApi();
    this.profile = this.initializeProfile();
    this.formValidators = this.initializeValidation(validationConfig);

    this.stateManager.subscribe((state) => {
      console.log("State updated:", state);
      if (state.user) {
        this.profile.setUserInfo(state.user);
      }
      // Only render cards when we have them and loading is complete
      if (state.cards && state.cards.length > 0 && !state.isLoading) {
        this.sectionManager.renderInitialCards(state.cards);
      }
    });

    this.popupManager = new PopupManager(
      this.api,
      this.profile,
      this.formValidators,
      this.stateManager
    );
    this.popupManager.initializePopups();

    this.sectionManager = new SectionManager(
      cardSelector,
      this.api,
      this.profile,
      (cardData) => this.popupManager._handleImageClick(cardData),
      (card) => this.popupManager._handleDeleteClick(card),
      (cardId, isLiked) => this.popupManager._handleLikeClick(cardId, isLiked),
      this.stateManager
    );

    this.initializeEventListeners();

    this.stateManager.setState({ isLoading: true });

    try {
      const [userData, cards] = await Promise.all([
        this.api.getUserInformation(),
        this.api.getInitialCards(),
      ]);

      this.stateManager.setState({
        user: {
          name: userData.name,
          job: userData.about,
          avatar: userData.avatar,
        },
        cards: cards,
        isLoading: false,
      });
    } catch (error) {
      console.error(error);
      this.stateManager.setState({ isLoading: false });
    }
  }
}
