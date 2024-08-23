

function openPopup(popup) {

  document.addEventListener('keydown', closePopupByEsc);
  popup.classList.add('popup_is-opened');

}

function closePopup(popup) {

  document.removeEventListener('keydown', closePopupByEsc)
  popup.classList.remove('popup_is-opened');

}

function closePopupByEsc(event) {
  if (event.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
  }
}

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