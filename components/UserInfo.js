export class UserInfo {
    constructor({userName, userAbout}) {
        this._name = userName;
        this._about = userAbout;
    }

    getUserInfo() {
        return {
            name: this._name.textContent,
            about: this._about.textcontent,
        }
    }

    setUserInfo(formItems) {
        this._name.textContent = formItems.name;
        this._about.textContent = formItems.about;
    }
}
