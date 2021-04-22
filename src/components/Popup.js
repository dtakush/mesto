export class Popup {
    constructor(popup) {
        this._popup = popup;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleOlerlayClose = this._handleOlerlayClose.bind(this);
    }

    //Открытие попапа
    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
        this._popup.addEventListener('mousedown', this._handleOlerlayClose);
    }

    //Закрытие попапа
    close() {
        this._popup.classList.remove('popup_opened');

        document.removeEventListener('keydown', this._handleEscClose);
        this._popup.removeEventListener('mousedown', this._handleOlerlayClose);
    }

    //Закрытие попапа клавишей Esc
    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        };
    }

    //Закрытие попапап кликом на оверлей
    _handleOlerlayClose(evt) {
        if (evt.target == evt.currentTarget) {
            this.close();
        }
    }

    //Слушатели событий
    setEventListeners() {
        const closeButton = this._popup.querySelector('.popup__close');
        closeButton.addEventListener('click', () => this.close());
    }


}