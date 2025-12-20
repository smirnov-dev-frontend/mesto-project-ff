export function openModal(popup) {
   popup.classList.add('popup_is-opened');
   document.addEventListener('keydown', handleEscClose);
}


export function closeModal(popup) {
   popup.style.opacity = '0';
   popup.addEventListener('transitionend', () => {
      popup.classList.remove('popup_is-opened');
      popup.style.opacity = '';
   }, { once: true });

   document.removeEventListener('keydown', handleEscClose);
}


function handleEscClose(evt) {
   if (evt.key === 'Escape') {
      const openedModal = document.querySelector('.popup_is-opened');
      if (openedModal) closeModal(openedModal);
   }
}


function overlayClose() {
   const modals = document.querySelectorAll('.popup');
   modals.forEach(popup => {
      popup.addEventListener('mousedown', (evt) => {
         if (evt.target === popup) closeModal(popup);
      });
   });
}


function closeButtons() {
   const modals = document.querySelectorAll('.popup');
   modals.forEach(popup => {
      const closeBtn = popup.querySelector('.popup__close');
      if (closeBtn) closeBtn.addEventListener('click', () => closeModal(popup));
   });
}

export function initModals() {
   overlayClose();
   closeButtons();
}
