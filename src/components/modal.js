
// Функция открытия попапа

function openPopup(popup) {

  document.addEventListener('keydown', closePopupByEsc);
  popup.classList.add('popup_is-opened');

}

// Функция закрытия попапа

function closePopup(popup) {

  document.removeEventListener('keydown', closePopupByEsc);
  popup.classList.remove('popup_is-opened');

}

// Функция закрытия попапа клавишей - ESCAPE

function closePopupByEsc(event) {
  if (event.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
  }
}

// Функция закрытия попапа нажатием на - OVERLAY

function closePopupByOverlay(popup) {
  popup.forEach((popup) => {
    popup.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup')) {
        closePopup(popup);
      }
    })
  })
}

export {openPopup, closePopup, closePopupByOverlay};