

function openPopup(event) {

  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
  const popupCard = document.querySelector('.popup_type_new-card');
  const popupEdit = document.querySelector('.popup_type_edit');
  const nameInput = document.querySelector('.popup__input_type_name');
  const jobInput = document.querySelector('.popup__input_type_description');

  if (event.target.classList.contains('profile__edit-button')) {
    popupEdit.classList.add('popup_is-opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
  }

  if (event.target.classList.contains('profile__add-button')) {
    popupCard.classList.add('popup_is-opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
  }

}

function closePopup(event) {

  const popup = event.currentTarget;

  if (
    event.target.classList.contains('popup') || 
    event.target.classList.contains('popup__close') || 
    event.target.classList.contains('popup__button') || 
    event.key === 'Escape'
  ) {
    popup.classList.remove('popup_is-opened');
    popup.removeEventListener('click', closePopup);
    popup.removeEventListener('keydown', closePopup);
  }
}

export {openPopup, closePopup};