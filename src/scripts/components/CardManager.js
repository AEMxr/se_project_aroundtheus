import Card from "./Card.js";

export default class CardManager {
  constructor(api, cardSelector, userId, handleImageClick, handleDeleteClick) {
    this._api = api;
    this._cardSelector = cardSelector;
    this._userId = userId;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._cardSection = document.querySelector(".cards__grid");

    this._handleLikeClick = this._handleLikeClick.bind(this);
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
    const cardElement = this.createCard(cardData);
    this._cardSection.prepend(cardElement);
  }

  loadInitialCards(cards) {
    const reversedCards = cards.reverse();
    reversedCards.forEach((cardData) => {
      const cardElement = this.createCard(cardData);
      this._cardSection.append(cardElement);
    });
  }
}
