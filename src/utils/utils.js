import {
  cardsContainer,
  validators,
  usernameInput,
  aboutUserInput,
  pictureNameInput,
  pictureLinkInput,
  addCardFormElement,
  validationConfig,
  editFormElement
} from './constants.js';

import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';


export const editProfilePopup = new PopupWithForm('.popup_type_edit-profile', changeProfileInfo);
editProfilePopup.setEventListeners();

export const addCardPopup = new PopupWithForm('.popup_type_add-card', addNewCard);
addCardPopup.setEventListeners();

const popupWithImage = new PopupWithImage('.popup_type_picture');
popupWithImage.setEventListeners();

const userInfo = new UserInfo({
  usernameSelector: '.profile__name',
  aboutUserSelector: '.profile__description'
});

export function openEditProfilePopup() {
  editProfilePopup.open();
  const formValidator = validators[editFormElement.getAttribute('name')];
  formValidator.removeValidationError();
  const info = userInfo.getUserInfo();
  usernameInput.value = info.profileName;
  aboutUserInput.value = info.profileDescription;
}

export function addNewCard(event, inputValues) {
  event.preventDefault();
  cardsContainer.prepend(createCard(inputValues));
  addCardPopup.close();
  addCardFormElement.reset();
}

export function changeProfileInfo(event, inputValues) {
  event.preventDefault();
  userInfo.setUserInfo({
    fullname: inputValues.fullname,
    about: inputValues.about
  })
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

