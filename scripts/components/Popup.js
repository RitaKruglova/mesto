export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._resetButton = this._popup.querySelector('.popup__reset-button');
  }

  open() {
    console.log(this._popup);
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._resetButton.addEventListener('click', this.close.bind(this));
    this._popup.addEventListener('click', (event) => {
      if (event.target === event.currentTarget) {
        this.close();
      }
    })
  }
}