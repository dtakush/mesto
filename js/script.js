let editProfileButton = document.querySelector('.profile__edit-button');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

let profilePopup = document.querySelector('.popup');
let popupForm = profilePopup.querySelector('.popup__form');
let popupNameInput = document.querySelector('.popup__input_name');
let popupAboutInput = document.querySelector('.popup__input_about');
let popupCloseButton = profilePopup.querySelector('.popup__close');
let popupSaveButton = profilePopup.querySelector('.popup__save-button');



function openPopup() {
    popupNameInput.value = profileName.textContent;
    popupAboutInput.value = profileAbout.textContent;

    profilePopup.classList.add('popup_opened');
}

function closePopup() {
    profilePopup.classList.remove('popup_opened');
}

function savePopupInfo(evt) {
    evt.preventDefault();

    profileName.textContent = popupNameInput.value;
    profileAbout.textContent = popupAboutInput.value;

    closePopup();
}

editProfileButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
popupForm.addEventListener('submit', savePopupInfo);
