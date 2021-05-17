export class Card {
    constructor ({data, handleCardClick, handleDeleteCard, handleLikeClick, cardTemplateSelector}, userId) {
        this._link = data.link;
        this._name = data.name;
        this._ownerId = data.owner._id;
        this._userId = userId;
        this._like = data.likes;
        this._cardTemplateSelector = cardTemplateSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._handleLikeClick = handleLikeClick;
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
            this._handleDeleteCard();
        });

        this._element.querySelector('.card__image').addEventListener('click', () => {
            this._handleCardClick();
        });
    }

    //Лайк карточки
    _handleLike() {
        this._element.querySelector('.card__like-image').addEventListener('click', () => {
            this._handleLikeClick();
        });

    }

    isLiked() {
        return this._isLiked;
    }

    //Добавление и удаление лаков
    matchLikes(data){
        const cardLikeImage = this._element.querySelector('.card__like-image');
        const cardLikeNumber = this._element.querySelector('.card__like-number');

        this._isLiked = data.likes.filter((item) => {
            return item._id === this._userId;
        }).length > 0;

        if(this._isLiked) {
            cardLikeImage.classList.add('card__like-image_active');
            cardLikeNumber.textContent = data.likes.length;
        } else {
            cardLikeImage.classList.remove('card__like-image_active');
            cardLikeNumber.textContent = data.likes.length;
        }
    }

    //Удаление карточки
    deleteCard() {
        this._element.remove();
        this._element = null;
    }

    //Показать кнопку удаления карточки
    _showDeleteButton() {
        if(this._ownerId === this._userId) {
            this._element.querySelector('.card__delete').classList.add(('card__delete_show'));
        }
    }


    //Создание карточки
    generateCard() {
        this._element = this._getTemplate();

        const cardImage = this._element.querySelector('.card__image');
        const cardTitle = this._element.querySelector('.card__title');
        const cardLikeNumber = this._element.querySelector('.card__like-number');
       
        this._setEventListeners();
        this._handleLike();
        
        cardImage.style.backgroundImage = 'url(' + this._link + ')';
        cardImage.setAttribute('alt', `На фото ${this._name}`);
        cardTitle.textContent = this._name;

        cardLikeNumber.textContent = this._like.length;

        this._showDeleteButton();

        return this._element;
    }
}
