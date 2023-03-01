import { showError, hideError } from "./index.js";

export default class FormValidator {
  constructor(selectors, form) {
    this._form = form;
    this._selectors = selectors;
  }

  enableValidation() {
    this._form.addEventListener('submit', this._cancelStandartBehavior)
    this._setEventListeners();
  }

  _cancelStandartBehavior(event) {
    event.preventDefault();
  }

  _setEventListeners() {
    const inputs = this._form.querySelectorAll('.popup__input');
    const submitButton = this._form.querySelector(this._selectors.submitButtonSelector);
    inputs.forEach(input => {
      input.addEventListener('input', event => {
        this._checkValidity(event);
        this._toggleSubmitButton(inputs, submitButton);
      })
    })
  }

  _checkValidity(event) {
    const input = event.target;
    const error = input.nextElementSibling;

    if (input.validity.valid) {
      hideError(input, error, this._selectors.inputErrorClass);
    } else {
      showError(input, error, this._selectors.inputErrorClass);
    }
  }

  _toggleSubmitButton(inputs, submitButton) {
    if (this._isAllInputsValid(inputs)) {
      submitButton.removeAttribute('disabled');
      submitButton.classList.remove(this._selectors.inactiveButtonClass);
    } else {
      submitButton.setAttribute('disabled', true);
      submitButton.classList.add(this._selectors.inactiveButtonClass);
    }
  }

  _isAllInputsValid(inputs) {
    inputs = Array.from(inputs);
    return inputs.every(input => input.validity.valid);
  }
  
}