import { initialCards } from '../utils/constants.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';


import {
  editButton,
  editFormElement,
  plusButton,
  addCardFormElement,
  validators,
  
} from '../utils/constants.js';

import {
  enableValidation,
  changeProfileInfo,
  addNewCard,
  openEditProfilePopup,
  handleOpenPopup,
  addCardPopup
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

editButton.addEventListener('click', openEditProfilePopup);

addCardFormElement.addEventListener('submit', addNewCard);

plusButton.addEventListener('click', () => {
  addCardFormElement.reset();
  addCardPopup.open();
  const formValidator = validators[addCardFormElement.getAttribute('name')];
  formValidator.removeValidationError();
  formValidator.disableSubmitButton();
});

editFormElement.addEventListener('submit', changeProfileInfo);

