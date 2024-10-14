export default class Section {
  constructor({ items, renderer }, cssClassSelector) {
    // this._items = array of data which adds to the page when loads
    // this._renderer = a function that creates and adds a single item to the page
    // this._cssClassSelector = add the card elements
  }

  renderItems() {
    // renders all elements on the page.
    // should iterate through the items array.
    // call the renderer() function on each item.
    // be called once on page load.
  }

  addItem() {
    // takes a DOM element and adds it to the container.
    // should be called when adding an individual card to the DOM.
  }
}
