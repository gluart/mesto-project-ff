// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import initialCards from "./cards.js";


const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');


function createCard(cardData, onDelete) {

  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardItem.querySelector('.card__image');
  const cardDescription = cardItem.querySelector('.card__description');
  const deleteCardButton = cardItem.querySelector('.card__delete-button');
  const cardTitle = cardDescription.querySelector('.card__title');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteCardButton.addEventListener('click', () => onDelete(cardItem));

  return cardItem;

}

function deleteCard(card) {
 
  card.remove();

}

initialCards.forEach(function (cardData) {

  const card = createCard(cardData, deleteCard);
  cardsContainer.append(card);
  
});