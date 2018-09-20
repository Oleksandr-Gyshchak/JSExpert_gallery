"use strict";

export default class User_info_model {
    constructor() {}

    getLocalStorageData() {
        return JSON.parse(localStorage.getItem("Logged_in_user"))
    }
}