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
const placePopup = document.querySelector('.popup__card');
const placePopupCloseButton = placePopup.querySelector('.popup__close-place');
const placePopupForm = placePopup.querySelector('.popup__form_place');
const popupPlaceInput = document.querySelector('.popup__input_place');
const popupLinkInput = document.querySelector('.popup__input_link');
const placePopupSaveButton = document.querySelector('.popup__save-button_place');

const profilePopup = document.querySelector('.popup__profile');
const profilePopupForm = profilePopup.querySelector('.popup__form_profile');
const popupNameInput = document.querySelector('.popup__input_name');
const popupAboutInput = document.querySelector('.popup__input_about');
const profilePopupCloseButton = profilePopup.querySelector('.popup__close-profile');
const profilePopupSaveButton = profilePopup.querySelector('.popup__save-button-profile');
const editProfileButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');





//Добавление информации в попап профиля
popupNameInput.value = profileName.textContent;
popupAboutInput.value = profileAbout.textContent;



//Добавиление картичек из массива
function addCard (nameValue, linkValue) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.card__title').textContent = nameValue;
    cardElement.querySelector('.card__image').src = linkValue;
    cardElement.querySelector('.card__image').alt = nameValue;

    //Лайк карточки
    cardElement.querySelector('.card__like').addEventListener('click', (evt) => evt.target.classList.toggle('card__like_active'));

    //Удаление карточки
    function deleteCard (evt) {
        const card = evt.target.closest('.card');
        cardsContainer.removeChild(card);
    }
    cardElement.querySelector('.card__delete').addEventListener('click', deleteCard);

    //Попап с картинкой
    function toggleCardPreview () {
        const cardPreview = document.querySelector('.card-preview');
        const cardPreviewImage = cardPreview.querySelector('.card-preview__image');
        const cardPreviewText = cardPreview.querySelector('.card-preview__text');

        cardPreview.classList.toggle('card-preview_opened');
        cardPreviewImage.src = linkValue;
        cardPreviewText.textContent = nameValue;   
    }
    const cardPreview = document.querySelector('.card-preview');
    const cardPreviewClose = cardPreview.querySelector('.card-preview__close');
    cardElement.querySelector('.card__image').addEventListener('click', toggleCardPreview);
    cardPreviewClose.addEventListener('click', () => cardPreview.classList.remove('card-preview_opened'));


    //Добавление карточки
    cardsContainer.prepend(cardElement);
}

function cardValues (cardsArr) {
    cardsArr.forEach(function(card) {
        addCard(card.name, card.link);
    })
}

cardValues(initialCards);




//Открытие/закрытие попапа с профилем
function toggleProfilePopup () {
    profilePopup.classList.toggle('popup_opened');
}

editProfileButton.addEventListener('click', toggleProfilePopup);
profilePopupCloseButton.addEventListener('click', toggleProfilePopup);




//Сохраниение информации в профиле через попап
function savePopupInfo(evt) {
    evt.preventDefault();

    let popupNameInput = document.querySelector('.popup__input_name');
    let popupAboutInput = document.querySelector('.popup__input_about');

    profileName.textContent = popupNameInput.value;
    profileAbout.textContent = popupAboutInput.value;

    toggleProfilePopup();
}

profilePopupForm.addEventListener('submit', savePopupInfo);




//Открытие/закрытие попапа карточек
function togglePlacePopup () {
    placePopup.classList.toggle('popup_opened');
    placePopupSaveButton.disabled === true;
}

editPlaceButton.addEventListener('click', togglePlacePopup);
placePopupCloseButton.addEventListener('click', togglePlacePopup);



//Сохраниение новой карточки через попап
function savePopupCard (evt) {
    evt.preventDefault();

    addCard(popupPlaceInput.value, popupLinkInput.value)

    togglePlacePopup();
}

placePopupForm.addEventListener('submit', savePopupCard);


