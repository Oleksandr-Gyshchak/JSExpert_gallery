export default class GalleryModel {
    constructor() {
        this.url = "http://localhost:3000/cars";
    }

    getServerData() {
        return fetch(this.url)
            .then(response => {
                if (!response.status == 200) {
                    throw new Error(response.status);
                }
                return response.json();
            });
    }

    sendData(obj) {
        let options = this.getRequestOption(obj, 'post');

        return fetch(this.url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status);
                } else {
                    return response.json();
                }
            });
    }

    getRequestOption(obj, method) {
        return {
            method: method,
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                url: obj.urlImg,
                name: obj.name,
                description: obj.description,
                date: Date.now()
            })
        };
    }

    updateData(id, obj) {
        let options = this.getRequestOption(obj, 'put');

        return fetch(this.url + "/" + id, options)
            .then(response => {
                if (!response.status == 200) {
                    throw new Error(response.status);
                }
                return response.json();
            });
    }

    deleteImg(id) {
        let options = {
            method: 'delete'
        }

        return fetch(this.url + "/" + id, options)
            .then(response => {
                if (!response.status == 200) {
                    throw new Error(response.status);
                }
                return response.json();
            });
    }

    getDataFromLocalStorage() {
        let logged_in_user = JSON.parse(localStorage.getItem("Logged_in_user"))
        let localStorageData = JSON.parse(localStorage.getItem("userInfo"))

        if (localStorageData) {
            return localStorageData.find(item => (item.login == logged_in_user.Login));
        } else {
            return null;
        }
    }

    setShowedToLocalStorage(filtertype, showedImages) {
        let logged_in_user = JSON.parse(localStorage.getItem("Logged_in_user"))
        let users = JSON.parse(localStorage.getItem("userInfo"))

        let currentUserInfo = {};

        users.forEach((item, index) => {
            if (item.login == logged_in_user.Login) {
                currentUserInfo.login = item.login;
                currentUserInfo.password = item.password;
                users.splice(index, 1);
            }
        });
        currentUserInfo.Filtertype = filtertype;
        currentUserInfo.ShowedImages = showedImages;
        users.push(currentUserInfo);

        localStorage.setItem("userInfo", JSON.stringify(users))
    }

    clearSessionInfo() {
        sessionStorage.removeItem("isLogged");
        localStorage.removeItem("Logged_in_user");
    }

}