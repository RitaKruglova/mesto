export default class Card {
  constructor(cardInfo, templateSelector, handleCardClick, handleRecycleBinClick) {
    this._card = this._getTemplate(templateSelector);
    this._cardInfo = cardInfo;
    this._handleCardClick = handleCardClick;
    this._cardImage = this._card.querySelector('.card__image');
    this._handleRecycleBinClick  = handleRecycleBinClick;
    this._cardLikeCounter = this._card.querySelector('.card__counter');
    this._cardLike = this._card.querySelector('.card__like')
  }

  _getTemplate(templateSelector) {
    return document.querySelector(templateSelector).content.querySelector('.card').cloneNode(true);
  }

  _getMyName() {
    return fetch('https://nomoreparties.co/v1/cohort-62/users/me ', {
      headers: {
        authorization: 'b2c416ac-9733-4a5c-9da0-2148e2adbd32',
      }
    })
      .then(res => res.json())
      .then(data => {
        return data.name;
      })
  }

  getCard() {
    this._cardImage.src = this._cardInfo.link;
    this._cardImage.alt = this._cardInfo.name;
    this._appendLikes();
    this._getMyName().then(name => {
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
    this._card.querySelector('.card__recycle-bin').addEventListener('click', () => {
      this._handleRecycleBinClick(this._deleteCard.bind(this))
    });
    this._cardLike.addEventListener('click', (event) => {
      this._like(event);
    });
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

    if (this._cardLike.classList.contains('card__like_active')) {
      fetch(`https://mesto.nomoreparties.co/v1/cohort-62/cards/${this._cardInfo._id}/likes`, {
        method: 'PUT',
        headers: {
          authorization: 'b2c416ac-9733-4a5c-9da0-2148e2adbd32'
        }
      })
      this._cardLikeCounter.textContent = Number(this._cardLikeCounter.textContent) + 1;
    } else {
      fetch(`https://mesto.nomoreparties.co/v1/cohort-62/cards/${this._cardInfo._id}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: 'b2c416ac-9733-4a5c-9da0-2148e2adbd32'
        }
      })
      this._cardLikeCounter.textContent = Number(this._cardLikeCounter.textContent) - 1;
    }
  }
}
