const cardsContainer = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content;
const cardPreview = document.querySelector('.popup_card');

const editPlaceButton = document.querySelector('.profile__add-button');
const placePopup = document.querySelector('.popup_place');
const placePopupCloseButton = placePopup.querySelector('.popup__close-place');
const placePopupForm = placePopup.querySelector('.popup__form_place');
const popupPlaceInput = document.querySelector('.popup__input_place');
const popupLinkInput = document.querySelector('.popup__input_link');
const popupPlaceSubmitButton = document.querySelector('.popup__save-button_place');

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
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');

    const cardPreviewImage = cardPreview.querySelector('.popup__image');
    const cardPreviewText = cardPreview.querySelector('.popup__text');

    cardElement.querySelector('.card__title').textContent = nameValue;
    cardImage.style.backgroundImage = 'url(' + linkValue + ')';
    cardImage.setAttribute('alt', `На фото ${nameValue}`);

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
        cardPreviewImage.setAttribute('alt', `На увеличенном фото ${nameValue}`);
        cardPreviewText.textContent = nameValue;   
    }

    cardElement.querySelector('.card__image-button').addEventListener('click', toggleCardPreview);

    //Возвращение карточки
    return cardElement;
}

cardPreview.querySelector('.popup__close_card').addEventListener('click', () => closePopup(cardPreview));

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
    popup.addEventListener('mousedown', clickOverlayPopupHandler);
    document.addEventListener('keydown', clickEscPopupHandler);

    if (popup === placePopup) {
        const submitButton = popup.querySelector('.popup__save-button');
        popupPlaceInput.value = '';
        popupLinkInput.value = '';
        submitButton.disabled = true;
    }

    resetValidation(popup);
}

//Сброс видимости ошибок при открытии окна
function resetValidation (popup) {
    const formElement = popup.querySelector('.popup__form');
    const inputsArr = formElement.querySelectorAll('.popup__input');
    inputsArr.forEach((inputElement) => hideInputError(formElement, inputElement, validationObj));
}

//Закрытие попапа по клику на оверлей
function clickOverlayPopupHandler (evt) {
    const openedPopup = document.querySelector('.popup_opened');
    if (evt.target == evt.currentTarget) {
        closePopup(openedPopup);
    }
}

//Закрытие попапа по нажатию на клавишу Esc
function clickEscPopupHandler (evt) {
    const openedPopup = document.querySelector('.popup_opened');
    if (evt.key === 'Escape') {
        closePopup(openedPopup);
    };
}
    

//Закрытие попапа
function closePopup (popup) {
    popup.classList.remove('popup_opened');

    popup.removeEventListener('mousedown', clickOverlayPopupHandler);
    document.removeEventListener('keydown', clickEscPopupHandler);
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


