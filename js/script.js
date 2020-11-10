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



function openPopup() {
    profilePopup.classList.add('popup_opened');
}

function closePopup() {
    profilePopup.classList.remove('popup_opened');
}

editProfileButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);



function savePopupInfo(evt) {
    evt.preventDefault();

    let popupNameInput = document.querySelector('.popup__input_name');
    let popupAboutInput = document.querySelector('.popup__input_about');

    profileName.textContent = popupNameInput.value;
    profileAbout.textContent = popupAboutInput.value;

    closePopup();
}

popupForm.addEventListener('submit', savePopupInfo);


function addCard (nameValue, linkValue) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.card__title').textContent = nameValue;
    cardElement.querySelector('.card__image').src = linkValue;
    cardElement.querySelector('.card__image').alt = nameValue;

    cardsContainer.append(cardElement);
}

function cardValues (cardsArr) {
    cardsArr.forEach(function(card) {
        addCard(card.name, card.link);
    })
}

cardValues(initialCards);
