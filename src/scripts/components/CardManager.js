import Card from "./Card.js";

export default class CardManager {
  static selectors = {
    cardsGrid: ".cards__grid",
  };

  constructor(api, cardSelector, userId, handleImageClick, handleDeleteClick) {
    this._api = api;
    this._cardSelector = cardSelector;
    this._userId = userId;
    this._handlers = {
      image: handleImageClick,
      delete: handleDeleteClick,
      like: this._handleLikeClick.bind(this),
    };
    this._cardSection = document.querySelector(CardManager.selectors.cardsGrid);
  }

  createCard(cardData) {
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
      this._userId
    );
    return card.getCardElement();
  }

  _handleLikeClick(cardId, isLiked) {
    return this._api.toggleLike(cardId, !isLiked);
  }

  addCard(cardData) {
    this._cardSection.prepend(this.createCard(cardData));
  }

  loadInitialCards(cards) {
    cards
      .reverse()
      .forEach((cardData) =>
        this._cardSection.append(this.createCard(cardData))
      );
  }
}
