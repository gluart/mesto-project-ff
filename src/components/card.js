import { eraseCard, addLike, removeLike } from "./api.js";

// Функция создания карточки
function createCard(cardData, onDelete, likeCard, openCardImage, myUserID) {

  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardItem.querySelector('.card__image');
  const cardDescription = cardItem.querySelector('.card__description');
  const deleteCardButton = cardItem.querySelector('.card__delete-button');
  const cardTitle = cardDescription.querySelector('.card__title');
  const cardLikeCount = cardItem.querySelector('.card-like-count');
  const likeButton = cardItem.querySelector('.card__like-button');

  cardImage.src = cardData.link,
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardLikeCount.textContent = cardData.likes.length;

  deleteCardButton.addEventListener('click', () => onDelete(cardItem, cardData._id));

  likeButton.addEventListener('click', (event) => {

    likeCard(event, cardData._id, cardLikeCount);
  })

  if (cardData.likes.some(like => like._id === myUserID)) {
    
    likeButton.classList.add('card__like-button_is-active');
  }

  cardImage.addEventListener('click', () => openCardImage(cardData.link, cardData.name));

  if (cardData.owner._id === myUserID) {
    
    deleteCardButton.classList.remove('card__delete-button_hidden');
  } else {

    deleteCardButton.classList.add('card__delete-button_hidden');
  }

  return cardItem;

}

// Функция удаления карточки
function deleteCard(card, cardID) {
  
  eraseCard(cardID)
    .then(() => {
    card.remove();
  })
    .catch((error) => {
      console.log(error);
    })

}

// Функция лайка карточки
function likeCard(event, cardID, cardLikeCount) {
    
  if (!event.target.classList.contains('card__like-button_is-active')) {
    
    addLike(cardID)
      .then((cardData) => {
      
        event.target.classList.add('card__like-button_is-active');
        cardLikeCount.textContent = cardData.likes.length;
      })
      .catch((error) => {
        console.log(error);
      })

  } else {
    
    removeLike(cardID)
      .then((cardData) => {
        
        event.target.classList.remove('card__like-button_is-active');
        cardLikeCount.textContent = cardData.likes.length;
      })
      .catch((error) => {
        console.log(error);
      })
  }    
}


export { createCard, deleteCard, likeCard};