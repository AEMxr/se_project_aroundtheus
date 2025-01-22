export default class Card {
  constructor(
    { name, link, _id, isLiked },
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  _setEventListeners() {
    this._cardHeart.addEventListener("click", () => {
      this._handleLikeIcon();
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

  _handleLikeIcon() {
    this._handleLikeClick(this._id, this._isLiked).then((card) => {
      this._isLiked = card.isLiked;
      this._cardHeart.classList.toggle("card__heart_active");
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

    this._setEventListeners();

    return this._cardElement;
  }
}
