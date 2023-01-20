const container = document.querySelector('.content');
const editButton = container.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__form');
const usernameInput = formElement.querySelector('.popup__input_type_username');
const aboutUserInput = formElement.querySelector('.popup__input_type_about-user');
const username = container.querySelector('.profile__name');
const aboutUser = container.querySelector('.profile__description');
const resetButton = document.querySelector('.popup__reset-button');



function edit() {
  popup.classList.add('popup_opened');
  usernameInput.value = username.textContent;
  aboutUserInput.value = aboutUser.textContent;
}

editButton.addEventListener('click', edit);



function handleFormSubmit(event) {
  event.preventDefault();
  username.textContent = usernameInput.value;
  aboutUser.textContent = aboutUserInput.value;
  popup.classList.remove('popup_opened');
}

formElement.addEventListener('submit', handleFormSubmit);



function reset(event) {
  popup.classList.remove('popup_opened');
}

resetButton.addEventListener('click', reset);

const cards = container.querySelector('.cards');

const cardTemplate = document.querySelector('#card-template').content;

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

let likeButtons = cards.querySelectorAll('.card__like');

function like(event) {
  event.target.classList.toggle('card__like_active');
}

for (let index = 0; index < likeButtons.length; index++) {
  let likeButton = likeButtons[index];
  likeButton.addEventListener('click', like);
}