const initialCards = [
    {
        name: 'Испания',
        link: 'images/barcelona.jpg'
    },
    {
        name: 'Грузия',
        link: 'images/georgia.jpg'
    },
    {
        name: 'Великобритания',
        link: 'images/london.jpg'
    },
    {
        name: 'Вьетнам',
        link: 'images/nha-trang.jpg'
    },
    {
        name: 'Норвегия',
        link: 'images/norway.jpg'
    },
    {
        name: 'Италия',
        link: 'images/rome.jpg'
    }
];


const cardsContainer = document.querySelector('.cards');

const editPlaceButton = document.querySelector('.profile__add-button');
const placePopup = document.querySelector('.popup_place');
const placePopupCloseButton = placePopup.querySelector('.popup__close-place');
const placePopupForm = placePopup.querySelector('.popup__form_place');
const popupPlaceInput = document.querySelector('.popup__input_place');
const popupLinkInput = document.querySelector('.popup__input_link');

const profilePopup = document.querySelector('.popup_profile');
const profilePopupForm = profilePopup.querySelector('.popup__form_profile');
const popupNameInput = document.querySelector('.popup__input_name');
const popupAboutInput = document.querySelector('.popup__input_about');
const profilePopupCloseButton = profilePopup.querySelector('.popup__close-profile');
const editProfileButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const imagePopup = document.querySelector('.popup_card');


//Добавление информации в попап профиля
popupNameInput.value = profileName.textContent;
popupAboutInput.value = profileAbout.textContent;



//Создание картичек
function generateCard (nameValue, linkValue) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);

    const cardPreview = document.querySelector('.popup_card');
    const cardPreviewImage = cardPreview.querySelector('.popup__image');
    const cardPreviewText = cardPreview.querySelector('.popup__text');

    cardElement.querySelector('.card__title').textContent = nameValue;
    cardElement.querySelector('.card__image').style.backgroundImage = 'url(' + linkValue + ')';

    //Лайк карточки
    cardElement.querySelector('.card__like').addEventListener('click', (evt) => evt.target.classList.toggle('card__like_active'));

    //Удаление карточки
    function deleteCard (evt) {
        const card = evt.target.closest('.card');
        card.remove();
    }
    cardElement.querySelector('.card__delete').addEventListener('click', deleteCard);

    //Открытие попапа с картинкой
    function toggleCardPreview () {
        openPopup(cardPreview);

        cardPreviewImage.src = linkValue;
        cardPreviewText.textContent = nameValue;   
    }

    cardElement.querySelector('.card__image-button').addEventListener('click', toggleCardPreview);
    cardPreview.querySelector('.popup__close_card').addEventListener('click', () => closePopup(cardPreview));

    //Возвращение карточки
    return cardElement;
}

//Добавление карточки
function addCard (card) {
    cardsContainer.prepend(card);
}


//Добавление карточек из массива
function renderInitialCards (cardsArr) {
    cardsArr.forEach(function(card) {
        const cardElement =  generateCard(card.name, card.link);
        addCard(cardElement);
    });
}

renderInitialCards(initialCards);


//Открытие попапа
function openPopup (popup) {
    popup.classList.add('popup_opened');
    popupClickHandler(popup);

    const form = popup.querySelector('.popup__form');    
    resetValidation(form, validationObj);
}


//Закрытие попапа по клику на оверлей или нажатию на клавишу Esc
function popupClickHandler (popup) {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target == evt.currentTarget) {
            closePopup(evt.target);
        } else {
            closePopup(imagePopup);
        }
    });

    document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
        closePopup(popup);
    }});

}

//Закрытие попапа
function closePopup (popup) {
    popup.classList.remove('popup_opened');

}

editProfileButton.addEventListener('click', () => openPopup(profilePopup));
profilePopupCloseButton.addEventListener('click', () => closePopup(profilePopup));

editPlaceButton.addEventListener('click', () => openPopup(placePopup));
placePopupCloseButton.addEventListener('click', () => closePopup(placePopup));


//Сохраниение информации в профиле через попап
function savePopupInfo(evt) {
    evt.preventDefault();

    profileName.textContent = popupNameInput.value;
    profileAbout.textContent = popupAboutInput.value;

    closePopup(profilePopup);
}

profilePopupForm.addEventListener('submit', savePopupInfo);



//Сохраниение новой карточки через попап
function savePopupCard (evt) {
    evt.preventDefault();

    const savedCard = generateCard(popupPlaceInput.value, popupLinkInput.value);

    addCard(savedCard);

    closePopup(placePopup);
}

placePopupForm.addEventListener('submit', savePopupCard);


