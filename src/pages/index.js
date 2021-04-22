import './index.css';

import {placePopup,
    profilePopup,
    placePopupForm,
    profilePopupForm,
    validationObj,
    editProfileButton,
    editPlaceButton,
    popupNameInput,
    popupAboutInput,
    profileName,
    profileAbout,
    cardPreview,
    cardTemplateSelector,
    cardsContainerSelector,
    cardsContainer
    } from '../utils/constants.js';

import {initialCards} from '../components/initialCards.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js'
import {UserInfo} from '../components/UserInfo.js';
import {Card} from '../components/Card.js';


const popupImage = new PopupWithImage(cardPreview);
popupImage.setEventListeners();


function createCard(item) {
    const card = new Card({data: item,
        handleCardClick: () => {
                popupImage.open(item.link, item.name);
        },
        cardTemplateSelector: cardTemplateSelector});
        
        const cardElement = card.generateCard();
        return cardElement;
    }


//Отрисовка карточек на странице
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        cardList.addItem(createCard(item));
    }}, cardsContainerSelector);
cardList.renderItems();


//Валидация попапов
const profileFormValidation = new FormValidator(validationObj, profilePopupForm);
profileFormValidation.enableValidation();

const placeFormValidation = new FormValidator(validationObj, placePopupForm);
placeFormValidation.enableValidation();



//Попап добавления карточки
const popupAddCard = new PopupWithForm({popup: placePopup, 
    handleFormSubmit: (item) => {
        cardsContainer.prepend(createCard(item));
        popupAddCard.close();
    }
});
popupAddCard.setEventListeners();


//Попап профиля
const popupEditProfile = new PopupWithForm({
    popup: profilePopup,
    handleFormSubmit: (items) => {
        userInfo.setUserInfo(items);
        popupEditProfile.close();
}});
popupEditProfile.setEventListeners();


//Информация пользователя
const userInfo = new UserInfo({
    userName: profileName,
    userAbout: profileAbout});


//Открытие попапа для карточек
editPlaceButton.addEventListener('click', () => {
    placePopupForm.reset();
    placeFormValidation.resetValidation();
    popupAddCard.open();
});


//Открытие попапа с информацией пользователя
editProfileButton.addEventListener('click', () => {
    userInfo.getUserInfo(popupNameInput.value = profileName.textContent,
                        popupAboutInput.value = profileAbout.textContent);
    profileFormValidation.resetValidation();
    popupEditProfile.open();
});


