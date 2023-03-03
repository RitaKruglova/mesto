export default class Card {
  constructor(cardInfo, templateSelector, handleOpenPopup) {
    this._card = this._getTemplate(templateSelector);
    this._cardInfo = cardInfo;
    this._handleOpenPopup = handleOpenPopup;
  }

  _getTemplate(templateSelector) {
    return document.querySelector(templateSelector).content.querySelector('.card').cloneNode(true);
  }

  getCard() {
    const cardImage = this._card.querySelector('.card__image');
    cardImage.src = this._cardInfo.link;
    cardImage.alt = this._cardInfo.name;
    this._card.querySelector('.card__title').textContent = this._cardInfo.name;
    this._setEventListeners();
    return this._card;
  }

  _setEventListeners() {
    this._card.querySelector('.card__recycle-bin').addEventListener('click', this._deleteCard)
    this._card.querySelector('.card__like').addEventListener('click', this._like);
    this._card.querySelector('.card__image').addEventListener('click', () => {
      this._handleOpenPopup(this._cardInfo.name, this._cardInfo.link)
    });
  }

  _deleteCard(event) {
    event.target.closest('.card').remove();
  }

  _like(event) {
    event.target.classList.toggle('card__like_active');
  }
}
