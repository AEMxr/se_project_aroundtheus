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

    try {
      this._state.elements.heart.classList.add(animationClass);
      await this._handlers.handleLikeClick(this._data._id, !newLikeState);
      this._data.isLiked = newLikeState;
      this._updateLikeState(newLikeState);
    } finally {
      setTimeout(() => {
        this._state.elements.heart.classList.remove(animationClass);
      }, 800);
    }
  }

  _setupLazyLoading() {
    const { image } = this._state.elements;
    image.loading = "lazy";

    this._state.observer = new IntersectionObserver(
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
