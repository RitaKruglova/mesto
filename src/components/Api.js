export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _fetch(url, method = 'GET', body = null) {
    return fetch(`${this._baseUrl}${url}`, {
      method,
      headers: this._headers,
      body
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => {
      console.log(err);
    })
  }

  getInitialCards() {
    return this._fetch(`/cards`);
  }

  putLike(cardId) {
    return this._fetch(`/cards/${cardId}/likes`, 'PUT');
  }

  deleteLike(cardId) {
    return this._fetch(`/cards/${cardId}/likes`, 'DELETE');
  }

  deleteCard(cardId) {
    return this._fetch(`/cards/${cardId}`, 'DELETE');
  }

  getUserInfo() {
    return this._fetch(`/users/me`);
  }

  setUserInfo({ fullname, about }) {
    return this._fetch(`/users/me`, 'PATCH',
      JSON.stringify({
        name: fullname,
        about: about
      })
    );
  }

  addNewCard(inputValues) {
    return this._fetch(`/cards`, 'POST',
      JSON.stringify({
        name: inputValues.name,
        link: inputValues.link
      })
    )
  }

  changeAvatar(link) {
    return this._fetch(`/users/me/avatar`, 'PATCH',
      JSON.stringify({
        avatar: link
      })
    )
  }
}