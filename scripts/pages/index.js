import { initialCards } from '../utils/constants.js';

import {
  editButton,
  editFormElement,
  resetButtons,
  plusButton,
  popupAddCard,
  addCardFormElement,
  validators
} from '../utils/constants.js';

import {
  enableValidation,
  changeProfileInfo,
  addNewCard,
  openEditProfilePopup,
  addInitialCards,
  closePopupsByOverlay,
  closePopup,
  openPopup
} from '../utils/utils.js';


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
