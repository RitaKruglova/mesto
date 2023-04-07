export default class Card {
  constructor(cardInfo, templateSelector, handleCardClick, handleRecycleBinClick, api) {
    this._card = this._getTemplate(templateSelector);
    this._cardInfo = cardInfo;
    this._handleCardClick = handleCardClick;
    this._cardImage = this._card.querySelector('.card__image');
    this._handleRecycleBinClick  = handleRecycleBinClick;
    this._cardLikeCounter = this._card.querySelector('.card__counter');
    this._cardLike = this._card.querySelector('.card__like');
    this._api = api;
    this._recycleBin = this._card.querySelector('.card__recycle-bin');
  }

  _getTemplate(templateSelector) {
    return document.querySelector(templateSelector).content.querySelector('.card').cloneNode(true);
  }

  getCard() {
    this._cardImage.src = this._cardInfo.link;
    this._cardImage.alt = this._cardInfo.name;
    this._appendLikes();
    this._api.getMyName()
      .then(data => {
        return data.name;
      })
      .then(name => {
      const isIOwner = this._cardInfo.likes.some(owner => {
        return owner.name === name;
      })
      if (isIOwner) {
        this._cardLike.classList.add('card__like_active');
      }
    })
    this._card.querySelector('.card__title').textContent = this._cardInfo.name;
    this._setEventListeners();
    return this._card;
  }

  _appendLikes() {
    if (this._cardInfo.likes.length !== 0) {
      this._cardLikeCounter.textContent = this._cardInfo.likes.length;
    } else {
      this._cardLikeCounter.textContent = '';
    }
  }

  _setEventListeners() {
    this._recycleBin.addEventListener('click', () => {
      this._handleRecycleBinClick(this._deleteCard.bind(this))
    });
    this._cardLike.addEventListener('click', () => {
      this._like();
    });
    this._card.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick(this._cardInfo.name, this._cardInfo.link)
    });
  }

  _deleteCard() {
    this._card.remove();
    this._api.deleteCard(this._cardInfo._id);
  }

  _like() {
    this._cardLike.classList.toggle('card__like_active');
    const counter = Number(this._cardLikeCounter.textContent)
    if (this._cardLike.classList.contains('card__like_active')) {
      this._api.putLike(this._cardInfo._id);
      this._cardLikeCounter.textContent = counter + 1;
    } else {
      this._api.deleteLike(this._cardInfo._id);
      if (counter >= 2) {
        this._cardLikeCounter.textContent = counter - 1;
      } else {
        this._cardLikeCounter.textContent = '';
      }
    }
  }
}
