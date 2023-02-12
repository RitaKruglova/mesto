const container = document.querySelector('.content');
const editButton = container.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const editFormElement = document.querySelector('.popup__form_type_edit-profile');
const usernameInput = editFormElement.querySelector('.popup__input_type_username');
const aboutUserInput = editFormElement.querySelector('.popup__input_type_about-user');
const username = container.querySelector('.profile__name');
const aboutUser = container.querySelector('.profile__description');
const resetButtons = document.querySelectorAll('.popup__reset-button');
const addButton = container.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add-card');
const cardsContainer = container.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;
const picturePopup = document.querySelector('.popup_type_picture');
const popupImage = document.querySelector('.popup__image');
const popupImageName = document.querySelector('.popup__image-name');
const addCardFormElement = document.querySelector('.popup__form_type_add-card');
const pictureNameInput = document.querySelector('.popup__input_type_picture-name');
const pictureLinkInput = document.querySelector('.popup__input_type_picture-link');
const addCardButton = document.querySelector('.popup__submit-button_type_add-card');
const recycleBinButtons = document.querySelectorAll('.card__recycle-bin');
const popupForms = document.querySelectorAll('.popup');
const inputErrorClass = 'popup__input_type_error';


function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  const popupForm = popup.querySelector('.popup__form');
  if (popupForm) {
    popupForm.reset();
    popupForm.querySelectorAll('.popup__input').forEach(input => {
      const error = input.nextElementSibling;
      console.log(input);
      hideError(input, error, inputErrorClass)
    })
    const submitButton = popupForm.querySelector('.popup__submit-button');
    submitButton.removeAttribute('disabled');
    submitButton.classList.remove('popup__submit-button_disabled');
  }
}

function createCard(name, link) {
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  cardImage.setAttribute('src', link);
  cardImage.setAttribute('alt', name);
  card.querySelector('.card__title').textContent = name;
  card.querySelector('.card__recycle-bin').addEventListener('click', deleteCard);
  card.querySelector('.card__like').addEventListener('click', like);
  cardImage.addEventListener('click', () => openPicturePopup(name, link));
  return card;
}

function addInitialCards(initialCards) {
  for (let i = 0; i < initialCards.length; i++) {
    const cardData = initialCards[i];
    const card = createCard(cardData['name'], cardData['link']);
    cardsContainer.append(card);
  }
}

function openPicturePopup(name, link) {
  openPopup(picturePopup);
  popupImage.setAttribute('src', link);
  popupImage.setAttribute('alt', name);
  popupImageName.textContent = name;
}

function like(event) {
  event.target.classList.toggle('card__like_active');
}

function openEditProfilePopup() {
  openPopup(popupEditProfile);
  usernameInput.value = username.textContent;
  aboutUserInput.value = aboutUser.textContent;
}

function deleteCard(event) {
  event.target.closest('.card').remove();
}

function addNewCard(event) {
  event.preventDefault();
  const card = createCard(pictureNameInput.value, pictureLinkInput.value);
  cardsContainer.prepend(card);
  closePopup(popupAddCard);
  addCardFormElement.reset();
  
}

function changeProfileInfo(event) {
  event.preventDefault();
  username.textContent = usernameInput.value;
  aboutUser.textContent = aboutUserInput.value;
  closePopup(popupEditProfile);
}

popupForms.forEach(popup => {
  popup.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      closePopup(popup);
    }
  })
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closePopup(popup);
    }
  })
})

resetButtons.forEach(item => {
  item.addEventListener('click', () => closePopup(item.closest('.popup')));
});

editButton.addEventListener('click', openEditProfilePopup);

addCardFormElement.addEventListener('submit', addNewCard);

addButton.addEventListener('click', () => openPopup(popupAddCard));

editFormElement.addEventListener('submit', changeProfileInfo);

addInitialCards(initialCards);
