import Card from "./Card.js";

export default class SectionManager {
  static selectors = {
    cardsGrid: ".cards__grid",
    card: "[data-card-id]",
  };

  static animations = {
    fadeInDown: "fadeInDown 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards",
  };

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
    this._handlers = { handleImageClick, handleDeleteClick, handleLikeClick };
    this._stateManager = stateManager;
    this._cardsGrid = document.querySelector(
      SectionManager.selectors.cardsGrid
    );
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
      this._handlers.handleImageClick,
      this._handlers.handleDeleteClick,
      this._handlers.handleLikeClick,
      this._profile._id,
      this._stateManager
    );
    return card.getCardElement();
  }

  renderInitialCards(cards) {
    if (!Array.isArray(cards) || this._initialRenderComplete) return;

    this._cardsGrid.innerHTML = "";
    cards.forEach((card) => {
      this._cardsGrid.append(this._createCard(card));
    });

    this._animateCards(cards.length);
  }

  _animateCards(cardCount) {
    setTimeout(() => {
      this._cardsGrid.style.animation = SectionManager.animations.fadeInDown;
      this._initialRenderComplete = true;
    }, cardCount * 100 + 500);
  }

  updateCard(cardId, newData) {
    const cardElement = this._cardsGrid.querySelector(
      `${SectionManager.selectors.card}[data-card-id="${cardId}"]`
    );
    if (cardElement) {
      cardElement.replaceWith(this._createCard(newData));
    }
  }

  addCard(cardData) {
    this._cardsGrid.prepend(this._createCard(cardData));
  }
}
