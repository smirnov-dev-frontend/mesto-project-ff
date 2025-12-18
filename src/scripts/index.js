import '../styles/pages/index.css';
import { initialCards } from './cards.js';
import { createCard, handleDeleteCard, handleLikeCard } from './card.js';
import { initModals, openModal, closeModal } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';

document.addEventListener('DOMContentLoaded', () => {
   initModals();
   initProfileEditing();
   initCards();
   initCardForm();
   enableValidation();
});

function initCards() {
   const placesWrap = document.querySelector(".places__list");

   initialCards.forEach((data) => {
      const cardElement = createCard(data, {
         onDeleteCard: handleDeleteCard,
         onLikeCard: handleLikeCard,
         onImageClick: openImagePopup
      });
      placesWrap.append(cardElement);
   });
}

function openImagePopup(imageSrc, imageAlt) {
   const imagePopup = document.querySelector('.popup_type_image');
   const popupImage = imagePopup.querySelector('.popup__image');
   const popupCaption = imagePopup.querySelector('.popup__caption');

   popupImage.src = imageSrc;
   popupImage.alt = imageAlt;
   popupCaption.textContent = imageAlt;

   openModal(imagePopup);
}

function initProfileEditing() {
   const editButton = document.querySelector('.profile__edit-button');
   const editModal = document.querySelector('.popup_type_edit');
   const formElement = editModal.querySelector('form[name="edit-profile"]');
   const nameInput = formElement.querySelector('input[name="name"]');
   const jobInput = formElement.querySelector('input[name="description"]');
   const profileName = document.querySelector('.profile__title');
   const profileJob = document.querySelector('.profile__description');

   editButton.addEventListener('click', () => {
      nameInput.value = profileName.textContent;
      jobInput.value = profileJob.textContent;
      clearValidation(formElement);
      openModal(editModal);
   });

   formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      profileName.textContent = nameInput.value.trim();
      profileJob.textContent = jobInput.value.trim();
      closeModal(editModal);
   });
}

function initCardForm() {
   const addButton = document.querySelector('.profile__add-button');
   const addModal = document.querySelector('.popup_type_new-card');
   const formElement = addModal.querySelector('form[name="new-place"]');
   const nameInput = formElement.querySelector('input[name="place-name"]');
   const linkInput = formElement.querySelector('input[name="link"]');
   const placesWrap = document.querySelector('.places__list');

   addButton.addEventListener('click', () => {
      formElement.reset();
      clearValidation(formElement);
      openModal(addModal);
   });

   formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();

      const newCardData = { name: nameInput.value.trim(), link: linkInput.value.trim() };
      if (!newCardData.name || !newCardData.link) return;

      const newCardElement = createCard(newCardData, {
         onDeleteCard: handleDeleteCard,
         onLikeCard: handleLikeCard,
         onImageClick: openImagePopup
      });

      placesWrap.prepend(newCardElement);
      formElement.reset();
      closeModal(addModal);
   });
}
