"use strict";

export default class LoginModel {
    constructor() {
        this.url = "http://localhost:3000/login"
    }

    isLoggedInUser() {
        return JSON.parse(localStorage.getItem("Logged_in_user"))
    }

    getSessionStorageData() {
        return sessionStorage.getItem("isLogged")
    }

    checklogAndPass(obj) {
        let options = {
            method: 'post',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                login: obj.inputEmail.trim(),
                password: obj.inputPassword.trim()
            })
        };

        return fetch(this.url, options)
            .then(response => {
                if (!response.status == 200) {
                    throw new Error(response.status);
                } else {
                    return response.json();
                }
            });
    }

    setLogAndPassToLocalStorage(obj) {
        let userInfo = {
            Login: obj.inputEmail,
            Password: obj.inputPassword,
            rememberMe: obj.rememberMe
        }
        localStorage.setItem("Logged_in_user", JSON.stringify(userInfo))
        sessionStorage.setItem("isLogged", JSON.stringify(userInfo))

        let usersInfo = [{
            login: obj.inputEmail,
            password: obj.inputPassword
        }]

        let localStorageData = JSON.parse(localStorage.getItem("userInfo"))

        if (localStorageData) {
            let currentUser = localStorageData.find(item => (item.login == obj.inputEmail) && (item.password == obj.inputPassword));
            if (!currentUser) {
                localStorageData.push({
                    login: obj.inputEmail,
                    password: obj.inputPassword
                })
                localStorage.setItem("userInfo", JSON.stringify(localStorageData))
            }
        } else {
            localStorage.setItem("userInfo", JSON.stringify(usersInfo))
        }
    }

    clearSessionInfo() {
        sessionStorage.removeItem("isLogged");
        localStorage.removeItem("Logged_in_user");
    }
}