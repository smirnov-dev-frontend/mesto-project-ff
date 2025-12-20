const config = {
   baseUrl: 'https://nomoreparties.co/v1/higher-front-back-dev',
   headers: {
      authorization: 'c2774ba4-2ca6-4b0d-ae26-4197f1047d36',
      'Content-Type': 'application/json'
   }
};

function checkResponse(res) {
   if (res.ok) {
      return res.json();
   }
   return Promise.reject(`Ошибка: ${res.status}`);
}

export const getUserInfo = () => {
   return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
   }).then(checkResponse);
};

export const updateUserInfo = ({ name, about }) => {
   return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({ name, about })
   }).then(checkResponse);
};

export const updateAvatar = (avatar) => {
   return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({ avatar })
   }).then(checkResponse);
};

export const getInitialCards = () => {
   return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
   }).then(checkResponse);
};

export const addCard = ({ name, link }) => {
   return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({ name, link })
   }).then(checkResponse);
};

export const deleteCard = (cardId) => {
   return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
   }).then(checkResponse);
};

export const addLike = (cardId) => {
   return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: config.headers
   }).then(checkResponse);
};

export const removeLike = (cardId) => {
   return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: config.headers
   }).then(checkResponse);
};
