export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  }
];

// Функция создания карточки
export function createCard(data, deleteCallback, likeCallback, imageClickCallback) {
  const cardTemplate = document.querySelector("#card-template").content.querySelector(".places__item");
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector(".card__title").textContent = data.name;

  deleteButton.addEventListener("click", deleteCallback);
  likeButton.addEventListener("click", likeCallback);

  cardImage.addEventListener("click", () => {
    imageClickCallback(data.link, data.name, data.name);
  });

  return cardElement;
}

// Функция обработки лайка
export function handleLikeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

// Функция удаления карточки
export function handleDeleteCard(evt) {
  evt.target.closest(".card").remove();
}