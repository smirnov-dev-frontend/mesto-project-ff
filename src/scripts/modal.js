const modals = document.querySelectorAll('.popup');

export function openModal(popup) {
   popup.classList.add('popup_is-opened');
   document.addEventListener('keydown', handleEscClose);
}

export function closeModal(popup) {
   popup.classList.remove('popup_is-opened');
   document.removeEventListener('keydown', handleEscClose);
}

export function openImagePopup(imageSrc, imageAlt, caption) {
   const imagePopup = document.querySelector('.popup_type_image');
   if (!imagePopup) return;

   const popupImage = imagePopup.querySelector('.popup__image');
   const popupCaption = imagePopup.querySelector('.popup__caption');

   if (popupImage && popupCaption) {
      popupImage.src = imageSrc;
      popupImage.alt = imageAlt;
      popupCaption.textContent = caption;

      openModal(imagePopup);
   }
}

export function handleImageClick(imageSrc, imageAlt, caption) {
   openImagePopup(imageSrc, imageAlt, caption);
}

function handleEscClose(evt) {
   if (evt.key === 'Escape') {
      const openedModal = document.querySelector('.popup_is-opened');
      if (openedModal) {
         closeModal(openedModal);
      }
   }
}

function overlayClose() {
   modals.forEach(popup => {
      popup.addEventListener('click', function (evt) {
         if (evt.target === popup) {
            closeModal(popup);
         }
      });
   });
}

function closeButtons() {
   modals.forEach(popup => {
      const closeBtn = popup.querySelector('.popup__close');
      if (closeBtn) {
         closeBtn.addEventListener('click', () => closeModal(popup));
      }
   });
}

function openButtons() {
   const editButton = document.querySelector('.profile__edit-button');
   const editModal = document.querySelector('.popup_type_edit');

   if (editButton && editModal) {
      editButton.addEventListener('click', () => openModal(editModal));
   }

   const addButton = document.querySelector('.profile__add-button');
   const addModal = document.querySelector('.popup_type_new-card');

   if (addButton && addModal) {
      addButton.addEventListener('click', () => openModal(addModal));
   }
}

export function initModals() {
   overlayClose();
   closeButtons();
   openButtons();
}