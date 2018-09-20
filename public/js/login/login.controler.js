"use strict";
export default class LoginController {
    constructor(loginModel, loginView, loginValidator) {
        this.loginModel = loginModel;
        this.loginView = loginView;
        this.validator = loginValidator;
    }

    checkLocalStorageRememberMe() {
        let localStorageData = this.loginModel.isLoggedInUser(),
            isLoggedIn = this.loginModel.getSessionStorageData();

        let rememberMe = (localStorageData) ? localStorageData.rememberMe : false;

        if (rememberMe || isLoggedIn) {
            window.location.href = '/#gallery';
        } else {
            window.location.href = '/#';
        }
    }

    bindEvents() {
        this.loginView.DOMElements.btnSignIn.addEventListener("click", this.signInCheck.bind(this));
    }

    signInCheck(event) {
        event.preventDefault();
        let logAndPass = this.loginView.getInputLogAndPass();

        let isValid = this.validator.isValidForm(logAndPass)
        if (isValid) {
            this.checklogAndPass(logAndPass);
        } else {
            this.loginView.showAlertDiv(this.validator.getAlertMsg());
        }
    }

    checklogAndPass(obj) {
        this.loginModel.checklogAndPass(obj)
            .then(data => {
                if (data.status == true) {
                    this.loginModel.setLogAndPassToLocalStorage(obj);
                    window.location.href = '/#gallery'
                } else {
                    this.loginView.showAlertDiv("Отказано в доступе, неправильный логин или пароль");
                }
            })
            .catch((error) => {
                console.log('Request failed', error);
                this.loginView.showAlertDiv("Отказано в доступе, неправильный логин или пароль");
            });
    }

    init() {
        this.bindEvents();
        this.checkLocalStorageRememberMe();
    }

}