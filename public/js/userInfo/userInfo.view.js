"use strict";

export default class User_info_view {
    constructor() {
        this.DOMElements = {
            userEmail: document.getElementById("user_email"),
            userPassword: document.getElementById("user_password"),
            btnShowPassword: document.getElementById("showPassword"),
            btnReturn: document.getElementById("buttonReturn")
        }

    }

    inputUserData(obj) {
        this.DOMElements.userEmail.value = obj.Login;
        this.DOMElements.userPassword.value = obj.Password;
    }

    showPassword() {
        this.DOMElements.userPassword.type = (this.DOMElements.userPassword.type == 'text') ? 'password' : 'text';
        this.DOMElements.btnShowPassword.innerText = (this.DOMElements.userPassword.type == 'text') ? 'Скрыть пароль' : 'Показать пароль';
    }

}