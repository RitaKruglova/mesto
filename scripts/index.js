let container = document.querySelector('.content');
let editButton = container.querySelector('.profile__edit-button');
let likeButtons = container.querySelectorAll('.card__like');
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__form');
let usernameInput = formElement.querySelector('.popup__username');
let aboutUserInput = formElement.querySelector('.popup__about-user');
let username = container.querySelector('.profile__name');
let aboutUser = container.querySelector('.profile__description');
let resetButton = document.querySelector('.popup__reset-button');

function like(event) {
  event.target.classList.toggle('card__like_active');
  
}

for (let index = 0; index < likeButtons.length; index++) {
  let likeButton = likeButtons[index];
  likeButton.addEventListener('click', like);
}

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