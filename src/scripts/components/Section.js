import Card from "./Card.js";

export default class Section {
  constructor({ items, renderer }, cssSelector) {
    this._items = Array.isArray(items) ? items : [items];
    this._renderer = renderer;
    this._cardGrid = document.querySelector(cssSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._cardGrid.prepend(element);
  }
}
