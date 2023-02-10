selectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

function cancelStandartBehavior(event) {
  event.preventDefault();
}

function enableValidation(selectors) {
  const forms = document.querySelectorAll(selectors.formSelector);
  forms.forEach(form => {
    form.addEventListener('submit', cancelStandartBehavior);
    setEventListeners(form, selectors);
  });
}

function isValidInput(inputs) {
  inputs = Array.from(inputs);
  return inputs.every(input => input.validity.valid);
}

function toggleSubmitButton(inputs, submitButton, selectors) {
  if (isValidInput(inputs)) {
    submitButton.removeAttribute('disabled');
    submitButton.classList.remove(selectors.inactiveButtonClass);
  } else {
    submitButton.setAttribute('disabled', true);
    submitButton.classList.add(selectors.inactiveButtonClass);
  }
}

function checkValidity(event, selectors) {
  const input = event.target;
  const error = input.nextElementSibling;
  
  if (input.validity.valid) {
    input.classList.remove(selectors.inputErrorClass);
    error.textContent = '';
  } else {
    input.classList.add(selectors.inputErrorClass);
    error.textContent = input.validationMessage;
  }
}


function setEventListeners(form, selectors) {
  const inputs = form.querySelectorAll(selectors.inputSelector);
  const submitButton = form.querySelector(selectors.submitButtonSelector);
  inputs.forEach(input => {
    input.addEventListener('input', event => {
      checkValidity(event, selectors);
      toggleSubmitButton(inputs, submitButton, selectors)
    })
  })
}



enableValidation(selectors); 