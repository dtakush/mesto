let editProfileButton = document.querySelector('.profile__edit-button');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

let profilePopup = document.querySelector('.popup');
let popupForm = profilePopup.querySelector('.popup__form');
let popupNameInput = document.querySelector('.popup__input_name');
let popupAboutInput = document.querySelector('.popup__input_about');
let popupCloseButton = profilePopup.querySelector('.popup__close');
let popupSaveButton = profilePopup.querySelector('.popup__save-button');

popupNameInput.value = profileName.textContent;
popupAboutInput.value = profileAbout.textContent;



function popupIsOpen() {
    profilePopup.classList.add('popup_opened');
}

function popupIsClose() {
    profilePopup.classList.remove('popup_opened');
}

editProfileButton.addEventListener('click', popupIsOpen);
popupCloseButton.addEventListener('click', popupIsClose);



function savePopupInfo(evt) {
    evt.preventDefault();

    let popupNameInput = document.querySelector('.popup__input_name');
    let popupAboutInput = document.querySelector('.popup__input_about');

    profileName.textContent = popupNameInput.value;
    profileAbout.textContent = popupAboutInput.value;

    popupIsClose();
}

popupForm.addEventListener('submit', savePopupInfo);
