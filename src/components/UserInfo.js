export default class UserInfo {
  constructor({ usernameSelector, aboutUserSelector, avatarSelector, id }) {
    this._username = document.querySelector(usernameSelector);
    this._aboutUser = document.querySelector(aboutUserSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._id = id;
  }

  getUserInfo() {
    const userInfo = {};
    userInfo[this._username.id] = this._username.textContent;
    userInfo[this._aboutUser.id] = this._aboutUser.textContent;
    userInfo[this._avatar.id] = this._avatar.src;
    return userInfo;
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._username.textContent = name;
    this._aboutUser.textContent = about;
    this._avatar.src = avatar;
    this._id = _id;
  }
}