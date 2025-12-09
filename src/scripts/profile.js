import { openModal, closeModal } from './modal.js';

export function initProfileEditing() {

   const formElement = document.querySelector('form[name="edit-profile"]');
   const editModal = document.querySelector('.popup_type_edit');
   const editButton = document.querySelector('.profile__edit-button');

   const nameInput = formElement.querySelector('input[name="name"]');
   const jobInput = formElement.querySelector('input[name="description"]');
   const profileNameElement = document.querySelector('.profile__title');
   const profileJobElement = document.querySelector('.profile__description');

   function fillFormWithCurrentValues() {
      if (nameInput && profileNameElement) {
         nameInput.value = profileNameElement.textContent;
      }
      if (jobInput && profileJobElement) {
         jobInput.value = profileJobElement.textContent;
      }
   }

   editButton.addEventListener('click', () => {
      fillFormWithCurrentValues();
      openModal(editModal);
   });

   function handleFormSubmit(evt) {
      evt.preventDefault();

      const newName = nameInput.value;
      const newJob = jobInput.value;

      if (profileNameElement) {
         profileNameElement.textContent = newName;
      }
      if (profileJobElement) {
         profileJobElement.textContent = newJob;
      }

      closeModal(editModal);
   }

   formElement.addEventListener('submit', handleFormSubmit);
}