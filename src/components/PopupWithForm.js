import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmitForm) {
    super(popupSelector);
    this._callbackSubmitForm = callbackSubmitForm;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
    this._submitButton = this._form.querySelector('.popup__submit-button');
    this._submitButtonName = this._submitButton.textContent;
  }

  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setInputValues(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.id.replace('Input', '')];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      this._submitButton.textContent = 'Сохранение...';
      this._callbackSubmitForm(event, this._getInputValues())
        .then(() => {
          this.close();
        })
        .finally(() => {
          this._submitButton.textContent = this._submitButtonName;
        })
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}