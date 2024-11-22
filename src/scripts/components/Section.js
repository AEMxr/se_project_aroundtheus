export default class Section {
  constructor({ items, renderer }, cssClassSelector) {
    this._items =
      document.querySelector(
        items
      ); /*array of data which adds to the page when loads*/
    this._renderer =
      document.querySelector(
        renderer
      ); /*a function that creates and adds a single item to the page*/
    this._cssClassSelector =
      document.querySelector(cssClassSelector); /*add the card elements*/
  }

  renderItems() {
    // should iterate through the items array.

    // renders all elements on the page.
    this._renderer(items);

    // call the renderer() function on each item.
    // be called once on page load.
  }

  addItem() {
    // takes a DOM element and adds it to the container.
    // should be called when adding an individual card to the DOM.
  }
}

const newCard = new Section({ newCardData, renderCard }, "/*id/class*/");

const newCardData = {
  name: inputs.image.title.value,
  link: inputs.image.link.value,
};
renderCard(newCardData);

/*~----=)>. Universal function for rendering cards '<(=----~*/
function renderCard(cardData, method = "prepend") {
  const card = new Card(cardData, "#card-template", handlePreviewModal);
  const cardElement = card.getCardElement();
  if (method === "prepend") {
    cardsContainer.prepend(cardElement);
  } else {
    cardsContainer.append(cardElement);
  }
}

/*~----=)>. Initiate initial cards object '<(=----~*/
initialCards.forEach((cardData) => {
  renderCard(cardData, "append");
});
