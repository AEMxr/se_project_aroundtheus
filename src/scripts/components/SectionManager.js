import Card from "./Card.js";

export default class SectionManager {
  constructor(
    cardSelector,
    api,
    profile,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick,
    stateManager
  ) {
    this._cardSelector = cardSelector;
    this._api = api;
    this._profile = profile;
    this._cardsGrid = document.querySelector(".cards__grid");
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._stateManager = stateManager;
    this._initialRenderComplete = false;
  }

  renderInitialCards(cards) {
    if (Array.isArray(cards) && !this._initialRenderComplete) {
      this._cardsGrid.innerHTML = "";
      for (let i = 0; i < cards.length; i++) {
        const cardElement = this._createCard(cards[i]);
        this._cardsGrid.append(cardElement);
      }

      setTimeout(() => {
        this._cardsGrid.style.animation =
          "fadeInDown 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards";
        this._initialRenderComplete = true;
      }, cards.length * 100 + 500);
    }
  }

  updateCard(cardId, newData) {
    const cardElement = this._cardsGrid.querySelector(
      `[data-card-id="${cardId}"]`
    );
    if (cardElement) {
      const updatedCardElement = this._createCard(newData);
      cardElement.replaceWith(updatedCardElement);
    }
  }

  _addInitialCard(cardData) {
    const cardElement = this._createCard(cardData);
    this._cardsGrid.prepend(cardElement);
  }

  addCard(cardData) {
    const cardElement = this._createCard(cardData);
    this._cardsGrid.prepend(cardElement);
  }

  _createCard(cardData) {
    const card = new Card(
      {
        name: cardData.name,
        link: cardData.link,
        _id: cardData._id,
        isLiked: cardData.isLiked,
        owner: cardData.owner,
      },
      this._cardSelector,
      this._handleImageClick,
      this._handleDeleteClick,
      this._handleLikeClick,
      this._profile._id,
      this._stateManager
    );
    return card.getCardElement();
  }
}
