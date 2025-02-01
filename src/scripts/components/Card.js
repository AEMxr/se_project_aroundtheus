import ConfigManager from "./ConfigManager.js";

export default class Card {
  static classes = {
    heartActive: "card__heart_active",
    heartClickedActive: "card__heart_clicked-active",
    heartClickedInactive: "card__heart_clicked-inactive",
  };

  constructor(
    { name, link, _id, isLiked, owner },
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick,
    userId,
    stateManager
  ) {
    this._data = { name, link, _id, isLiked, owner };
    this._cardSelector = ConfigManager.config.selectors.cardTemplate;
    this._handlers = { handleImageClick, handleDeleteClick, handleLikeClick };
    this._userId = userId;
    this.stateManager = stateManager;
    this._state = {
      imageLoaded: false,
      observer: null,
      elements: {},
    };
  }

  getId() {
    return this._data._id;
  }

  _initializeElements() {
    const template = document.querySelector(this._cardSelector);
    if (!template) {
      throw new Error(`Template ${this._cardSelector} not found`);
    }

    this._state.elements.card = template.content
      .cloneNode(true)
      .querySelector(".card");

    const elementSelectors = {
      image: ".card__image",
      label: ".card__label",
      heart: ".card__heart",
      delete: ".card__delete",
    };

    Object.entries(elementSelectors).forEach(([key, selector]) => {
      this._state.elements[key] =
        this._state.elements.card.querySelector(selector);
    });
  }

  _attachEventListeners() {
    const { heart, delete: deleteBtn, image } = this._state.elements;

    const eventMap = new Map([
      [heart, () => this.handleLikeIcon()],
      [deleteBtn, () => this._handlers.handleDeleteClick(this)],
      [
        image,
        () =>
          this._handlers.handleImageClick({
            name: this._data.name,
            link: this._data.link,
          }),
      ],
    ]);

    eventMap.forEach((handler, element) => {
      element.addEventListener("click", handler);
    });
  }

  deleteCard() {
    this._state.elements.card.remove();
    this._state.elements.card = null;

    this.stateManager.setState({
      cards: this.stateManager
        .getState()
        .cards.filter((card) => card._id !== this._data._id),
    });
  }

  _updateLikeState(isLiked) {
    const { heart } = this._state.elements;
    heart.classList.toggle(Card.classes.heartActive, isLiked);
  }

  async handleLikeIcon() {
    const newLikeState = !this._data.isLiked;
    const animationClass = newLikeState
      ? Card.classes.heartClickedActive
      : Card.classes.heartClickedInactive;

    this._cardHeart.classList.add(animationClass);

    this._handleLikeClick(this._id, newLikeState)
      .then(() => {
        this._isLiked = newLikeState;
        this._setLikeButtonState();

        const currentState = this.stateManager.getState();
        const updatedCards = currentState.cards.map((card) =>
          card._id === this._id ? { ...card, isLiked: newLikeState } : card
        );
        this.stateManager.setState({ cards: updatedCards });
      })
      .finally(() => {
        setTimeout(() => {
          this._cardHeart.classList.remove(animationClass);
        }, 800);
      });
  }

  getCardElement() {
    const cardTemplate = document.querySelector(this._cardSelector);
    if (!cardTemplate) {
      throw new Error(
        `Template with selector ${this._cardSelector} not found in DOM`
      );
    }

    this._cardElement = cardTemplate.content
      .cloneNode(true)
      .querySelector(".card");

    const cards = document.querySelectorAll(".card");
    this._cardElement.style.setProperty("--card-index", cards.length);

    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardLabel = this._cardElement.querySelector(".card__label");
    this._cardHeart = this._cardElement.querySelector(".card__heart");
    this._cardDelete = this._cardElement.querySelector(".card__delete");

    this._cardImage.loading = "lazy";
    this._setupIntersectionObserver();
    this._cardImage.alt = this._name;
    this._cardLabel.textContent = this._name;

    if (this._isLiked) {
      this._setLikeButtonState();
    }

    this._setEventListeners();

    return this._cardElement;
  }

  _setupIntersectionObserver() {
    this._observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this._state.imageLoaded) {
            image.src = this._data.link;
            this._state.imageLoaded = true;
            this._state.observer.unobserve(image);
          }
        });
      },
      { rootMargin: "50px" }
    );

    this._state.observer.observe(image);
  }

  getCardElement() {
    this._initializeElements();

    const { card, image, label } = this._state.elements;
    const cards = document.querySelectorAll(".card");

    card.style.setProperty("--card-index", cards.length);
    image.alt = this._data.name;
    label.textContent = this._data.name;

    this._setupLazyLoading();
    this._updateLikeState(this._data.isLiked);
    this._attachEventListeners();

    return card;
  }
}
