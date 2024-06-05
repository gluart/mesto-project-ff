

import initialCards from "./components/cards.js";
import "./pages/index.css";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";

const cardsContainer = document.querySelector('.places__list');

const formElement = document.querySelectorAll('.popup__form');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardUrlInput = document.querySelector('.popup__input_type_url');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');


const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const popup = document.querySelectorAll('.popup');


editButton.addEventListener('click', openPopup)
addButton.addEventListener('click', openPopup)

popup.forEach((popup) => {
  popup.addEventListener('click', (event) => closePopup(event, popup));
  popup.addEventListener('keydown', closePopup);
});


function openCardImage(event) {

  const popupTypeImage = document.querySelector('.popup_type_image');
  const popupImage = document.querySelector('.popup__image');
  const popupImageTitle = document.querySelector('.popup__caption');

  if (event.target.classList.contains('card__image')) {

    popupTypeImage.classList.add('popup_is-opened', 'popup_is-animated');

    popupImage.src = event.target.src;
    popupImageTitle.textContent = event.target.alt;
    
  }
}


function handleFormSubmit(event) {

  event.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  formElement[0].removeEventListener('submit', handleFormSubmit);

}


function handleFormCard(event) {

  event.preventDefault();

  const cardFormData = {
    name: cardNameInput.value,
    link: new URL(cardUrlInput.value, import.meta.url)
  }

  function addCard(cardData) {
    
    const card = createCard(cardData, deleteCard, likeCard, openCardImage);
    cardsContainer.prepend(card);

  }

  addCard(cardFormData);

}


formElement[0].addEventListener('submit', handleFormSubmit);
formElement[1].addEventListener('submit', handleFormCard);



initialCards.forEach(function (cardData) {

  const card = createCard(cardData, deleteCard, likeCard, openCardImage);
  cardsContainer.append(card);

});




