import { Popup } from "./Popup.js";


export class PopupWithForm extends Popup {
    constructor({popup, handleFormSubmit}) {
        super(popup);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popup.querySelector('.popup__form');
    }

    close() {
        super.close();

        this._form.reset();
    }

    _getInputValues() {
        //Все элементы полей
        this._inputList = this._form.querySelectorAll('.popup__input');
        
        //Пустой объект
        this._formValues = [];

        //Добавление в объект значения всех полей
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
          });

        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this._form.reset();
        });
    }
}