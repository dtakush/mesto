export class UserInfo {
    constructor({userName, userAbout}) {
        this._name = userName;
        this._about = userAbout;
    }

    //Добавление информации в попап
    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._about.textContent
        };
    }

    //Добавление информации на страницу
    setUserInfo(formItems) {
        this._name.textContent = formItems.name;
        this._about.textContent = formItems.about;
    }
}

