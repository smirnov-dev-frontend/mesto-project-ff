import { openModal, closeModal } from './modal.js';
import { openImagePopup, handleImageClick } from './modal.js';
import { createCard, handleDeleteCard, handleLikeCard } from './cards.js';

export function initCardForm() {
   const addForm = document.querySelector('form[name="new-place"]');
   const addButton = document.querySelector('.profile__add-button');
   const addModal = document.querySelector('.popup_type_new-card');

   const cardNameInput = addForm.querySelector('input[name="place-name"]');
   const cardLinkInput = addForm.querySelector('input[name="link"]');
   const placesWrap = document.querySelector('.places__list');

   addButton.addEventListener('click', () => {
      addForm.reset();
      openModal(addModal);
   });

   function handleAddFormSubmit(evt) {
      evt.preventDefault();

      const cardName = cardNameInput.value.trim();
      const cardLink = cardLinkInput.value.trim();

      if (!cardName || !cardLink) {
         return;
      }

      const newCardData = {
         name: cardName,
         link: cardLink
      };

      const newCardElement = createCard(newCardData, handleDeleteCard, handleLikeCard, handleImageClick);
      placesWrap.prepend(newCardElement);

      closeModal(addModal);
      addForm.reset();
   }

   addForm.addEventListener('submit', handleAddFormSubmit);
}