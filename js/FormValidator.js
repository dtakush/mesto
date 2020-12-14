export class FormValidator {
    constructor(obj, form) {
        this._obj = obj;
        this._form = form;
    }

    //Показать сообщение об ошибке
    _showInputError(form, input) {
        const error = form.querySelector(`#${input.id}-error`);
        input.classList.remove(this._obj.inputInvalidClass);
        error.textContent = input.validationMessage;
    }
    
    //Скрыть сообщение об ошибке
    _hideInputError (form, input) {
        const error = form.querySelector(`#${input.id}-error`);
        input.classList.remove(this._obj.inputInvalidClass);
        error.textContent = '';
    }

    //Проверка валидации полей ввода
    _checkInputValidity (form, input) {
        if (!input.validity.valid) {
            this._showInputError(form, input);
        } else {
            this._hideInputError(form, input);
        }
    }

    //Активация/дезактивация кнопки
    _setButtonState (button, isActive) {
        if(isActive) {
            button.classList.remove(this._obj.submitButtonInvalidClass);
            button.disabled = false;
        } else {
            button.classList.add(this._obj.submitButtonInvalidClass);
            button.disabled = true;
        }
    }

    //Добавление обработчиков события на поля ввода
    _setEventListeners(form) {
        const inputArr = form.querySelectorAll(this._obj.inputSelector);
        const buttonElement = form.querySelector(this._obj.submitButtonSelector);
    
        inputArr.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(form, input);
                this._setButtonState(buttonElement, form.checkValidity());
            })
        });
    }

    //Выборка форм на странице
    enableValidation() {
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });

        this._setEventListeners(this._form);

        const buttonElement = this._form.querySelector(this._obj.submitButtonSelector);
        this._setButtonState(buttonElement, this._form.checkValidity());
    }

    //Сброс видимости ошибок при открытии окна
    resetValidation () {
        const inputsArr = this._form.querySelectorAll(this._obj.inputSelector);

        inputsArr.forEach((input) => {
            this._hideInputError(this._form, input);
        });
    }
}