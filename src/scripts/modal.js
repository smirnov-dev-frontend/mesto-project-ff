// modal.js — универсальный модуль работы с попапами

// Открыть любой попап
export function openModal(popup) {
   popup.classList.add('popup_is-opened');
   document.addEventListener('keydown', handleEscClose);
}

// Закрыть любой попап
export function closeModal(popup) {
   popup.classList.remove('popup_is-opened');
   document.removeEventListener('keydown', handleEscClose);
}

// Закрытие по Escape
function handleEscClose(evt) {
   if (evt.key === 'Escape') {
      const openedModal = document.querySelector('.popup_is-opened');
      if (openedModal) closeModal(openedModal);
   }
}

// Закрытие по оверлею
function overlayClose() {
   const modals = document.querySelectorAll('.popup');
   modals.forEach(popup => {
      popup.addEventListener('mousedown', (evt) => {
         if (evt.target === popup) closeModal(popup);
      });
   });
}

// Закрытие по кнопке X
function closeButtons() {
   const modals = document.querySelectorAll('.popup');
   modals.forEach(popup => {
      const closeBtn = popup.querySelector('.popup__close');
      if (closeBtn) closeBtn.addEventListener('click', () => closeModal(popup));
   });
}

// Инициализация всех базовых закрытий попапов
export function initModals() {
   overlayClose();
   closeButtons();
}
