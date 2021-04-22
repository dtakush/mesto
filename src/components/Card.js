export class Card {
    constructor ({data, handleCardClick, cardTemplateSelector}) {
        this._link = data.link;
        this._name = data.name;
        this._cardTemplateSelector = cardTemplateSelector;
        this.handleCardClick = handleCardClick;
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
        this._element.querySelector('.card__delete').addEventListener('click', () => {
            this._deleteCard();
        });

        this._element.querySelector('.card__image').addEventListener('click', () => {
            this.handleCardClick();
        });
    }

    //Лайк карточки
    _handleLike() {
        this._element.querySelector('.card__like').addEventListener('click', () => {
            this._element.querySelector('.card__like').classList.toggle('card__like_active');
        });
    }

    //Удаление карточки
    _deleteCard() {
        this._element.remove();
    }

    //Создание карточки
    generateCard() {
        this._element = this._getTemplate();

        //Вынесла оба элемента, так как cardTitle тоже возможно
        //использовать несколько раз в дальнейшем
        const cardImage = this._element.querySelector('.card__image');
        const cardTitle = this._element.querySelector('.card__title');
        
        this._setEventListeners();
        this._handleLike();
        
        cardImage.style.backgroundImage = 'url(' + this._link + ')';
        cardImage.setAttribute('alt', `На фото ${this._name}`);
        cardTitle.textContent = this._name;

        return this._element;
    }
}
