import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupImageName = this._popup.querySelector('.popup__image-name');
  }

  open(name, link) {
    super.open();
    this._popupImage.setAttribute('src', link);
    this._popupImage.setAttribute('alt', name);
    this._popupImageName.textContent = name;
  }
}