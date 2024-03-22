// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import initialCards from "./cards.js";


const cardTemplate = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list'); 


initialCards.forEach(function (elem, i) {

  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardItem.querySelector('.card__image');
  const cardDescription = cardItem.querySelector('.card__description');
  const deleteCardButton = cardItem.querySelector('.card__delete-button');
  const cardTitle = cardDescription.querySelector('.card__title');

  cardImage.src = initialCards[i].link;
  cardImage.alt = initialCards[i].name;
  cardTitle.textContent = initialCards[i].name;

  placesList.append(cardItem);

  deleteCardButton.addEventListener('click', deleteCard);

});

function deleteCard(event) {
 
  const eventTarget = event.target.closest('.card').remove();

}