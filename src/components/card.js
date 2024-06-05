

function createCard(cardData, onDelete, likeCard, openCardImage) {
  
  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardItem.querySelector('.card__image');
  const cardDescription = cardItem.querySelector('.card__description');
  const deleteCardButton = cardItem.querySelector('.card__delete-button');
  const cardTitle = cardDescription.querySelector('.card__title');
  const cardLikeButton = cardDescription.querySelectorAll('.card__like-button');

  cardImage.src = cardData.link,
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  deleteCardButton.addEventListener('click', () => onDelete(cardItem));

  cardLikeButton.forEach((button) => {
    button.addEventListener('click', likeCard);
  })

  cardItem.addEventListener('click', openCardImage);

  return cardItem;

}


function deleteCard(card) {
 
  card.remove();

}


function likeCard(event) {
  event.target.classList.toggle('card__like-button_is-active');
}


export { createCard, deleteCard, likeCard};