import {
  cardsContainer,
  validators,
  usernameInput,
  aboutUserInput,
  pictureNameInput,
  pictureLinkInput,
  addCardFormElement,
  username,
  aboutUser,
  validationConfig,
  editFormElement
} from './constants.js';

import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Popup from '../components/Popup.js';
import PopupWithImage from '../components/PopupWithImage.js';


export const editProfilePopup = new Popup('.popup_type_edit-profile');
export const addCardPopup = new Popup('.popup_type_add-card');

const popupWithImage = new PopupWithImage('.popup_type_picture');

export function openEditProfilePopup() {
  editProfilePopup.open();
  const formValidator = validators[editFormElement.getAttribute('name')];
  formValidator.removeValidationError();
  formValidator.enableSubmitButton();
  usernameInput.value = username.textContent;
  aboutUserInput.value = aboutUser.textContent;
}

export function addNewCard(event) {
  event.preventDefault();
  const cardInfo = {
    name: pictureNameInput.value,
    link: pictureLinkInput.value
  }
  cardsContainer.prepend(createCard(cardInfo));
  addCardPopup.close();
  addCardFormElement.reset();
}

export function changeProfileInfo(event) {
  event.preventDefault();
  username.textContent = usernameInput.value;
  aboutUser.textContent = aboutUserInput.value;
  editProfilePopup.close();
}

function createCard(cardInfo) {
  const card = new Card(cardInfo, '#card-template', handleOpenPopup);
  return card.getCard();
}

export function enableValidation() {
  const forms = document.querySelectorAll('.popup__form');
  forms.forEach(form => {
    const formValidator = new FormValidator(validationConfig, form);
    validators[form.getAttribute('name')] = formValidator;
    formValidator.enableValidation();
  });
}

export function handleOpenPopup(name, link) {
  popupWithImage.open(name, link);
}

