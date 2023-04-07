export default class Api {
  constructor() {
  }

  _fetch(url, method = 'GET', body = null) {
    return fetch(url, {
      method,
      headers: {
        authorization: 'b2c416ac-9733-4a5c-9da0-2148e2adbd32',
        'Content-Type': 'application/json'
      },
      body
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
  }

  getInitialCards() {
    return this._fetch('https://mesto.nomoreparties.co/v1/cohort-62/cards');
  }

  putLike(cardId) {
    this._fetch(`https://mesto.nomoreparties.co/v1/cohort-62/cards/${cardId}/likes`, 'PUT');
  }

  deleteLike(cardId) {
    this._fetch(`https://mesto.nomoreparties.co/v1/cohort-62/cards/${cardId}/likes`, 'DELETE');
  }

  deleteCard(cardId) {
    this._fetch(`https://mesto.nomoreparties.co/v1/cohort-62/cards/${cardId}`, 'DELETE');
  }

  getMyName() {
    return this._fetch('https://nomoreparties.co/v1/cohort-62/users/me');
  }

  getUserInfo() {
    return this._fetch('https://nomoreparties.co/v1/cohort-62/users/me');
  }

  setUserInfo({ fullname, about }) {
    return this._fetch('https://mesto.nomoreparties.co/v1/cohort-62/users/me', 'PATCH',
      JSON.stringify({
        name: fullname,
        about: about
      })
    );
  }

  addNewCard(inputValues) {
    return this._fetch('https://mesto.nomoreparties.co/v1/cohort-62/cards', 'POST',
      JSON.stringify({
        name: inputValues.name,
        link: inputValues.link
      })
    )
  }

  changeAvatar(link) {
    return this._fetch('https://mesto.nomoreparties.co/v1/cohort-62/users/me/avatar', 'PATCH',
      JSON.stringify({
        avatar: link
      })
    )
  }
}