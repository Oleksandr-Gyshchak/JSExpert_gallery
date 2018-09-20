"use strict";

export default class Validator {
    constructor() {
        this.alertMsg = "";

        this.infoMessages = {
            emptyEmail: "Поле Email пустое",
            emptyPassword: "Поле Password пустое",
            emptyEmailAndPass: "Поля Email и Password пустые",
            notValidEmail: "Вы ввели недопустимый формат email",
            tooLongEmail: "Вы ввели недопустимый email, длина emailа больше 100 знаков",
            tooLongPassword: "Пароль содержит слишком много символов",
            shortPassword: 'Пароль должен быть не менее 6 символов!',
            notEqualEmail: "Email не совпали!!",
            notEqualPassword: "Пароли не совпали!!!!",
            notEqualEmailAndPass: "Email и пароль не совпали!!!!",
            notEqualEmailOrPass: "Не верный логин или пароль!!!!"
        };
    }

    isValidEmailAddress(emailAddress) {
        let reg = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/
        return reg.test(emailAddress);
    }

    isValidlogAndPass(email, password) {
        let isValidform = false;

        if ((email == "") && (password == "")) {
            this.alertMsg = this.infoMessages.emptyEmailAndPass;
        } else if (email == "") {
            this.alertMsg = this.infoMessages.emptyEmail;
        } else if (password == "") {
            this.alertMsg = this.infoMessages.emptyPassword;
        } else if (!this.isValidEmailAddress(email)) {
            this.alertMsg = this.infoMessages.notValidEmail;
        } else if (email.length > 100) {
            this.alertMsg = this.infoMessages.tooLongEmail;
        } else if (password.length > 50) {
            this.alertMsg = this.infoMessages.tooLongPassword;
        } else if (password.length < 8) {
            this.alertMsg = this.infoMessages.shortPassword;
        } else {
            isValidform = true;
        }

        return isValidform;
    }

    isValidForm(obj) {
        let email = obj.inputEmail.trim(),
            password = obj.inputPassword.trim();
        return this.isValidlogAndPass(email, password);
    }

    getAlertMsg() {
        return this.alertMsg;
    }
}