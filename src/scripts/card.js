export function createCard(data, { onDeleteCard, onLikeCard, onImageClick } = {}) {
   const cardTemplate = document.querySelector("#card-template").content.querySelector(".places__item");
   const cardElement = cardTemplate.cloneNode(true);

   const deleteButton = cardElement.querySelector(".card__delete-button");
   const likeButton = cardElement.querySelector(".card__like-button");
   const cardImage = cardElement.querySelector(".card__image");

   cardImage.src = data.link;
   cardImage.alt = data.name;
   cardElement.querySelector(".card__title").textContent = data.name;

   if (onDeleteCard) deleteButton.addEventListener("click", onDeleteCard);
   if (onLikeCard) likeButton.addEventListener("click", onLikeCard);
   if (onImageClick) {
      cardImage.addEventListener("click", () => onImageClick(data.link, data.name));
   }

   return cardElement;
}

export function handleLikeCard(evt) {
   evt.target.classList.toggle('card__like-button_is-active');
}

export function handleDeleteCard(evt) {
   evt.target.closest(".card").remove();
}
