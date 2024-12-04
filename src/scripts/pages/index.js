function createCard(item) {
  const card = new Card(item, cardSelector, handleImageClick);
  return card.getCardElement();
}

// For new card creation
const cardElement = createCard(newCardData);
cardSection.addItem(cardElement);
