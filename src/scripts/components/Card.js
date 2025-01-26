export default class Card {
  constructor(
    { name, link, _id, isLiked, owner },
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick,
    userId,
    stateManager
  ) {
    console.log("Card being constructed with isLiked:", isLiked);
    this._name = name;
    this._link = link;
    this._id = _id;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._isLiked = isLiked;
    this._owner = owner;
    this.stateManager = stateManager;
  }

  getId() {
    return this._id;
  }

  _setEventListeners() {
    this._cardHeart.addEventListener("click", () => {
      this.handleLikeIcon();
    });

    this._cardDelete.addEventListener("click", () => {
      this._handleDeleteButton();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({
        name: this._name,
        link: this._link,
      });
    });
  }

  _handleDeleteButton() {
    this._handleDeleteClick(this);
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;

    this.stateManager.setState({
      cards: this.stateManager
        .getState()
        .cards.filter((card) => card._id !== this._id),
    });
  }

  _setLikeButtonState() {
    if (this._isLiked) {
      this._cardHeart.classList.add("card__heart_active");
    } else {
      this._cardHeart.classList.remove("card__heart_active");
    }
  }

  handleLikeIcon() {
    const newLikeState = !this._isLiked;
    const animationClass = newLikeState
      ? "card__heart_clicked-active"
      : "card__heart_clicked-inactive";

    this._cardHeart.classList.add(animationClass);

    this._handleLikeClick(this._id, !newLikeState)
      .then((card) => {
        this._isLiked = newLikeState;
        this._setLikeButtonState();
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

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardLabel.textContent = this._name;

    if (this._isLiked) {
      this._setLikeButtonState();
    }

    this._setEventListeners();

    return this._cardElement;
  }
}
