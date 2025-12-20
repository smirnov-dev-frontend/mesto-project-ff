import { deleteCard, addLike, removeLike } from './api.js';

export function createCard(
   data,
   { userId, onImageClick }
) {
   const cardTemplate = document
      .querySelector('#card-template')
      .content
      .querySelector('.places__item');

   const cardElement = cardTemplate.cloneNode(true);

   const deleteButton = cardElement.querySelector('.card__delete-button');
   const likeButton = cardElement.querySelector('.card__like-button');
   const likeCount = cardElement.querySelector('.card__like-count');
   const cardImage = cardElement.querySelector('.card__image');
   const cardTitle = cardElement.querySelector('.card__title');

   cardTitle.textContent = data.name;
   cardImage.src = data.link;
   cardImage.alt = data.name;
   likeCount.textContent = data.likes.length;

   if (data.likes.some(user => user._id === userId)) {
      likeButton.classList.add('card__like-button_is-active');
   }

   if (data.owner._id !== userId) {
      deleteButton.remove();
   } else {
      deleteButton.addEventListener('click', () => {
         deleteCard(data._id)
            .then(() => cardElement.remove())
            .catch(err => console.error(err));
      });
   }

   likeButton.addEventListener('click', () => {
      const isLiked = likeButton.classList.contains('card__like-button_is-active');
      const request = isLiked
         ? removeLike(data._id)
         : addLike(data._id);

      request
         .then(updatedCard => {
            likeButton.classList.toggle('card__like-button_is-active');
            likeCount.textContent = updatedCard.likes.length;
            data.likes = updatedCard.likes;
         })
         .catch(err => console.error(err));
   });

   cardImage.addEventListener('click', () =>
      onImageClick(data.link, data.name)
   );

   return cardElement;
}
