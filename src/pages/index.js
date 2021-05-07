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
    cardsContainer,
    profileAvatar,
    deletePopup,
    avatarPopup,
    avatarPopupForm,
    submitButton
    } from '../utils/constants.js';

import {FormValidator} from '../components/FormValidator.js';
import {Section} from '../components/Section.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {PopupWithSubmit} from '../components/PupupWithSubmit.js';
import {UserInfo} from '../components/UserInfo.js';
import {Card} from '../components/Card.js';
import {Api} from '../components/Api.js';


let userId = null;

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-23',
    headers: {
      authorization: '3f3bc69b-6834-471f-8bfa-0881762188af',
      'Content-Type': 'application/json'
    }
});


//Создание новой карточки
function createCard(item, userId) {
    const card = new Card({data: item,
        handleCardClick: () => {
            popupImage.open(item.link, item.name);
        },
        handleDeleteCard: () => {
            const popupDelete = new PopupWithSubmit({popup: deletePopup,
                setHandleSubmit: () => {
                    api.deleteCard(item._id)
                        .then(() => {
                            card.deleteCard();
                            popupDelete.close();
                        })
                        .catch((err) => {
                           console.log(`Attention! ${err}`);
                        });
                }});
            popupDelete.setEventListeners();
            popupDelete.open();
        },
        handleLikeClick: () => {
            if(card.isLiked()) {
                api.deleteLike(item._id)
                .then((data) => {
                    card.matchLikes(data);
                })
                .catch((err) => {
                    console.log(`Attention! ${err}`);
                 });
            } else {
                api.setLike(item._id)
                .then((data) => {
                    card.matchLikes(data);
                })
                .catch((err) => {
                    console.log(`Attention! ${err}`);
                 });
            }
        },
        cardTemplateSelector: cardTemplateSelector},
        userId);
        
        const cardElement = card.generateCard();
        card.matchLikes(item);

        return cardElement;
}


//Информация о пользователе
const userInfo = new UserInfo({
    userName: profileName,
    userAbout: profileAbout
})

//Отричовка карточек
const cardList = new Section({
    renderer: (item) => {
        cardList.addItem(createCard(item, userId));
}}, cardsContainerSelector);
    

//Попап с картинкой
const popupImage = new PopupWithImage(cardPreview);
popupImage.setEventListeners();


//Валидация попапов
const profileFormValidation = new FormValidator(validationObj, profilePopupForm);
profileFormValidation.enableValidation();

const placeFormValidation = new FormValidator(validationObj, placePopupForm);
placeFormValidation.enableValidation();

const avatarFormValidation = new FormValidator(validationObj, avatarPopupForm);
avatarFormValidation.enableValidation();



//Попап добавления карточки
const popupAddCard = new PopupWithForm({popup: placePopup, 
    handleFormSubmit: (item) => {
        popupAddCard.loadingButton(true);
        api.addCard(item)
            .then((data) => {
                cardsContainer.prepend(createCard(data, userId));
                popupAddCard.close();
            })
            .catch((err) => {
                console.log(`Attention! ${err}`)
            })
            .finally(() => {
                popupAddCard.loadingButton(false);
            })

    }
});
popupAddCard.setEventListeners();


//Попап профиля
const popupEditProfile = new PopupWithForm({
    popup: profilePopup,
    handleFormSubmit: (items) => {
        popupEditProfile.loadingButton(true);
        api.setUserInfo(items)
            .then((data) => {
                userInfo.setUserInfo(data);
                popupEditProfile.close();
            })
            .catch((err) => {
                console.log(`Attention! ${err}`)
            })
            .finally(() => {
                popupEditProfile.loadingButton(false);
            })
}});
popupEditProfile.setEventListeners();


//Попап изменение аватара
const popupEditAvatar = new PopupWithForm({
    popup: avatarPopup,
    handleFormSubmit: (item) => {
        popupEditAvatar.loadingButton(true);
        api.setNewAvatar(item.link)
            .then((data) => {
                profileAvatar.style.backgroundImage = `url(${data.avatar})`;
                popupEditAvatar.close();
            })
            .catch((err) => {
                console.log(`Attention! ${err}`)
            })
            .finally(() => {
                popupEditAvatar.loadingButton(false);
            })
    }
})
popupEditAvatar.setEventListeners();

//Открытие попапа для карточек
editPlaceButton.addEventListener('click', () => {
    placePopupForm.reset();
    placeFormValidation.resetValidation();
    popupAddCard.open();
});


//Открытие попапа с информацией пользователя
editProfileButton.addEventListener('click', () => {
    const userItems = userInfo.getUserInfo();
    popupNameInput.value = userItems.name;
    popupAboutInput.value = userItems.about;

    profileFormValidation.resetValidation();
    popupEditProfile.open();
});

//Открытие попапа аватара
profileAvatar.addEventListener('click', () => {
    avatarPopupForm.reset();
    avatarFormValidation.resetValidation();
    popupEditAvatar.open();
})


Promise.all([api.getInitialCards(), api.getUserInfo()])
    .then(([cardsItems, userItems]) => {
        userInfo.setUserInfo(userItems);
        profileAvatar.style.backgroundImage = `url(${userItems.avatar})`;

        userId = userItems._id;

        cardList.renderItems(cardsItems);

    })
    .catch((err) => {
        console.log(`${err}`);
    });