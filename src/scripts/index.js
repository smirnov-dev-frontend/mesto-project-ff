import '../styles/pages/index.css';
import { initialCards, createCard, handleDeleteCard, handleLikeCard } from './cards.js';
import { initModals, openImagePopup, handleImageClick } from './modal.js';
import { initProfileEditing } from './profile.js';
import { initCardForm } from './form.js';

document.addEventListener('DOMContentLoaded', () => {
   initModals();
   initProfileEditing();
   initCards();
   initCardForm();

   setTimeout(() => {
      document.body.classList.add('page_loaded');
   }, 100);
});

function initCards() {
   const placesWrap = document.querySelector(".places__list");

   initialCards.forEach((data) => {
      placesWrap.append(createCard(data, handleDeleteCard, handleLikeCard, handleImageClick));
   });
}