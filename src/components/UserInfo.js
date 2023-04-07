export default class UserInfo {
  constructor({ usernameSelector, aboutUserSelector, avatarSelector, api }) {
    this._username = document.querySelector(usernameSelector);
    this._aboutUser = document.querySelector(aboutUserSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._api = api;
  }

  getUserInfo() {
    const userInfo = {};
    return this._api.getUserInfo()
      .then(data => {
        userInfo[this._username.id] = data.name;
        userInfo[this._aboutUser.id] = data.about;
        userInfo[this._avatar.id] = data.avatar;
        return userInfo;
      })
  }

  setUserInfo({ fullname, about }) {
    return this._api.setUserInfo({ fullname, about })
      .then(data => {
        this._username.textContent = data.name;
        this._aboutUser.textContent = data.about;
        return {};
      })
  }
}