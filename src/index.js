

import initialCards from "./components/cards.js";
import "./pages/index.css";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openPopup, closePopup, closePopupOverlay } from "./components/modal.js";

const cardsContainer = document.querySelector('.places__list');
const popupEdit = document.querySelector('.popup_type_edit')
const editButton = document.querySelector('.profile__edit-button');
const popupCard = document.querySelector('.popup_type_new-card');
const addButton = document.querySelector('.profile__add-button');
const closePopupBtns = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editForm = document.querySelector('form[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const cardForm = document.querySelector('form[name="new-place"]');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const cardUrlInput = document.querySelector('.popup__input_type_url');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupImgCaption = document.querySelector('.popup__caption');


function openCardImage(cardLink, cardName) {

  popupImage.src = cardLink;
  popupImage.alt = cardName;
  popupImgCaption.textContent = cardName;


  openPopup(popupTypeImage);

}


function handleFormSubmit(event) {

  event.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popupEdit);

}

editForm.addEventListener('submit', handleFormSubmit);
editButton.addEventListener('click', () => {

  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openPopup(popupEdit);

})

function handleFormCard(event) {

  event.preventDefault();

  const cardFormData = {
    name: cardNameInput.value,
    link: new URL(cardUrlInput.value, import.meta.url)
  }

  const card = createCard(cardFormData, deleteCard, likeCard, openCardImage);
  cardsContainer.prepend(card);

  cardForm.reset();

  closePopup(popupCard);

}

cardForm.addEventListener('submit', handleFormCard);
addButton.addEventListener('click', () => {
  openPopup(popupCard);
})


closePopupBtns.forEach((button) => {
  button.addEventListener('click', (event) => {
    const closeButton = button.closest('.popup');
    closePopup(closeButton);
  })
})


closePopupOverlay(popups);


document.addEventListener('DOMContentLoaded', () => {
  popups.forEach((popup) => {
    if (!popup.classList.contains('popup_is-animated')) {
      popup.classList.add('popup_is-animated');
    }
  })
})


initialCards.forEach(function (cardData) {

  const card = createCard(cardData, deleteCard, likeCard, openCardImage);
  cardsContainer.append(card);

});




