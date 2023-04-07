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
  usernameInput,
  aboutUserInput,
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

const api = new Api();

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
  const card = new Card(cardInfo, '#card-template', handleOpenPopup, openDeleteCardPopup, api);
  return card.getCard();
}

const cardList = new Section({
  renderer: (cardInfo) => {
    cardList.addItem(generateCard(cardInfo), true);
  }
},
'.cards'
);


api.getInitialCards()
  .then(initialCards => {
    cardList.renderItems(initialCards);
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
  
  
  avatar.src = avatarInput.value;

  // avatarPopup.close();
  return api.changeAvatar(avatarInput.value);
}

function openEditProfilePopup() {
  editProfilePopup.open();
  editFormValidator.removeValidationError();
  const info = userInfo.getUserInfo();
  info.then(userInfo => {
    usernameInput.value = userInfo.profileName;
    aboutUserInput.value = userInfo.profileDescription;
  })
}

function addNewCard(event, inputValues) {
  event.preventDefault();
  addCardFormElement.reset();
  
  // addCardPopup.close();
  return api.addNewCard(inputValues)
  .then(cardInfo => {
      return cardList.addItem(generateCard(cardInfo));
    });
}

function changeProfileInfo(event, inputValues) {
  event.preventDefault();
  
  // editProfilePopup.close();
  return userInfo.setUserInfo({
    fullname: inputValues.fullname,
    about: inputValues.about
  })
}

function enableValidation() {
  editFormValidator.enableValidation();
  addCardFormValidator.enableValidation();
  changeAvatarFormValidator.enableValidation();
  
}

function handleOpenPopup(name, link) {
  popupWithImage.open(name, link);
}

userInfo.getUserInfo().then(userInfo => {
  avatar.src = userInfo.avatar;
  username.textContent = userInfo.profileName;
  aboutUser.textContent = userInfo.profileDescription;
})


enableValidation(); 

editButton.addEventListener('click', openEditProfilePopup);

plusButton.addEventListener('click', () => {
  addCardFormElement.reset();
  addCardPopup.open();
  addCardFormValidator.removeValidationError();
  addCardFormValidator.disableSubmitButton();
});

avatarButton.addEventListener('click', () => {
  changeAvatarFormElement.reset();
  avatarPopup.open();
  changeAvatarFormValidator.removeValidationError();
  changeAvatarFormValidator.disableSubmitButton();
})
// fetch('https://mesto.nomoreparties.co/v1/cohort-62/users/me/avatar', {
//   headers: {
//     authorization: 'b2c416ac-9733-4a5c-9da0-2148e2adbd32',
//     'Content-Type': 'application/json'
//   },
//   method: 'PATCH',
//   body: JSON.stringify({
//     avatar: 'https://i.pinimg.com/564x/d1/67/5a/d1675a1dec27a168d581155bf9f239c9.jpg'
//   })
// })




