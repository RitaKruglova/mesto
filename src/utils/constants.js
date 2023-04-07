

const container = document.querySelector('.content');
const editButton = container.querySelector('.profile__edit-button');
const editFormElement = document.querySelector('.popup__form_type_edit-profile');
const usernameInput = editFormElement.querySelector('.popup__input_type_username');
const aboutUserInput = editFormElement.querySelector('.popup__input_type_about-user');
const username = container.querySelector('.profile__name');
const aboutUser = container.querySelector('.profile__description');
const plusButton = container.querySelector('.profile__add-button');
const addCardFormElement = document.querySelector('.popup__form_type_add-card');
const pictureNameInput = document.querySelector('.popup__input_type_picture-name');
const pictureLinkInput = document.querySelector('.popup__input_type_picture-link');
const avatar = document.querySelector('.profile__avatar');
const deleteCardButton = document.querySelector('.popup__submit-button_place_delete-card');
const changeAvatarFormElement = document.querySelector('.popup__form_type_avatar');
const avatarInput = document.querySelector('.popup__input_type_avatar');
const avatarButton = document.querySelector('.profile__avatar-overlay');


export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export {
  editButton,
  editFormElement,
  usernameInput,
  aboutUserInput,
  username,
  aboutUser,
  plusButton,
  addCardFormElement,
  pictureNameInput,
  pictureLinkInput,
  avatar,
  deleteCardButton,
  changeAvatarFormElement,
  avatarInput,
  avatarButton
}