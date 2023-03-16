export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._initialArray.forEach(item => {
      const card = this._renderer(item);
      this.addItem(card);
    });
  }

  addItem(item) {
    this._container.append(item);
  }
}