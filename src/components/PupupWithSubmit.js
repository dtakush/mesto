import { Popup } from "./Popup.js";

export class PopupWithSubmit extends Popup {
    constructor({popup, setHandleSubmit}) {
        super(popup);
        this._setHandleSubmit = setHandleSubmit;
        this._form = this._popup.querySelector('.popup__form');
    }


    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._setHandleSubmit();
        })
    }
}