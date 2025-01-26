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
  }

  renderInitialCards(cards) {
    if (Array.isArray(cards)) {
      // Clear existing cards first
      this._cardsGrid.innerHTML = "";

      // Render new cards
      cards.forEach((cardData) => {
        this.addCard(cardData);
      });

      setTimeout(() => {
        this._cardsGrid.style.animation =
          "fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards";
      }, cards.length * 100 + 500);
    }
  }

  // Add this new method
  updateCard(cardId, newData) {
    const cardElement = this._cardsGrid.querySelector(
      `[data-card-id="${cardId}"]`
    );
    if (cardElement) {
      const updatedCardElement = this._createCard(newData);
      cardElement.replaceWith(updatedCardElement);
    }
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
