//Показать сообщение об ошибке
const showInputError = (form, input, obj) => {
    const error = form.querySelector(`#${input.id}-error`);
    input.classList.add(`${obj.inputInvalidClass}`);
    error.textContent = input.validationMessage;
};


//Скрыть сообщение об ошибке
const hideInputError = (form, input, obj) => {
    const error = form.querySelector(`#${input.id}-error`);
    input.classList.remove(`${obj.inputInvalidClass}`);
    error.textContent = '';
};

//Проверка валидации полей ввода
const checkInputValidity = (form, input, obj) => {
    if (!input.validity.valid) {
        showInputError(form, input, obj);
    } else {
        hideInputError(form, input, obj);
    }
};

//Активация/дезактивация кнопки
function setButtonState (button, isActive, obj) {
    if(isActive) {
        button.classList.remove(`${obj.submitButtonInvalidClass}`);
        button.disabled === false;
    } else {
        button.classList.add(`${obj.submitButtonInvalidClass}`);
        button.disabled === true;
    }
}

//Добавление обработчиков события на поля ввода
function setEventListeners(form, obj) {
    const inputArr = form.querySelectorAll(`.${obj.inputSelector}`);
    const buttonElement = form.querySelector(`.${obj.submitButtonSelector}`);

    inputArr.forEach((input) => {
        input.addEventListener('input', () => {
            checkInputValidity(form, input, obj);
            setButtonState(buttonElement, form.checkValidity(), obj);
        })
    });
}


//Сброс настроек валидации при открытии окна
/*function resetValidation (form, obj) {
    const errorArr = form.querySelectorAll(obj.errorSelector);    
    errorArr.forEach((error) => {
        error.textContent = '';
    });

    const inputArr = form.querySelectorAll(obj.inputSelector);
    inputArr.forEach((input) => {
        input.classList.remove(obj.inputInvalidClass);
    });
}*/


//Выборка форм на странице
function enableValidation(obj) {
    const forms = document.querySelectorAll(`.${obj.formSelector}`);
    forms.forEach((form) => {
        setEventListeners(form, obj);

        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })

        const buttonElement = form.querySelector(`.${obj.submitButtonSelector}`);
        setButtonState(buttonElement, form.checkValidity(), obj);
    })
}
        
const validationObj = {
    formSelector: 'popup__form',
    inputSelector: 'popup__input',
    errorSelector: 'popup__error',
    inputInvalidClass: 'popup__input_invalid',
    submitButtonSelector: 'popup__save-button',
    submitButtonInvalidClass: 'popup__save-button_invalid',
};


enableValidation(validationObj);