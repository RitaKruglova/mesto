export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._resetButton = this._popup.querySelector('.popup__reset-button');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._resetButton.addEventListener('click', this.close.bind(this));
    this._popup.addEventListener('mousedown', (event) => {
      if (event.target === event.currentTarget) {
        this.close();
      }
    })
  }
}