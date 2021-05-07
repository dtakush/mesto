export class Api {
    constructor({baseUrl, headers}) {
      this.baseUrl = baseUrl;
      this.headers = headers
    }

    //Запрос карточек с сервера
    getInitialCards() {
      return fetch(`${this.baseUrl}/cards`, {
        method: 'GET',
        headers: this.headers
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
    }

    //Добавление карточки на сервер
    addCard(card) {
      return fetch(`${this.baseUrl}/cards`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          link: card.link,
          name: card.name,
        }),
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
    }
  
    //Запрос информации о пользователе    
     getUserInfo() {
      return fetch(`${this.baseUrl}/users/me`, {
        method: 'GET',
        headers: this.headers
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
    }

    //Изменение информации о пользователе
    setUserInfo(items) {
      return fetch(`${this.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: items.name,
          about: items.about
        })
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
    }

    //Удаление карточки
    deleteCard(id) {
      return fetch(`${this.baseUrl}/cards/${id}`, {
        method: 'DELETE',
        headers: this.headers
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
    }

    //Добавление лайка
    setLike(id) {
      return fetch(`${this.baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: this.headers
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
    }

    //Удаление лайка
    deleteLike(id) {
      return fetch(`${this.baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: this.headers
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
    }
  
    //Изменение аватара
    setNewAvatar(avatar) {
      return fetch(`${this.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          avatar: avatar,
        })
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
    }
    }
