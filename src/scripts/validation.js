const disableSubmitButton = (button, config) => {
   button.classList.add(config.inactiveButtonClass);
   button.disabled = true;
};

const enableSubmitButton = (button, config) => {
   button.classList.remove(config.inactiveButtonClass);
   button.disabled = false;
};

const showInputError = (form, input, message, config) => {
   const errorElement = form.querySelector(`.popup__error_type_${input.name}`);
   if (!errorElement) return;

   input.classList.add(config.inputErrorClass);
   errorElement.textContent = message;
   errorElement.classList.add(config.errorClass);
};

const hideInputError = (form, input, config) => {
   const errorElement = form.querySelector(`.popup__error_type_${input.name}`);
   if (!errorElement) return;

   input.classList.remove(config.inputErrorClass);
   errorElement.textContent = '';
   errorElement.classList.remove(config.errorClass);
};

const checkInputValidity = (form, input, config) => {
   // 1. Пустое поле
   if (input.validity.valueMissing) {
      showInputError(form, input, input.validationMessage, config);
      return;
   }

   if (input.dataset.pattern) {
      const regExp = new RegExp(input.dataset.pattern);
      if (!regExp.test(input.value.trim())) {
         showInputError(form, input, input.dataset.errorMessage, config);
         return;
      }
   }

   if (input.validity.tooShort || input.validity.tooLong) {
      showInputError(form, input, input.validationMessage, config);
      return;
   }

   if (input.type === 'url' && input.validity.typeMismatch) {
      showInputError(form, input, input.dataset.errorMessage, config);
      return;
   }

   hideInputError(form, input, config);
};

const hasInvalidInput = (inputs) => {
   return inputs.some(input => !input.validity.valid);
};

export const enableValidation = (config) => {
   const forms = Array.from(document.querySelectorAll(config.formSelector));

   forms.forEach(form => {
      const inputs = Array.from(form.querySelectorAll(config.inputSelector));
      const button = form.querySelector(config.submitButtonSelector);

      disableSubmitButton(button, config);

      inputs.forEach(input => {
         input.addEventListener('input', () => {
            checkInputValidity(form, input, config);

            if (hasInvalidInput(inputs)) {
               disableSubmitButton(button, config);
            } else {
               enableSubmitButton(button, config);
            }
         });
      });
   });
};

export const clearValidation = (form, config) => {
   const inputs = Array.from(form.querySelectorAll(config.inputSelector));
   const button = form.querySelector(config.submitButtonSelector);

   inputs.forEach(input => {
      hideInputError(form, input, config);
   });

   disableSubmitButton(button, config);
};
