
// Функция показа ошибок
const showInputError = (formElement, inputElement, errorMessage, errorClass, inputErrorClass) => {
  
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

// Функция скрытия ошибок
const hideInputError = (formElement, inputElement, errorClass, inputErrorClass) => {

  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
}

// Передача кастомных сообщений
// Условие проверки на валидность - вызов функции показа ошибок соответственно
const isValid = (formElement, inputElement, config) => {
  
  if (inputElement.validity.patternMismatch) {

    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {

    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    
    showInputError(formElement, inputElement, inputElement.validationMessage, config.errorClass, config.inputErrorClass);
  } else {

    hideInputError(formElement, inputElement, config.errorClass, config.inputErrorClass);
  }
}


const setEventListeners = (formElement, config) => {

  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  
  inputList.forEach((inputElement) => {
    
    // Слушатель события для инпутов формы
    inputElement.addEventListener('input', () => {
      
      isValid(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config.inactiveButtonClass);
    })
  })

  const hasInvalidInput = (inputList) => {
    
    return inputList.some((inputElement) => {
      
      return !inputElement.validity.valid;
    })
  }
  
  // Функция состояния кнопки
  const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    
    if (hasInvalidInput(inputList)) {

      buttonElement.disabled = true;
      buttonElement.classList.add(inactiveButtonClass);      
    } else {
      
      buttonElement.disabled = false;
      buttonElement.classList.remove(inactiveButtonClass);
    }
  }

  return toggleButtonState(inputList, buttonElement, config.inactiveButtonClass);
  
}

// Функция поиска всех форм на странице
const enableValidation = (config) => {

  const formList = Array.from(document.querySelectorAll(config.formSelector));
  
  formList.forEach((formElement) => {
    
    setEventListeners(formElement, config);
  })
}

// Очиска валидаци форм
const clearValidation = (formList, config) => {

  const inputList = Array.from(formList.querySelectorAll(config.inputSelector));
  
  inputList.forEach((inputElement) => {
  
    hideInputError(formList, inputElement, config.errorClass, config.inputErrorClass);
    setEventListeners(formList, config);
  })
}

export { enableValidation, clearValidation };