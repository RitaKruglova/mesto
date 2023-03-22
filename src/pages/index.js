import './index.css'

import { initialCards } from '../utils/constants.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';


import {
  editButton,
  plusButton,
  addCardFormElement,
  usernameInput,
  aboutUserInput,
  editFormElement,
  validationConfig,
} from '../utils/constants.js';


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

function generateCard(cardInfo) {
  const card = new Card(cardInfo, '#card-template', handleOpenPopup);
  return card.getCard();
}

const cardList = new Section({
    renderer: (cardInfo) => {
      cardList.addItem(generateCard(cardInfo), true);
    }
  },
  '.cards'
);

const editFormValidator = new FormValidator(validationConfig, editFormElement);

const addCardFormValidator = new FormValidator(validationConfig, addCardFormElement);

function openEditProfilePopup() {
  editProfilePopup.open();
  editFormValidator.removeValidationError();
  const info = userInfo.getUserInfo();
  usernameInput.value = info.profileName;
  aboutUserInput.value = info.profileDescription;
}

function addNewCard(event, inputValues) {
  event.preventDefault();
  cardList.addItem(generateCard(inputValues));
  addCardPopup.close();
  addCardFormElement.reset();
}

function changeProfileInfo(event, inputValues) {
  event.preventDefault();
  userInfo.setUserInfo({
    fullname: inputValues.fullname,
    about: inputValues.about
  })
  editProfilePopup.close();
}

function enableValidation() {
  editFormValidator.enableValidation();
  addCardFormValidator.enableValidation();
}

function handleOpenPopup(name, link) {
  popupWithImage.open(name, link);
}

cardList.renderItems(initialCards);

enableValidation(); 

editButton.addEventListener('click', openEditProfilePopup);

plusButton.addEventListener('click', () => {
  addCardFormElement.reset();
  addCardPopup.open();
  addCardFormValidator.removeValidationError();
  addCardFormValidator.disableSubmitButton();
});


