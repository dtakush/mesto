import {profileName,
    profileAbout,
    popupPlaceInput,
    popupLinkInput,
    popupNameInput,
    popupAboutInput,
    editProfileButton,
    editPlaceButton,
    placePopup,
    profilePopup,
    placePopupForm,
    profilePopupForm,
    placePopupCloseButton,
    profilePopupCloseButton,
    validationObj} from '../utils/constants.js';

import {initialCards} from '../components/initialCards.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';




//Открытие попапа
export function openPopup (popup) {
    popup.classList.add('popup_opened');
    popup.addEventListener('mousedown', clickOverlayPopupHandler);
    document.addEventListener('keydown', clickEscPopupHandler);

    if (popup == profilePopup) {
        profileFormValidation.resetValidation();
    } else {
        placeFormValidation.resetValidation();
    }
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
export function closePopup (popup) {
    popup.classList.remove('popup_opened');

    popup.removeEventListener('mousedown', clickOverlayPopupHandler);
    document.removeEventListener('keydown', clickEscPopupHandler);
}


//Сохраниение информации в профиле через попап
function savePopupInfo(evt) {
    evt.preventDefault();

    profileName.textContent = popupNameInput.value;
    profileAbout.textContent = popupAboutInput.value;

    closePopup(profilePopup);
}


//Сохраниение новой карточки через попап
function savePopupCard (evt) {
    evt.preventDefault();

    const savedCard = new Card(popupLinkInput.value, popupPlaceInput.value, '.card-template');
    generateCard(savedCard);

    closePopup(placePopup);
}



//Добавление карточки в контейнер
function generateCard(card) {
    const cardElement = card.generateCard();
    document.querySelector('.cards').prepend(cardElement);
}


editProfileButton.addEventListener('click', () => {
    openPopup(profilePopup);
    //Добавление информации в попап профиля
    popupNameInput.value = profileName.textContent;
    popupAboutInput.value = profileAbout.textContent;
});


editPlaceButton.addEventListener('click', () => {
    placePopupForm.reset();
    openPopup(placePopup);
});


placePopupForm.addEventListener('submit', savePopupCard);


profilePopupForm.addEventListener('submit', savePopupInfo);


profilePopupCloseButton.addEventListener('click', () => closePopup(profilePopup));


placePopupCloseButton.addEventListener('click', () => closePopup(placePopup));



//Отрисовка карточек на странице
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item.link, item.name, '.card-template');
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
    }}, '.cards');
cardList.renderItems();


export const profileFormValidation = new FormValidator(validationObj, profilePopupForm);
profileFormValidation.enableValidation();
export const placeFormValidation = new FormValidator(validationObj, placePopupForm);
placeFormValidation.enableValidation();