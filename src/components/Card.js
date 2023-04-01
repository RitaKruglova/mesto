export default class Card {
  constructor(cardInfo, templateSelector, handleCardClick, handleRecycleBinClick) {
    this._card = this._getTemplate(templateSelector);
    this._cardInfo = cardInfo;
    this._handleCardClick = handleCardClick;
    this._cardImage = this._card.querySelector('.card__image');
    this._handleRecycleBinClick  = handleRecycleBinClick;
  }

  _getTemplate(templateSelector) {
    return document.querySelector(templateSelector).content.querySelector('.card').cloneNode(true);
  }

  getCard() {
    this._cardImage.src = this._cardInfo.link;
    this._cardImage.alt = this._cardInfo.name;
    this._card.querySelector('.card__title').textContent = this._cardInfo.name;
    this._setEventListeners();
    return this._card;
  }

  _setEventListeners() {
    this._card.querySelector('.card__recycle-bin').addEventListener('click', () => this._handleRecycleBinClick());
    this._card.querySelector('.card__like').addEventListener('click', this._like);
    this._card.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick(this._cardInfo.name, this._cardInfo.link)
    });
  }

  _deleteCard() {
    this._card.remove();
    fetch(`https://mesto.nomoreparties.co/v1/cohort-62/cards/${this._cardInfo._id}`, {
      method: 'DELETE',
      headers: {
        authorization: 'b2c416ac-9733-4a5c-9da0-2148e2adbd32',
      }
    })
  }

  _like(event) {
    event.target.classList.toggle('card__like_active');
  }
}
