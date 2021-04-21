import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popup) {
        super(popup);
    }

    //Открытие попапа с картинкой
    open(link, text) {
        const cardPopupImage = this._popup.querySelector('.popup__image');
        const cardPopupText = this._popup.querySelector('.popup__text');

        cardPopupImage.src = link;
        cardPopupImage.setAttribute('alt', `На увеличенном фото ${text}`);
        cardPopupText.textContent = text;

        super.open();
    }
}