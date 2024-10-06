
import "./pages/index.css";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openPopup, closePopup, closePopupByOverlay } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import { getUserData, getInitialCards, updateUser, pushNewCard, updateAvatarUser } from "./components/api.js";

const cardsContainer = document.querySelector('.places__list');
const popupProfile = document.querySelector('.popup_type_edit')
const profileButton = document.querySelector('.profile__edit-button');
const popupCard = document.querySelector('.popup_type_new-card');
const addButton = document.querySelector('.profile__add-button');
const closePopupBtns = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileForm = document.querySelector('form[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const cardForm = document.querySelector('form[name="new-place"]');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardUrlInput = document.querySelector('.popup__input_type_url');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupImgCaption = document.querySelector('.popup__caption');
const avatarForm = document.querySelector('form[name="update-avatar"]');
const profileAvatar = document.querySelector('.profile__image');
const popupTypeAvatar = document.querySelector('.popup_type_avatar');
const inputTypeAvatar = document.querySelector('.popup__input_type_avatar')
const overlayAvatar = document.querySelector('.profile__image_overlay');


// Функция открытия формы аватара
function handleAvatar() {

  openPopup(popupTypeAvatar);
  clearValidation(avatarForm, configValidation);
}

overlayAvatar.addEventListener('click', handleAvatar);


function handleAvatarForm(event) {

  event.preventDefault();

  const avatar = inputTypeAvatar.value;
  const popupButton = avatarForm.querySelector('.popup__button');
  const defaultText = popupButton.textContent;

  popupButton.textContent = 'Сохранение...';
  popupButton.classList.add('save');
  
  updateAvatarUser(avatar)
    .then((res) => {

      profileAvatar.src = res.avatar;
      avatarForm.reset();
      closePopup(popupTypeAvatar);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {

      popupButton.textContent = defaultText;
      popupButton.classList.remove('save');
    })
}

avatarForm.addEventListener('submit', handleAvatarForm);

// Функция открытия картинки
function openCardImage(cardLink, cardName) {

  popupImage.src = cardLink;
  popupImage.alt = cardName;
  popupImgCaption.textContent = cardName;

  openPopup(popupTypeImage);
}



// Функция формы "Редактировать профиль" при сохранении профиля
function handleFormSubmit(event) {

  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  const popupButton = profileForm.querySelector('.popup__button');
  const defaultText = popupButton.textContent;

  popupButton.textContent = 'Сохранение...';
  popupButton.classList.add('save');

  updateUser(profileName.textContent, profileDescription.textContent)
    .then((res) => {

      profileName.textContent = res.name;
      profileDescription.textContent = res.about;
      profileForm.reset();
      closePopup(popupProfile);
    })
    .catch((error => {

      console.log(error)
    }))
    .finally(() => {

      popupButton.textContent = defaultText;
      popupButton.classList.remove('save');
    })
}

// Слушатель формы "Редактировать профиль", при сохранении
profileForm.addEventListener('submit', handleFormSubmit);



// Функция обработки формы "Редактировать профиль" при открытии попапа
function handleProfile() {

  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;

  openPopup(popupProfile);
  clearValidation(profileForm, configValidation);
}

// Слушатель кнопки "Редактировать профиль"
profileButton.addEventListener('click', handleProfile);



// Функция обработки попапа "Новое место", сохранение карточки
function handleFormCard(event) {

  event.preventDefault();

  const newCardData = {
    name: cardNameInput.value,
    link: new URL(cardUrlInput.value, import.meta.url),
  }
  
  const popupButton = cardForm.querySelector('.popup__button');
  const defaultText = popupButton.textContent;

  popupButton.textContent = 'Сохранение...'
  popupButton.classList.add('save');

  pushNewCard(newCardData.name, newCardData.link)
    .then((cardData) => {

      const card = createCard(cardData, deleteCard, likeCard, openCardImage, myUserID);
      cardsContainer.prepend(card);
      cardForm.reset();
      closePopup(popupCard);
    })
    .catch(((error) => {

      console.log(error);
    }))
    .finally(() => {

      popupButton.textContent = defaultText;
      popupButton.classList.remove('save');
    })
}

// Слушатель формы "Новое место" при сохранении карточки
cardForm.addEventListener('submit', handleFormCard);



// Слушатель кнопки - формы "Новое место"
addButton.addEventListener('click', () => {
  openPopup(popupCard);
  clearValidation(cardForm, configValidation);
})



// Слушатели для кнопок закрыия попапов
// Вызов функуции закрытия попапов
closePopupBtns.forEach((button) => {
  button.addEventListener('click', (event) => {
    const closeButton = button.closest('.popup');
    closePopup(closeButton);
  })
})



// Вызов функции закрытия попапов нажатием на OVERLAY
closePopupByOverlay(popups);



// Слушатель для плавной анимации
document.addEventListener('DOMContentLoaded', () => {
  popups.forEach((popup) => {
    if (!popup.classList.contains('popup_is-animated')) {
      popup.classList.add('popup_is-animated');
    }
  })
})




// Объект классов
const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}


// Функция вызова валидации форм на странице
enableValidation(configValidation);

let myUserID;

Promise.all([getUserData(), getInitialCards()])
  .then(([userData, cardData]) => {

    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about
    profileAvatar.src = `${userData.avatar}`;
    myUserID = userData._id;

    console.log(cardData);

    cardData.forEach((cardData) => {

      const cardElement = createCard(cardData, deleteCard, likeCard, openCardImage, myUserID);
      cardsContainer.append(cardElement);
    })
  })
  .catch((error) => {
    console.log(error);
  })
