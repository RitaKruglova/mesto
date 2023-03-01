export default class Card {
  constructor(cardInfo, templateSelector) {
    this._name = cardInfo.name;
    this._link = cardInfo.link;
    this._card = this._getTemplate(templateSelector);
    this._cardInfo = cardInfo;
  }

  _getTemplate(templateSelector) {
    return document.querySelector(templateSelector).content.cloneNode(true);
  }

  getCard() {
    const cardImage = this._card.querySelector('.card__image');
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._card.querySelector('.card__title').textContent = this._name;
    this._setEventListeners();
    return this._card;
  }

  _setEventListeners() {
    this._card.querySelector('.card__recycle-bin').addEventListener('click', this._deleteCard)
    this._card.querySelector('.card__like').addEventListener('click', this._like);
    this._card.querySelector('.card__image').addEventListener('click', () => this._openPopup(this._cardInfo));
  }

  _openPopup(cardInfo) {
    const popup = document.querySelector('.popup_type_picture');
    popup.classList.add('popup_opened');
    const popupImage = popup.querySelector('.popup__image');
    popupImage.setAttribute('src', cardInfo.link);
    popupImage.setAttribute('alt', cardInfo.name);
    popup.querySelector('.popup__image-name').textContent = cardInfo.name;
  }

  _deleteCard(event) {
    event.target.closest('.card').remove();
  }

  _like(event) {
    event.target.classList.toggle('card__like_active');
  }
}
