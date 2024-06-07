

function openPopup(popup) {

  document.addEventListener('keydown', closePopupEsc);
  popup.classList.add('popup_is-opened');

}

function closePopup(popup) {

  document.removeEventListener('keydown', closePopupEsc)
  popup.classList.remove('popup_is-opened');

}

function closePopupEsc(event) {
  if (event.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
  }
}

function closePopupOverlay(popup) {
  popup.forEach((popup) => {
    popup.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup')) {
        closePopup(popup);
      }
    })
  })
}

export {openPopup, closePopup, closePopupOverlay};