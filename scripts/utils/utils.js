import {
  // popups,
  cardsContainer,
  // popupEditProfile,
  validators,
  usernameInput,
  aboutUserInput,
  pictureNameInput,
  pictureLinkInput,
  // popupAddCard,
  addCardFormElement,
  username,
  aboutUser,
  popupImage,
  popupImageName,
  validationConfig,
  editFormElement
} from './constants.js';

import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Popup from '../components/Popup.js';


// export function closePopupsByOverlay() {
//   popups.forEach(popup => {
//     popup.addEventListener('click', (event) => {
//       if (event.target === event.currentTarget) {
//         closePopup(popup);
//       }});
//   });
// }

// function closePopupByEscape(event) {
//   if (event.key === 'Escape') {
//     const popup = document.querySelector('.popup_opened');
//     closePopup(popup);
//   }
// }

// export function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', closePopupByEscape);
// }

// export function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closePopupByEscape);
// }
export const editProfilePopup = new Popup('.popup_type_edit-profile');
export const addCardPopup = new Popup('.popup_type_add-card');
export const picturePopup = new Popup('.popup_type_picture');

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
  picturePopup.open();
  popupImage.setAttribute('src', link);
  popupImage.setAttribute('alt', name);
  popupImageName.textContent = name;
}

