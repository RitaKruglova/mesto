import {
  popups,
  cardsContainer,
  popupEditProfile,
  validators,
  usernameInput,
  aboutUserInput,
  pictureNameInput,
  pictureLinkInput,
  popupAddCard,
  addCardFormElement,
  username,
  aboutUser,
  popupImage,
  popupImageName,
  validationConfig,
  picturePopup,
  editFormElement
} from './constants.js';

import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';


export function closePopupsByOverlay() {
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

export function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
}

export function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
}

export function addInitialCards(initialCards) {
  initialCards.forEach(item => {
    cardsContainer.append(createCard(item));
  })
}

export function openEditProfilePopup() {
  openPopup(popupEditProfile);
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
  closePopup(popupAddCard);
  addCardFormElement.reset();
}

export function changeProfileInfo(event) {
  event.preventDefault();
  username.textContent = usernameInput.value;
  aboutUser.textContent = aboutUserInput.value;
  closePopup(popupEditProfile);
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

function handleOpenPopup(name, link) {
  openPopup(picturePopup);
  popupImage.setAttribute('src', link);
  popupImage.setAttribute('alt', name);
  popupImageName.textContent = name;
}

