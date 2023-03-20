export default class UserInfo {
  constructor({ usernameSelector, aboutUserSelector }) {
    this._username = document.querySelector(usernameSelector);
    this._aboutUser = document.querySelector(aboutUserSelector);
  }

  getUserInfo() {
    const userInfo = {};
    userInfo[this._username.id] = this._username.textContent;
    userInfo[this._aboutUser.id] = this._aboutUser.textContent;
    return userInfo;
  }

  setUserInfo({ fullname, about }) {
    this._username.textContent = fullname;
    this._aboutUser.textContent = about;
  }
}