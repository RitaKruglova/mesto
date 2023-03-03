export default class FormValidator {
  constructor(selectors, form) {
    this._form = form;
    this._selectors = selectors;
    this._inputs = this._form.querySelectorAll('.popup__input');
  }

  enableValidation() {
    this._form.addEventListener('submit', this._cancelStandartBehavior)
    this._setEventListeners();
  }

  _cancelStandartBehavior(event) {
    event.preventDefault();
  }

  _setEventListeners() {
    const submitButton = this._form.querySelector(this._selectors.submitButtonSelector);
    this._inputs.forEach(input => {
      input.addEventListener('input', event => {
        this._checkValidity(event);
        this._toggleSubmitButton(submitButton);
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

  _showError(input, error, inputErrorClass) {
    input.classList.add(inputErrorClass);
    error.textContent = input.validationMessage;
  }

  _hideError(input, error, inputErrorClass) {
    input.classList.remove(inputErrorClass);
    error.textContent = '';
  }

  _toggleSubmitButton(submitButton) {
    if (this._isAllInputsValid()) {
      submitButton.removeAttribute('disabled');
      submitButton.classList.remove(this._selectors.inactiveButtonClass);
    } else {
      submitButton.setAttribute('disabled', true);
      submitButton.classList.add(this._selectors.inactiveButtonClass);
    }
  }

  _isAllInputsValid() {
    const inputs = Array.from(this._inputs);
    return inputs.every(input => input.validity.valid);
  }

  removeValidationError() {
    this._form.querySelectorAll(this._selectors.inputSelector).forEach(input => {
      const error = input.nextElementSibling;
      this._hideError(input, error, this._selectors.inputErrorClass);
    })
  }

  disableSubmitButton(submitButton) {
    submitButton.setAttribute('disabled', true);
    submitButton.classList.add('popup__submit-button_disabled');
  }

  enableSubmitButton(submitButton) {
    submitButton.removeAttribute('disabled');
    submitButton.classList.remove('popup__submit-button_disabled');
  }
  
}