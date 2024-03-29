export default class FormValidator {
  constructor(selectors, form) {
    this._form = form;
    this._selectors = selectors;
    this._inputs = Array.from(this._form.querySelectorAll('.popup__input'));
    this._submitButton = this._form.querySelector('.popup__submit-button');
  }

  enableValidation() {
    this._form.addEventListener('submit', this._cancelStandartBehavior)
    this._setEventListeners();
  }

  _cancelStandartBehavior(event) {
    event.preventDefault();
  }

  _setEventListeners() {
    this._inputs.forEach(input => {
      input.addEventListener('input', event => {
        this._checkValidity(event);
        this._toggleSubmitButton();
      })
    })
  }

  _checkValidity(event) {
    const input = event.target;
    const error = input.nextElementSibling;

    if (input.validity.valid) {
      this._hideError(input, error, this._selectors.inputErrorClass);
    } else {
      this._showError(input, error, this._selectors.inputErrorClass);
    }
  }

  _showError(input, error) {
    input.classList.add(this._selectors.inputErrorClass);
    error.textContent = input.validationMessage;
  }

  _hideError(input, error) {
    input.classList.remove(this._selectors.inputErrorClass);
    error.textContent = '';
  }

  _toggleSubmitButton() {
    if (this._isAllInputsValid()) {
      this.enableSubmitButton();
    } else {
      this.disableSubmitButton();
    }
  }

  _isAllInputsValid() {
    return this._inputs.every(input => input.validity.valid);
  }

  removeValidationError() {
    this._inputs.forEach(input => {
      const error = input.nextElementSibling;
      this._hideError(input, error, this._selectors.inputErrorClass);
    })
  }

  disableSubmitButton() {
    this._submitButton.setAttribute('disabled', true);
    this._submitButton.classList.add(this._selectors.inactiveButtonClass);
  }

  enableSubmitButton() {
    this._submitButton.removeAttribute('disabled');
    this._submitButton.classList.remove(this._selectors.inactiveButtonClass);
  }
  
}