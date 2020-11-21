const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    inputInvalidClass: '.popup__input_invalid',
    submitButtonSelector: '.popup__save-button',
    submitButtonInvalidClass: '.popup__save-button_invalid'
}


//Показать сообщение об ошибке
const showInputError = (form, input) => {
    const error = form.querySelector(`#${input.id}-error`);
    input.classList.add(`popup__input_invalid`);
    error.textContent = input.validationMessage;
};


//Скрыть сообщение об ошибке
const hideInputError = (form, input) => {
    const error = form.querySelector(`#${input.id}-error`);
    input.classList.remove(`popup__input_invalid`);
    error.textContent = '';
};

//Проверка валидации полей ввода
const checkInputValidity = (form, input) => {
    if (!input.validity.valid) {
        showInputError(form, input);
    } else {
        hideInputError(form, input);
    }
};

//Активация/дезактивация кнопки
function setButtonState (button, isActive) {
    if(isActive) {
        button.classList.remove('popup__save-button_invalid');
        button.disabled === false;
    } else {
        button.classList.add('popup__save-button_invalid');
        button.disabled === true;
    }
}

//Добавление обработчиков события на поля ввода
function setEventListeners(form) {
    const inputArr = form.querySelectorAll('.popup__input');
    const buttonElement = form.querySelector('.popup__save-button');

    inputArr.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidity(form, input);
            setButtonState(buttonElement, form.checkValidity());
        })
    });
    }

function resetValidation (form) {
    
}    


//Выборка форм на странице
function enableValidation() {
    const forms = document.querySelectorAll('.popup__form');
    forms.forEach((form) => {
         setEventListeners(form);

        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })

        const buttonElement = form.querySelector('.popup__save-button');
        setButtonState(buttonElement, form.checkValidity());
    })
        
    }

enableValidation();