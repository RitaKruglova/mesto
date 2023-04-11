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

  getCard(userId) {
    this._cardImage.src = this._cardInfo.link;
    this._cardImage.alt = this._cardInfo.name;
    this._appendLikes();
    const isLiked = this._cardInfo.likes.some(owner => {
      return owner._id === userId;
    })
    if (isLiked) {
      this._cardLike.classList.add('card__like_active');
    }
    if (this._cardInfo.owner._id !== userId) {
      this._recycleBin.remove();
    }
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
    return this._api.deleteCard(this._cardInfo._id)
      .then(() => {
        this._card.remove();
      })
  }

  _like() {
    if (this._cardLike.classList.contains('card__like_active')) {
      this._api.deleteLike(this._cardInfo._id)
        .then(data => {
          this._cardLike.classList.remove('card__like_active');
          if (data.likes.length >= 1) {
            this._cardLikeCounter.textContent = data.likes.length;
          } else {
            this._cardLikeCounter.textContent = '';
          }
        });
    } else {
      this._api.putLike(this._cardInfo._id)
        .then(data => {
          this._cardLikeCounter.textContent = data.likes.length;
          this._cardLike.classList.add('card__like_active');
        });
    }
  }
}
