export default class UserInfo {
  constructor({ usernameSelector, aboutUserSelector, avatarSelector }) {
    this._username = document.querySelector(usernameSelector);
    this._aboutUser = document.querySelector(aboutUserSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userInfo = {};
    return fetch('https://nomoreparties.co/v1/cohort-62/users/me', {
      headers: {
        authorization: 'b2c416ac-9733-4a5c-9da0-2148e2adbd32'
      }
    })
      .then(res => res.json())
      .then(data => {
        userInfo[this._username.id] = data.name;
        userInfo[this._aboutUser.id] = data.about;
        userInfo[this._avatar.id] = data.avatar;
        return userInfo;
      })
  }

  setUserInfo({ fullname, about }) {

    fetch('https://mesto.nomoreparties.co/v1/cohort-62/users/me', {
      headers: {
        authorization: 'b2c416ac-9733-4a5c-9da0-2148e2adbd32',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({
        name: fullname,
        about: about
      })
    })
      .then(res => res.json())
      .then(data => {
        this._username.textContent = data.name;
        this._aboutUser.textContent = data.about;
      })
  }
}