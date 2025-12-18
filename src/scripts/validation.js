export function enableValidation(config) {
   const forms = Array.from(document.querySelectorAll(config.formSelector));

   forms.forEach(form => {
      const inputs = Array.from(form.querySelectorAll(config.inputSelector));
      const button = form.querySelector(config.submitButtonSelector);

      const toggleButton = () => {
         const hasInvalid = inputs.some(input => !input.validity.valid || input.dataset.errorPattern && !/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(input.value.trim()));
         if (hasInvalid) {
            button.classList.add(config.inactiveButtonClass);
            button.disabled = true;
         } else {
            button.classList.remove(config.inactiveButtonClass);
            button.disabled = false;
         }
      };

      const showInputError = (input, message) => {
         const errorElement = form.querySelector(`.popup__error_type_${input.name}`);
         if (!errorElement) return;
         input.classList.add(config.inputErrorClass);
         errorElement.textContent = message;
         errorElement.classList.add(config.errorClass);
      };

      const hideInputError = (input) => {
         const errorElement = form.querySelector(`.popup__error_type_${input.name}`);
         if (!errorElement) return;
         input.classList.remove(config.inputErrorClass);
         errorElement.textContent = '';
         errorElement.classList.remove(config.errorClass);
      };

      const checkInputValidity = (input) => {
         const value = input.value.trim();

         if (input.validity.valueMissing) {
            showInputError(input, input.validationMessage);
            return;
         }

         if ((input.name === 'name' || input.name === 'description' || input.name === 'place-name') && value && !/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(value)) {
            showInputError(input, input.dataset.errorMessage);
            return;
         }

         if (input.validity.tooShort || input.validity.tooLong) {
            showInputError(input, input.validationMessage);
            return;
         }

         if (input.type === 'url' && input.validity.typeMismatch) {
            showInputError(input, input.dataset.errorMessage);
            return;
         }

         hideInputError(input);
      };

      inputs.forEach(input => {
         input.addEventListener('input', () => {
            checkInputValidity(input);
            toggleButton();
         });
      });

      toggleButton();
   });
}

export function clearValidation(formElement, config) {
   const inputs = Array.from(formElement.querySelectorAll(config.inputSelector));
   const button = formElement.querySelector(config.submitButtonSelector);

   inputs.forEach(input => {
      input.classList.remove(config.inputErrorClass);
      const errorElement = formElement.querySelector(`.popup__error_type_${input.name}`);
      if (errorElement) {
         errorElement.textContent = '';
         errorElement.classList.remove(config.errorClass);
      }
   });

   button.classList.add(config.inactiveButtonClass);
   button.disabled = true;
}
