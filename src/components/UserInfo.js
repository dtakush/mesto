export class UserInfo {
    constructor({userName, userAbout}) {
        this._name = userName;
        this._about = userAbout;
    }

    getUserInfo(formItems) {
        formItems.name.value = this._name.textContent;
        formItems.about.value = this._about.textContent
    }

    setUserInfo(formItems) {
        this._name.textContent = formItems.name;
        this._about.textContent = formItems.about;
    }
}
