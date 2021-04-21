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
    profileAbout
    } from '../utils/constants.js';

import {initialCards} from '../components/initialCards.js';
import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {UserInfo} from '../components/UserInfo.js';


//Отрисовка карточек на странице
const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, '.card-template');
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
    }}, '.cards');
cardList.renderItems();


//Валидация попапов
export const profileFormValidation = new FormValidator(validationObj, profilePopupForm);
profileFormValidation.enableValidation();
export const placeFormValidation = new FormValidator(validationObj, placePopupForm);
placeFormValidation.enableValidation();


//Открытие попапа для карточек
editPlaceButton.addEventListener('click', () => {
    placePopupForm.reset();
    const openPlacePopup = new PopupWithForm({popup: placePopup, 
        handleFormSubmit: (items) => {
            const savedCard = new Card(items, '.card-template');
            const cardElement = savedCard.generateCard();
            //console.log(items);
            const cardsList = document.querySelector('.cards');
            cardsList.append(cardElement);

            openPlacePopup.close();
        }
    });
    
    openPlacePopup.open();

});

//Открытие попапа с информацией пользователя
editProfileButton.addEventListener('click', () => {
    const userInfo = new UserInfo({
        userName: profileName,
        userAbout: profileAbout});

    const openProfilePopup = new PopupWithForm({
        popup: profilePopup,
        handleFormSubmit: (items) => {

            userInfo.setUserInfo(items);
            openProfilePopup.close();
        }});
        
    userInfo.getUserInfo(popupNameInput.value = profileName.textContent,
                        popupAboutInput.value = profileAbout.textContent);


    openProfilePopup.open();
});


