export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(initialArray) {
    const array = [];
    initialArray.forEach(item => {
      array.push(this._renderer(item));
    });
    return array;
  }

  addItem(item) {
    this._container.append(item);
  }
}