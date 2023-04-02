import './index.css'

// import { initialCards } from '../utils/constants.js';
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
  avatar,
} from '../utils/constants.js';
import PopupWithConfirm from '../components/PopupWithConfirm';

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
  avatarSelector: '.profile__avatar'
});

function generateCard(cardInfo) {
  const card = new Card(cardInfo, '#card-template', handleOpenPopup, openDeleteCardPopup);
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

function openDeleteCardPopup(deleteCard) {
  deleteCardPopup.open(deleteCard);
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
  addCardPopup.close();
  addCardFormElement.reset();
  fetch('https://mesto.nomoreparties.co/v1/cohort-62/cards', {
    method: 'POST',
    headers: {
      authorization: 'b2c416ac-9733-4a5c-9da0-2148e2adbd32',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: inputValues.name,
      link: inputValues.link
    })
  })
  .then(res => res.json())
  .then(cardInfo => {
      cardList.addItem(generateCard(cardInfo));
    })
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

userInfo.getUserInfo().then(userInfo => {
  avatar.src = userInfo.avatar;
})


enableValidation(); 

editButton.addEventListener('click', openEditProfilePopup);

plusButton.addEventListener('click', () => {
  addCardFormElement.reset();
  addCardPopup.open();
  addCardFormValidator.removeValidationError();
  addCardFormValidator.disableSubmitButton();
});


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


fetch('https://mesto.nomoreparties.co/v1/cohort-62/cards', {
  headers: {
    authorization: 'b2c416ac-9733-4a5c-9da0-2148e2adbd32',
  }
})
  .then(res => res.json())
  .then(initialCards => {
    cardList.renderItems(initialCards);
  })

