import Card from './Card.js';
import { initialCards } from './initial-сards.js';
import FormValidator from './FormValidator.js';
import { selectors } from './selectors.js'

const container = document.querySelector('.content');
const editButton = container.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const editFormElement = document.querySelector('.popup__form_type_edit-profile');
const usernameInput = editFormElement.querySelector('.popup__input_type_username');
const aboutUserInput = editFormElement.querySelector('.popup__input_type_about-user');
const username = container.querySelector('.profile__name');
const aboutUser = container.querySelector('.profile__description');
const resetButtons = document.querySelectorAll('.popup__reset-button');
const plusButton = container.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add-card');
const cardsContainer = container.querySelector('.cards');
const picturePopup = document.querySelector('.popup_type_picture');
const popupImage = document.querySelector('.popup__image');
const popupImageName = document.querySelector('.popup__image-name');
const addCardFormElement = document.querySelector('.popup__form_type_add-card');
const pictureNameInput = document.querySelector('.popup__input_type_picture-name');
const pictureLinkInput = document.querySelector('.popup__input_type_picture-link');
const addCardButton = document.querySelector('.popup__submit-button_type_add-card');
const popups = document.querySelectorAll('.popup');
const editProfileSubmitButton = document.querySelector('.popup__submit-button_type_edit-profile');

function closePopupsByOverlay() {
  popups.forEach(popup => {
  popup.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      closePopup(popup);
    }});
  });
}

function closePopupByEscape(event) {
  if (event.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
}

function addInitialCards(initialCards) {
  initialCards.forEach(item => {
    const card = new Card(item, '#card-template');
    cardsContainer.append(card.getCard());
  })
}

function openPicturePopup(name, link) {
  openPopup(picturePopup);
  popupImage.setAttribute('src', link);
  popupImage.setAttribute('alt', name);
  popupImageName.textContent = name;
}

function openEditProfilePopup() {
  openPopup(popupEditProfile);
  removeValidationErrors(editFormElement);
  enableSubmitButton(editProfileSubmitButton);
  usernameInput.value = username.textContent;
  aboutUserInput.value = aboutUser.textContent;
}

function addNewCard(event) {
  event.preventDefault();
  const cardInfo = {
    name: pictureNameInput.value,
    link: pictureLinkInput.value
  }
  const card = new Card(cardInfo, '#card-template');
  cardsContainer.prepend(card.getCard());
  closePopup(popupAddCard);
  addCardFormElement.reset();
}

function changeProfileInfo(event) {
  event.preventDefault();
  username.textContent = usernameInput.value;
  aboutUser.textContent = aboutUserInput.value;
  closePopup(popupEditProfile);
}

function showError(input, error, inputErrorClass) {
  input.classList.add(inputErrorClass);
  error.textContent = input.validationMessage;
}

function hideError(input, error, inputErrorClass) {
  input.classList.remove(inputErrorClass);
  error.textContent = '';
}

function disableSubmitButton(submitButton) {
  submitButton.setAttribute('disabled', true);
  submitButton.classList.add('popup__submit-button_disabled');
}

function enableSubmitButton(submitButton) {
  submitButton.removeAttribute('disabled');
  submitButton.classList.remove('popup__submit-button_disabled');
}

function removeValidationErrors(form) {
  form.querySelectorAll('.popup__input').forEach(input => {
    const error = input.nextElementSibling;
    hideError(input, error, selectors.inputErrorClass);
  })
}

function enableValidation() {
  const forms = document.querySelectorAll('.popup__form');
  forms.forEach(form => {
    const formValidator = new FormValidator(selectors, form);
    formValidator.enableValidation();
  });
}


enableValidation(); 

resetButtons.forEach(resetButton => {
  resetButton.addEventListener('click', () => closePopup(resetButton.closest('.popup')));
});

editButton.addEventListener('click', openEditProfilePopup);

addCardFormElement.addEventListener('submit', addNewCard);

plusButton.addEventListener('click', () => {
  addCardFormElement.reset();
  openPopup(popupAddCard);
  removeValidationErrors(addCardFormElement);
  disableSubmitButton(addCardButton);
});

editFormElement.addEventListener('submit', changeProfileInfo);

addInitialCards(initialCards);

closePopupsByOverlay();

export { showError, hideError }
