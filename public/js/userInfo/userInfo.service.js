"use strict";

export default class UserService {
    showElement(elem) {
        elem.classList.remove("hide");
        elem.classList.add('show');
    }

    hideElement(elem) {
        elem.classList.remove("show");
        elem.classList.add('hide');
    }

}