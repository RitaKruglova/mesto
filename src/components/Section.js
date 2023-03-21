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

  addItem(item, isAppend = false) {
    if (isAppend) {
      this._container.append(item);
    } else {
      this._container.prepend(item);
    }
  }
}