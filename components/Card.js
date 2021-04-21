import {PopupWithImage} from './PopupWithImage.js';

export class Card {
    constructor (data, cardTemplateSelector) {
        this._link = data.link;
        this._name = data.name;
        this._cardTemplateSelector = cardTemplateSelector;
    }

    //Темплейт карточки
    _getTemplate() {
        const cardElement = document
        .querySelector(this._cardTemplateSelector)
        .content
        .querySelector('.card')
        .cloneNode(true);
        
        return cardElement;
    }

    //Слушатели событий
    _setEventListeners() {
        this._element.querySelector('.card__like').addEventListener('click', () => {
            this._handleLike();
        });

        this._element.querySelector('.card__delete').addEventListener('click', () => {
            this._deleteCard();
        });

        this._element.querySelector('.card__image').addEventListener('click', () => {
            this._openCardPreview();
        });
    }

    //Лайк карточки
    _handleLike() {
        this._element.querySelector('.card__like').classList.toggle('card__like_active');
    }

    //Удаление карточки
    _deleteCard() {
        this._element.remove();
    }

    //Открытие попапа с картинкой карточки
    _openCardPreview() {
        const cardPreview = document.querySelector('.popup_card');

        const openCardPreview = new PopupWithImage(cardPreview);
        openCardPreview.open(this._link, this._name);
    }


    //Создание карточки
    generateCard() {
        this._element = this._getTemplate();

        //Вынесла оба элемента, так как cardTitle тоже возможно
        //использовать несколько раз в дальнейшем
        const cardImage = this._element.querySelector('.card__image');
        const cardTitle = this._element.querySelector('.card__title');
        
        this._setEventListeners();
        cardImage.style.backgroundImage = 'url(' + this._link + ')';
        cardImage.setAttribute('alt', `На фото ${this._name}`);
        cardTitle.textContent = this._name;

        return this._element;
    }
}
