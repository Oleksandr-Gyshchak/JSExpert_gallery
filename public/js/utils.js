export default class Utils {

    static showView(showEl) {
        showEl.classList.remove("hide");
        showEl.classList.add("show");
    }

    static hideAllView(viewsEl) {
        viewsEl.forEach(element => {
            element.classList.remove("show");
            element.classList.add("hide");
        });
    }

    static isLoggedInUser() {
        let isUserLoggedIn = JSON.parse(localStorage.getItem("Logged_in_user"))
        return (isUserLoggedIn) ? true : false;
    }
}