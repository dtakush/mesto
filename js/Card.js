class Card {
    constructor (link, title) {
        this._link = link;
        this._title = title;
    }

    //Темплейт карточки
    _getTemplate() {
        const cardElement = document
        .querySelector('#card-template')
        .content
        .querySelector('.card')
        .cloneNode(true);
        
        return cardElement;
    }

    //Слушатели событий
    _setEventListeners() {
        this._element.querySelector('.card__like').addEventListener('click', () => {
            this._handleLike();
        })

        this._element.querySelector('.card__delete').addEventListener('click', () => {
            this._deleteCard();
        })

        this._element.querySelector('.card__image').addEventListener('click', () => {
            this._openCardPreview();
        })
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
        this._setEventListeners();
        this._element.querySelector('.card__image').style.backgroundImage = 'url(' + this._link + ')';
        this._element.querySelector('.card__image').setAttribute('alt', `На фото ${this._title}`);
        this._element.querySelector('.card__title').textContent = this._title;

        return this._element;
    }
}

//Перебор массива
initialCards.forEach((item) => {
    const card = new Card(item.link, item.name);

    const cardElement = card.generateCard();
    document.querySelector('.cards').prepend(cardElement);
})