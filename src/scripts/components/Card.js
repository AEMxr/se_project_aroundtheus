export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
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
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeIcon() {
    this._cardHeart.classList.toggle("card__heart_active");
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
