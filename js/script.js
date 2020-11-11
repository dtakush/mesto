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


<<<<<<< HEAD
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



//Добавиление картичек
function addCard (nameValue, linkValue) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.card__title').textContent = nameValue;
    cardElement.querySelector('.card__image').style.backgroundImage = 'url(' + linkValue + ')'
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
=======


function openPopup() {
    popupNameInput.value = profileName.textContent;
    popupAboutInput.value = profileAbout.textContent;

    profilePopup.classList.add('popup_opened');
>>>>>>> ace410d24dd434d85e51f301d245005af443f41f
}

function cardValues (cardsArr) {
    cardsArr.forEach(function(card) {
        addCard(card.name, card.link);
    })
}

<<<<<<< HEAD
cardValues(initialCards);



//Открытие/закрытие попапа
function togglePopup (popup) {
    popup.classList.toggle('popup_opened');
}

editProfileButton.addEventListener('click', () => togglePopup(profilePopup));
profilePopupCloseButton.addEventListener('click', () => togglePopup(profilePopup));

editPlaceButton.addEventListener('click', () => togglePopup(placePopup));
placePopupCloseButton.addEventListener('click', () => togglePopup(placePopup));



//Сохраниение информации в профиле через попап
=======
>>>>>>> ace410d24dd434d85e51f301d245005af443f41f
function savePopupInfo(evt) {
    evt.preventDefault();

    profileName.textContent = popupNameInput.value;
    profileAbout.textContent = popupAboutInput.value;

    togglePopup(profilePopup);
}

profilePopupForm.addEventListener('submit', savePopupInfo);



//Сохраниение новой карточки через попап
function savePopupCard (evt) {
    evt.preventDefault();

    addCard(popupPlaceInput.value, popupLinkInput.value)

    togglePopup(placePopup);
}

<<<<<<< HEAD
placePopupForm.addEventListener('submit', savePopupCard);


=======
editProfileButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', savePopupInfo);
>>>>>>> ace410d24dd434d85e51f301d245005af443f41f
