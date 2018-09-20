"use strict";
export default class GalleryService {
    constructor() {}

    checkURL(url) {
        url = url.trim();
        if (url.indexOf('http://') !== 0) {
            return `http://${url}`;
        }
        return url;
    }

    cutDescription(description) {
        return description.length > 15 ? `${description.substring(15,0)}...` : description;
    }

    formatDate(date) {
        if (!isNaN(date)) {
            return moment(date).format('YYYY/MM/DD HH:mm');
        } else {
            return null;
        }
    }

    changeName(name) {
        if (name) {
            return name[0].toUpperCase() + name.toLowerCase().slice(1);
        } else {
            return null;
        }
    }

    sortMethod(filterType, visible_img) {
        if (filterType == 0) {
            //По имени А- Я
            visible_img = visible_img.sort(function (b, a) {
                return (a.name < b.name);
            });
        } else if (filterType == 1) {
            //По имени Я - А
            visible_img = visible_img.sort(function (a, b) {
                return (a.name < b.name);
            });
        } else if (filterType == 2) {
            // сортировка data А -Я
            visible_img = visible_img.sort(function (b, a) {
                return (a.date - b.date);
            });
        } else if (filterType == 3) {
            // сортировка data Я - А
            visible_img = visible_img.sort(function (a, b) {
                return (a.date - b.date);
            });
        }
    }

    showOneImg(obj) {
        return `<div class="col-md-4">
            <div class="card mb-4 box-shadow">
                <img class="card-img-top" 
                    data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail" 
                    alt="${this.changeName(obj.name)} " 
                    src="${this.checkURL(obj.url)}" data-holder-rendered="true" 
                    style="height: 225px; width: 100%; display: block;">
                <div class="card-body">
                    <h3>${obj.id} : ${this.changeName(obj.name)}</h3>\         
                    <p class="card-text"> ${this.cutDescription(obj.description)} </p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-outline-secondary viewImg" item-id="${obj.id}" >View</button>
                            <button type="button" class="btn btn-outline-secondary editImg" item-id="${obj.id}">Edit</button>
                            <button class="btn btn-danger removeImg" item-id="${obj.id}">Удалить</button>   
                        </div>                      
                        <small class="text-muted">${this.formatDate(obj.date)}</small>
                    </div>
                </div>
        </div></div>`;
    }


    showElement(domElement) {
        domElement.classList.remove("hide");
        domElement.classList.add("show");
    }

    hideElement(domElement) {
        domElement.classList.remove("show");
        domElement.classList.add("hide");
    }



}