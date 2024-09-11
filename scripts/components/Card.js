export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _setEventListeners() {
    /*~----=)>. Card like button '<(=----~*/
    this._cardElement
      .querySelector(".card__heart")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    /*~----=)>. Card delete button '<(=----~*/
    this._cardElement
      .querySelector(".card__delete")
      .addEventListener("click", () => {
        this._handleDeleteButton();
      });

    /*~----=)>. Card preview '<(=----~*/
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleImageClick({ name: this._name, link: this._link });
      });
  }

  _handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__heart")
      .classList.toggle("card__heart_active");
  }

  getCardElement() {
    const cardTemplate = document
      .querySelector("#card-template")
      .content.cloneNode(true);

    this._cardElement = cardTemplate.querySelector(".card");

    const cardImage = cardTemplate.querySelector(".card__image");
    const cardLabel = cardTemplate.querySelector(".card__label");

    cardImage.src = this._link;
    cardImage.alt = this._name;
    cardLabel.textContent = this._name;

    this._setEventListeners();

    return cardTemplate;
  }
}
