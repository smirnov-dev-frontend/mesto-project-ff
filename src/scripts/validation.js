const validationConfig = {
   formSelector: '.popup__form',
   inputSelector: '.popup__input',
   submitButtonSelector: '.popup__button',
   inactiveButtonClass: 'popup__button_disabled',
   inputErrorClass: 'popup__input_type_error',
   errorClass: 'popup__error_visible'
};

function showInputError(formElement, inputElement, errorMessage) {
   const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.name}`);
   if (!errorElement) return;
   inputElement.classList.add(validationConfig.inputErrorClass);
   errorElement.textContent = errorMessage;
   errorElement.classList.add(validationConfig.errorClass);
}

function hideInputError(formElement, inputElement) {
   const errorElement = formElement.querySelector(`.popup__error_type_${inputElement.name}`);
   if (!errorElement) return;
   inputElement.classList.remove(validationConfig.inputErrorClass);
   errorElement.textContent = '';
   errorElement.classList.remove(validationConfig.errorClass);
}

function checkInputValidity(formElement, inputElement) {
   const value = inputElement.value.trim();

   if (inputElement.validity.valueMissing) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
      return;
   }

   if (inputElement.validity.tooShort || inputElement.validity.tooLong) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
      return;
   }

   if (inputElement.name === 'name' || inputElement.name === 'description') {
      const regex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
      if (!regex.test(value)) {
         showInputError(formElement, inputElement, 'Разрешены только буквы, пробелы и дефисы');
         return;
      }
   }

   hideInputError(formElement, inputElement);
}

function toggleButtonState(inputList, buttonElement) {
   const hasError = inputList.some(input => {
      const value = input.value.trim();

      if (input.validity.valueMissing) return true;
      if (input.validity.tooShort || input.validity.tooLong) return true;
      if ((input.name === 'name' || input.name === 'description') && !/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(value)) return true;

      return false;
   });

   if (hasError) {
      buttonElement.classList.add(validationConfig.inactiveButtonClass);
      buttonElement.disabled = true;
   } else {
      buttonElement.classList.remove(validationConfig.inactiveButtonClass);
      buttonElement.disabled = false;
   }
}

function setEventListeners(formElement) {
   const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
   const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

   toggleButtonState(inputList, buttonElement);

   inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
         checkInputValidity(formElement, inputElement);
         toggleButtonState(inputList, buttonElement);
      });
   });
}

export function enableValidation() {
   const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
   formList.forEach(formElement => setEventListeners(formElement));
}

export function clearValidation(formElement) {
   const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
   const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

   inputList.forEach(inputElement => hideInputError(formElement, inputElement));
   toggleButtonState(inputList, buttonElement);
}
