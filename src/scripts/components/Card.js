export default class Card {
  constructor(
    { name, link, _id, isLiked, owner },
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick,
    userId
  ) {
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
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  _handleDeleteButton() {
    this._handleDeleteClick(this);
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _setLikeButtonState() {
    if (this._isLiked) {
      this._cardHeart.classList.add("card__heart_active");
    } else {
      this._cardHeart.classList.remove("card__heart_active");
    }
  }

  handleLikeIcon() {
    this._handleLikeClick(this._id, this._isLiked).then((card) => {
      this._likes = card.likes;
      this._isLiked = !this._isLiked;
      this._setLikeButtonState();
    });
  }

  getCardElement() {
    const cardTemplate = document.querySelector(this._cardSelector);
    this._cardElement = cardTemplate.content
      .cloneNode(true)
      .querySelector(".card");

    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardLabel = this._cardElement.querySelector(".card__label");
    this._cardHeart = this._cardElement.querySelector(".card__heart");
    this._cardDelete = this._cardElement.querySelector(".card__delete");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardLabel.textContent = this._name;

    if (this._isLiked) {
      this._cardHeart.classList.add("card__heart_active");
    }

    this._setEventListeners();

    return this._cardElement;
  }
}
