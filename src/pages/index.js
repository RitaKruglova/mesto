import './index.css'


import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api';


import {
  editButton,
  plusButton,
  addCardFormElement,
  editFormElement,
  validationConfig,
  avatar,
  username,
  aboutUser,
  changeAvatarFormElement,
  avatarInput,
  avatarButton
} from '../utils/constants.js';
import PopupWithConfirm from '../components/PopupWithConfirm';

let userId;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    authorization: 'b2c416ac-9733-4a5c-9da0-2148e2adbd32',
    'Content-Type': 'application/json'
  }
});

const deleteCardPopup = new PopupWithConfirm('.popup_type_delete-card', '.popup__confirm-button', );
deleteCardPopup.setEventListeners();

const editProfilePopup = new PopupWithForm('.popup_type_edit-profile', changeProfileInfo);
editProfilePopup.setEventListeners();

const addCardPopup = new PopupWithForm('.popup_type_add-card', addNewCard);
addCardPopup.setEventListeners();

const popupWithImage = new PopupWithImage('.popup_type_picture');
popupWithImage.setEventListeners();

const userInfo = new UserInfo({
  usernameSelector: '.profile__name',
  aboutUserSelector: '.profile__description',
  avatarSelector: '.profile__avatar',
  api: api
});


function generateCard(cardInfo) {
  const card = new Card(cardInfo, '#card-template', handleOpenPopup, openDeleteCardPopup, api, userId);
  return card.getCard();
}

const cardList = new Section({
  renderer: (cardInfo) => {
    cardList.addItem(generateCard(cardInfo), true);
  }
},
'.cards'
);

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    cardList.renderItems(cards);
    userId = userData._id;
    avatar.src = userData.avatar;
    username.textContent = userData.name;
    aboutUser.textContent = userData.about;
  })

const editFormValidator = new FormValidator(validationConfig, editFormElement);

const addCardFormValidator = new FormValidator(validationConfig, addCardFormElement);

const changeAvatarFormValidator = new FormValidator(validationConfig, changeAvatarFormElement);

const avatarPopup = new PopupWithForm('.popup_type_avatar', changeAvatar);
avatarPopup.setEventListeners();

function openDeleteCardPopup(deleteCard) {
  deleteCardPopup.open(deleteCard);
}

function changeAvatar(event) {
  event.preventDefault(); 
  return api.changeAvatar(avatarInput.value)
    .then(data => {
      userInfo.setUserInfo(data);
    });
}

function openEditProfilePopup() {
  editProfilePopup.open();
  editFormValidator.removeValidationError();
  editProfilePopup.setInputValues(userInfo.getUserInfo());
}

function addNewCard(event, inputValues) {
  event.preventDefault();
  return api.addNewCard(inputValues)
  .then(cardInfo => {
      return cardList.addItem(generateCard(cardInfo));
    });
}

function changeProfileInfo(event, inputValues) {
  event.preventDefault();
  return api.setUserInfo({
    fullname: inputValues.fullname,
    about: inputValues.about
  })
    .then(data => {
      userInfo.setUserInfo(data);
      return {}
    });
}

function enableValidation() {
  editFormValidator.enableValidation();
  addCardFormValidator.enableValidation();
  changeAvatarFormValidator.enableValidation();
  
}

function handleOpenPopup(name, link) {
  popupWithImage.open(name, link);
}

enableValidation(); 

editButton.addEventListener('click', openEditProfilePopup);

plusButton.addEventListener('click', () => {
  addCardPopup.open();
  addCardFormValidator.removeValidationError();
  addCardFormValidator.disableSubmitButton();
});

avatarButton.addEventListener('click', () => {
  avatarPopup.open();
  changeAvatarFormValidator.removeValidationError();
  changeAvatarFormValidator.disableSubmitButton();
})





