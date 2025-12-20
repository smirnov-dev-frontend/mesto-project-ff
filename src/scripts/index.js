import '../styles/pages/index.css';
import { createCard } from './card.js';
import { initModals, openModal, closeModal } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { getUserInfo, getInitialCards, updateUserInfo, addCard, updateAvatar } from './api.js';

const validationConfig = {
   formSelector: '.popup__form',
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__button',
   inactiveButtonClass: 'popup__button_disabled',
   inputErrorClass: 'popup__input_type_error',
   errorClass: 'popup__error_visible'
};

let userId;

document.addEventListener('DOMContentLoaded', () => {
   initModals();
   enableValidation(validationConfig);

   Promise.all([getUserInfo(), getInitialCards()])
      .then(([userData, cards]) => {
         userId = userData._id;
         fillUserInfo(userData);
         renderInitialCards(cards);
      })
      .catch(console.error);

   initProfileEditing();
   initCardForm();
   initAvatarEditing();
});

function fillUserInfo({ name, about, avatar }) {
   document.querySelector('.profile__title').textContent = name;
   document.querySelector('.profile__description').textContent = about;
   document.querySelector('.profile__image').src = avatar;
}

function handleFormSubmitWithLoading(form, makeRequest) {
   const submitButton = form.querySelector(validationConfig.submitButtonSelector);
   const initialText = submitButton.textContent;

   submitButton.textContent = 'Сохранение...';
   submitButton.disabled = true;

   makeRequest()
      .catch(console.error)
      .finally(() => {
         submitButton.textContent = initialText;
         submitButton.disabled = false;
      });
}

function initProfileEditing() {
   const editButton = document.querySelector('.profile__edit-button');
   const popup = document.querySelector('.popup_type_edit');
   const form = popup.querySelector('form[name="edit-profile"]');
   const nameInput = form.querySelector('input[name="name"]');
   const aboutInput = form.querySelector('input[name="description"]');

   editButton.addEventListener('click', () => {
      nameInput.value = document.querySelector('.profile__title').textContent;
      aboutInput.value = document.querySelector('.profile__description').textContent;
      clearValidation(form, validationConfig);
      openModal(popup);
   });

   form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      handleFormSubmitWithLoading(form, () =>
         updateUserInfo({
            name: nameInput.value.trim(),
            about: aboutInput.value.trim()
         }).then((userData) => {
            fillUserInfo(userData);
            closeModal(popup);
         })
      );
   });
}

function renderInitialCards(cards) {
   const container = document.querySelector('.places__list');
   container.innerHTML = '';

   cards.forEach((cardData) => {
      const card = createCard(cardData, {
         userId,
         onImageClick: openImagePopup
      });
      container.append(card);
   });
}

function openImagePopup(link, name) {
   const popup = document.querySelector('.popup_type_image');
   popup.querySelector('.popup__image').src = link;
   popup.querySelector('.popup__image').alt = name;
   popup.querySelector('.popup__caption').textContent = name;
   openModal(popup);
}

function initCardForm() {
   const addButton = document.querySelector('.profile__add-button');
   const popup = document.querySelector('.popup_type_new-card');
   const form = popup.querySelector('form[name="new-place"]');
   const nameInput = form.querySelector('input[name="place-name"]');
   const linkInput = form.querySelector('input[name="link"]');
   const container = document.querySelector('.places__list');

   addButton.addEventListener('click', () => {
      form.reset();
      clearValidation(form, validationConfig);
      openModal(popup);
   });

   form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      handleFormSubmitWithLoading(form, () =>
         addCard({
            name: nameInput.value.trim(),
            link: linkInput.value.trim()
         }).then((cardData) => {
            const card = createCard(cardData, {
               userId,
               onImageClick: openImagePopup
            });
            container.prepend(card);
            form.reset();
            clearValidation(form, validationConfig);
            closeModal(popup);
         })
      );
   });
}

function initAvatarEditing() {
   const avatarButton = document.querySelector('.profile__avatar-edit-button');
   const popup = document.querySelector('.popup_type_avatar');
   const form = popup.querySelector('form[name="edit-avatar"]');
   const avatarInput = form.querySelector('input[name="avatar"]');
   const avatarImage = document.querySelector('.profile__image');

   avatarButton.addEventListener('click', () => {
      form.reset();
      clearValidation(form, validationConfig);
      openModal(popup);
   });

   form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      handleFormSubmitWithLoading(form, () =>
         updateAvatar(avatarInput.value.trim()).then((userData) => {
            avatarImage.src = userData.avatar;
            closeModal(popup);
         })
      );
   });
}
