import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, confirmButtonSelector) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector(confirmButtonSelector);
  }

  open(deleteCard) {
    super.open();
    this._confirmButton.addEventListener('click', () => {
      deleteCard();
      this.close();
    });
    this._deleteCard = deleteCard;
  }

  close() {
    super.close();
    this._confirmButton.removeEventListener('click', this._deleteCard);
  }
}