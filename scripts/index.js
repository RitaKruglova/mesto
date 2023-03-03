import Card from './Card.js';
import { initialCards } from './initial-сards.js';
import FormValidator from './FormValidator.js';
import { validationConfig } from './validationConfig.js'

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
const popups = document.querySelectorAll('.popup');
const validators = {};


function createCard(cardInfo) {
  const card = new Card(cardInfo, '#card-template', handleOpenPopup);
  return card.getCard();
}

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
    cardsContainer.append(createCard(item));
  })
}

function openEditProfilePopup() {
  openPopup(popupEditProfile);
  const formValidator = validators[editFormElement.getAttribute('name')];
  formValidator.removeValidationError();
  formValidator.enableSubmitButton();
  usernameInput.value = username.textContent;
  aboutUserInput.value = aboutUser.textContent;
}

function addNewCard(event) {
  event.preventDefault();
  const cardInfo = {
    name: pictureNameInput.value,
    link: pictureLinkInput.value
  }
  cardsContainer.prepend(createCard(cardInfo));
  closePopup(popupAddCard);
  addCardFormElement.reset();
}

function changeProfileInfo(event) {
  event.preventDefault();
  username.textContent = usernameInput.value;
  aboutUser.textContent = aboutUserInput.value;
  closePopup(popupEditProfile);
}

function enableValidation() {
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

enableValidation(); 

resetButtons.forEach(resetButton => {
  resetButton.addEventListener('click', () => closePopup(resetButton.closest('.popup')));
});

editButton.addEventListener('click', openEditProfilePopup);

addCardFormElement.addEventListener('submit', addNewCard);

plusButton.addEventListener('click', () => {
  addCardFormElement.reset();
  openPopup(popupAddCard);
  const formValidator = validators[addCardFormElement.getAttribute('name')];
  formValidator.removeValidationError();
  formValidator.disableSubmitButton();
});

editFormElement.addEventListener('submit', changeProfileInfo);

addInitialCards(initialCards);

closePopupsByOverlay();
