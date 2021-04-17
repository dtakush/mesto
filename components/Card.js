import {openPopup} from '../pages/index.js';
import {closePopup} from '../pages/index.js';

export class Card {
    constructor (link, title, cardTemplateSelector) {
        this._link = link;
        this._title = title;
        this._cardTemplateSelector = cardTemplateSelector;
        //console.log(this._cardTemplateSelector);
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
        const cardPreviewImage = cardPreview.querySelector('.popup__image');
        const cardPreviewText = cardPreview.querySelector('.popup__text');

        openPopup(cardPreview);

        cardPreviewImage.src = this._link;
        cardPreviewImage.setAttribute('alt', `На увеличенном фото ${this._name}`);
        cardPreviewText.textContent = this._name;

        cardPreview.querySelector('.popup__close_card').addEventListener('click', () => closePopup(cardPreview));
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
        cardImage.setAttribute('alt', `На фото ${this._title}`);
        cardTitle.textContent = this._title;

        return this._element;
    }
}
