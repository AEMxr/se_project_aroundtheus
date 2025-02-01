import ConfigManager from "./ConfigManager.js";

export default class Section {
  constructor({ items, renderer }, cssSelector) {
    this._items = this._normalizeItems(items);
    this._renderer = renderer;
    this._container = document.querySelector(
      cssSelector || ConfigManager.config.selectors.cardsGrid
    );
    this._renderQueue = new Set();
  }

  _normalizeItems(items) {
    return Array.isArray(items) ? items : [items].filter(Boolean);
  }

  renderItems(items = this._items) {
    const normalizedItems = this._normalizeItems(items);
    normalizedItems.forEach((item) => this._renderer(item));
  }

  addItem(element, position = "start") {
    const insertMethods = {
      start: () => this._container.prepend(element),
      end: () => this._container.append(element),
    };
    insertMethods[position]();
  }

  clear() {
    this._container.innerHTML = "";
  }
}
