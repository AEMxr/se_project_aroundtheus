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
    this._items.forEach((item) => {
      this._renderer(item);
    });

    // renders all elements on the page.
    // call the renderer() function on each item.
    // be called once on page load.
  }

  addItem(element) {
    // takes a DOM element and adds it to the container.
    this._cssSelector.prepend(element);
    // should be called when adding an individual card to the DOM.
  }
}
