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
const cards = container.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;
const picturePopup = document.querySelector('.popup_type_picture');
const popupImage = document.querySelector('.popup__image');
const popupImageName = document.querySelector('.popup__image-name');
const addCardFormElement = document.querySelector('.popup__form_type_add-card');
const pictureNameInput = document.querySelector('.popup__input_type_picture-name');
const pictureLinkInput = document.querySelector('.popup__input_type_picture-link');
const addCardButton = document.querySelector('.popup__submit-button_type_add-card');


const initialCards = [
  {
    name: 'Киото',
    link: 'https://images.unsplash.com/photo-1602764363500-e8e8455de955?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80'
  },
  {
    name: 'Окинава',
    link: 'https://images.unsplash.com/photo-1625548894051-8ddd8650c6ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
  },
  {
    name: 'Аокигахара',
    link: 'https://images.unsplash.com/photo-1579667246776-bb648259a001?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  },
  {
    name: 'Осака',
    link: 'https://images.unsplash.com/photo-1589451765662-547fb5445bb8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80'
  },
  {
    name: 'Фудзи',
    link: 'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
  },
  {
    name: 'Токио',
    link: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  }
]; 

function addInitialCards(initialCards) {
  for (let i = 0; i < initialCards.length; i++) {
    const cardImage = cardTemplate.querySelector('.card__image');
    const cardTitle = cardTemplate.querySelector('.card__title');
    cardImage.setAttribute('src', initialCards[i]['link']);
    cardImage.setAttribute('alt', initialCards[i]['name']);
    cardTitle.textContent = initialCards[i]['name'];
    const card = cardTemplate.cloneNode(true);
    cards.append(card);
  }
}

addInitialCards(initialCards);

const cardImages = container.querySelectorAll('.card__image');

function openPicturePopup(event) {
  picturePopup.classList.add('popup_opened');
  popupImage.setAttribute('src', event.target.src);
  popupImageName.textContent = event.target.parentElement.querySelector('.card__title').textContent;
}

cardImages.forEach(item => {
  item.addEventListener('click', openPicturePopup);
})




const likeButtons = cards.querySelectorAll('.card__like');

function like(event) {
  event.target.classList.toggle('card__like_active');
}

for (let index = 0; index < likeButtons.length; index++) {
  const likeButton = likeButtons[index];
  likeButton.addEventListener('click', like);
  
}


function openEditProfilePopup() {
  popupEditProfile.classList.add('popup_opened');
  usernameInput.value = username.textContent;
  aboutUserInput.value = aboutUser.textContent;
}

editButton.addEventListener('click', openEditProfilePopup);


function openAddCardPopup() {
  popupAddCard.classList.add('popup_opened');
}

addButton.addEventListener('click', openAddCardPopup);


const recycleBinButtons = document.querySelectorAll('.card__recycle-bin');

function deleteButton(event) {
  event.target.closest('.card').remove();
}

recycleBinButtons.forEach(item => {
  item.addEventListener('click', deleteButton);
})


function addNewCard(event) {
  event.preventDefault();
  const card = cardTemplate.cloneNode(true);
  const cardImage = card.querySelector('.card__image');
  cardImage.setAttribute('src', pictureLinkInput.value);
  cardImage.setAttribute('alt', pictureNameInput.value);
  card.querySelector('.card__title').textContent = pictureNameInput.value;
  card.querySelector('.card__like').addEventListener('click', like);
  cardImage.addEventListener('click', openPicturePopup);
  card.querySelector('.card__recycle-bin').addEventListener('click', deleteButton);
  cards.prepend(card);
  popupAddCard.classList.remove('popup_opened');
  pictureNameInput.value = '';
  pictureLinkInput.value = '';
}

addCardFormElement.addEventListener('submit', addNewCard);

function handleFormSubmit(event) {
  event.preventDefault();
  username.textContent = usernameInput.value;
  aboutUser.textContent = aboutUserInput.value;
  popupEditProfile.classList.remove('popup_opened');
}

editFormElement.addEventListener('submit', handleFormSubmit);

resetButtons.forEach(item => {
  item.addEventListener('click', function() {
    item.parentElement.parentElement.classList.remove('popup_opened');
    document.querySelectorAll('.popup__input').forEach(item => {
      item.value = '';
    })
  })
});




