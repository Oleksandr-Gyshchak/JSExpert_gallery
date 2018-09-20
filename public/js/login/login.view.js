"use strict";

export default class LoginView {
    constructor() {
        this.DOMElements = {
            inputEmail: document.getElementById("inputEmail"),
            inputPassword: document.getElementById("inputPassword"),
            checkBoxRememberMe: document.getElementById('checkBoxRememberMe'),

            alertDiv: document.getElementById("alertWindows"),
            btnExit: document.querySelector("#btnSignOut"),
            btnSignIn: document.getElementById("sign-in")
        }
    }

    getInputLogAndPass() {
        return {
            inputEmail: this.DOMElements.inputEmail.value,
            inputPassword: this.DOMElements.inputPassword.value,
            rememberMe: this.DOMElements.checkBoxRememberMe.checked
        }
    }

    showAlertDiv(msg) {
        this.DOMElements.alertDiv.className = "alert alert-danger";
        this.DOMElements.alertDiv.textContent = msg;
    }

    clearAlertMsg() {
        this.DOMElements.alertDiv.classList = "";
        this.DOMElements.alertDiv.textContent = "";
    }

}