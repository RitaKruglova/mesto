import { initialCards } from '../utils/constants.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';

import {
  editButton,
  editFormElement,
  resetButtons,
  plusButton,
  popupAddCard,
  addCardFormElement,
  validators,
  
} from '../utils/constants.js';

import {
  enableValidation,
  changeProfileInfo,
  addNewCard,
  openEditProfilePopup,
  closePopupsByOverlay,
  closePopup,
  openPopup,
  handleOpenPopup
} from '../utils/utils.js';

const cardList = new Section({
    items: initialCards,
    renderer: (cardInfo) => {
      const card = new Card(cardInfo, '#card-template', handleOpenPopup);
      return card.getCard();
    }
  },
  '.cards'
);

cardList.renderItems();

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

closePopupsByOverlay();
