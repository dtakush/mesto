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



//Открытие попапа
function openPopup (popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('mousedown', clickOverlayPopupHandler);
    document.addEventListener('keydown', clickEscPopupHandler);
}

//Сброс видимости ошибок при открытии окна
function resetValidation (popup) {
    const formElement = popup.querySelector('.popup__form');
    const inputsArr = formElement.querySelectorAll('.popup__input');
    inputsArr.forEach((inputElement) => hideInputError(formElement, inputElement, validationObj));
}

//Закрытие попапа по клику на оверлей
function clickOverlayPopupHandler (evt) {
    if (evt.target == evt.currentTarget) {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

//Закрытие попапа по нажатию на клавишу Esc
function clickEscPopupHandler (evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    };
}
    

//Закрытие попапа
function closePopup (popup) {
    popup.classList.remove('popup_opened');

    popup.removeEventListener('mousedown', clickOverlayPopupHandler);
    document.removeEventListener('keydown', clickEscPopupHandler);
}

editProfileButton.addEventListener('click', () => {
    resetValidation(profilePopup);
    openPopup(profilePopup);
});
profilePopupCloseButton.addEventListener('click', () => closePopup(profilePopup));


editPlaceButton.addEventListener('click', () => {
    popupPlaceInput.value = '';
    popupLinkInput.value = '';
    popupPlaceSubmitButton.disabled = true;
    resetValidation(placePopup);
    openPopup(placePopup);
});
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


