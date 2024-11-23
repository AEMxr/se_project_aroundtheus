import PopupWithForm from "./PopupWithForm.js";
import Card from "./Card.js";

export default class Section {
  constructor({ items, renderer }, cssSelector) {
    this._items = Array.isArray(items) ? items : [items];
    /*array of data which adds to the page when loads*/
    this._renderer = renderer;
    /*a function that creates and adds a single item to the page*/
    this._cssSelector = document.querySelector(cssSelector);
    /*add the card elements*/
  }

  renderItems() {
    // should iterate through the items array.
    this._items.forEach(() => {
      this._renderer;
    });
    // renders all elements on the page.
    // call the renderer() function on each item.
    // be called once on page load.
  }

  addItem() {
    // takes a DOM element and adds it to the container.
    this._cssSelector.prepend();
    // should be called when adding an individual card to the DOM.
  }
}

// const newCard = new Section({ newCardData /*takes array*/, renderCard }, "/*id/class*/");

// const newCardData = {
//   name: inputs.image.title.value,
//   link: inputs.image.link.value,
// };
// renderCard(newCardData);

// /*~----=)>. Universal function for rendering cards '<(=----~*/
// function renderCard(cardData, method = "prepend") {

//   const card = new Card({ name, link }, cardSelector, handleImageClick);

//   const cardElement = card.getCardElement(){
//     const cardTemplate = document
//       .querySelector("#card-template")
//       .content.cloneNode(true);

//     this._cardElement = cardTemplate.querySelector(".card");

//     const cardImage = cardTemplate.querySelector(".card__image");
//     const cardLabel = cardTemplate.querySelector(".card__label");

//     cardImage.src = this._link;
//     cardImage.alt = this._name;
//     cardLabel.textContent = this._name;

//     this._setEventListeners();

//     return cardTemplate;
//   };

//   if (method === "prepend") {
//     cardsContainer.prepend(cardElement);
//   } else {
//     cardsContainer.append(cardElement);
//   }
// }

// /*~----=)>. Initiate initial cards object '<(=----~*/
// initialCards.forEach((cardData) => {
//   renderCard(cardData, "append");
// });

// /*~----=)>. Preview image modal '<(=----~*/
// function handlePreviewModal(card) {
//   previewImage.src = card.link;
//   previewImage.alt = card.name;
//   imageViewTitle.textContent = card.name;
//   openModal(modals.preview);
// }
