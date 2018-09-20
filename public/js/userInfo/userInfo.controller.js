export default class User_info_controller {
    constructor(model, view, service) {
        this.userInfoModel = model;
        this.userInfoView = view;
        this.userService = service
    }

    bindEvents() {
        this.userInfoView.DOMElements.btnShowPassword.addEventListener("click", () => {
            this.userInfoView.showPassword();
        });

        this.userInfoView.DOMElements.btnReturn.addEventListener("click", () => {
            window.location.href = '/#gallery';
        });
    }

    fillUserInfoFields() {
        let userlogAndPass = this.userInfoModel.getLocalStorageData();
        this.userInfoView.inputUserData(userlogAndPass);
    }

    init() {
        this.fillUserInfoFields();
        this.bindEvents();
    }
}