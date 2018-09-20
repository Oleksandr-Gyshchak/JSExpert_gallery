import utils from './utils.js';

import GalleryController from './gallery/gallery.controler.js';
import GalleryModel from './gallery/gallery.model.js';
import GalleryView from './gallery/gallery.view.js';
import GalleryService from './gallery/gallery.service.js';


import LoginControler from './login/login.controler.js';
import LoginModel from './login/login.model.js';
import LoginView from './login/login.view.js';
import LoginService from './login/login.service.js';


import UserInfoControler from './userInfo/userInfo.controller.js';
import UserInfoModel from './userInfo/userInfo.model.js';
import UserInfoView from './userInfo/userInfo.view.js';
import UserInfoService from './userInfo/userInfo.service.js';


let signInBlock = document.querySelector("#main_form");
let userInfoBlock = document.querySelector("#user_info");
let galleryBlock = document.querySelector("#galleryBlock");

let activatedRoutes = {};

// чтобы перестроить галерею когда заходит другой пользователь
let galleryControler = null;
let userInfoControler = null;

let routeConfig = {
    "": {
        show: () => {
            utils.showView(signInBlock);
            utils.hideAllView([galleryBlock, userInfoBlock]);
        },
        init: () => {
            let loginModel = new LoginModel();
            let loginView = new LoginView();
            let loginValidation = new LoginService();

            let controler = new LoginControler(loginModel, loginView, loginValidation);
            controler.init();
        }
    },
    "gallery": {
        show: () => {
            utils.showView(galleryBlock);
            utils.hideAllView([signInBlock, userInfoBlock]);
            // чтобы перестроить галерею когда заходит другой пользователь
            galleryControler.reBuildGallery()
        },
        init: () => {
            let galleryService = new GalleryService();
            let galleryModel = new GalleryModel();
            let galleryView = new GalleryView(galleryService);

            galleryControler = new GalleryController(galleryModel, galleryView, galleryService);
            galleryControler.init();
        }
    },
    "info": {
        show: () => {
            utils.showView(userInfoBlock);
            utils.hideAllView([galleryBlock, signInBlock]);
            // чтобы перестроить когда заходит другой пользователь
            userInfoControler.fillUserInfoFields();
        },
        init: () => {
            let userInfoModel = new UserInfoModel();
            let userInfoView = new UserInfoView();
            let userInfoService = new UserInfoService();

            userInfoControler = new UserInfoControler(userInfoModel, userInfoView, userInfoService);
            userInfoControler.init();
        }
    }
}

export function updateRoute() {
    let routeName = document.location.hash.replace(/^#/, '');

    if (utils.isLoggedInUser()) {
        if (activatedRoutes[routeName]) {
            activatedRoutes[routeName]();
        } else {
            let route = routeConfig[routeName];
            if (route) {
                route.init();
                route.show();
                activatedRoutes[routeName] = route.show;
            }
        }
    } else {
        if (activatedRoutes[""]) {
            activatedRoutes[""]();
        } else {
            routeConfig[""].init();
            routeConfig[""].show();
            activatedRoutes[""] = routeConfig[""].show;
        }
    }

}


























/*
var galleryService = new GalleryService();
var galleryModel =  new GalleryModel();
var galleryView = new GalleryView(galleryService);

let controler = new GalleryController(galleryModel, galleryView, galleryService );
controler.init();


var loginModel =  new LoginModel();
var loginView = new LoginView();
var loginValidation = new LoginValidator();

let controler = new LoginControler(loginModel, loginView, loginValidation );
controler.init();


var userInfoModel =  new UserInfoModel();
var userInfoView = new UserInfoView();
var userInfoService = new UserInfoService();

let controler = new UserInfoControler(userInfoModel, userInfoView, userInfoService );
controler.init();


//
import utils from './utils.js';
import Observer from './gallery/observer.js';
import GalleryController from './gallery/gallery.controller.js';
import GalleryModel from './gallery/gallery.model.js';
import GalleryView from './gallery/gallery.view.js';

import LoginController from './login/login.controller.js';
import LoginModel from './login/login.model.js';
import LoginView from './login/login.view.js';

let main = document.querySelector("#main-view");
let info = document.querySelector("#info-view");
let login = document.querySelector("#login-view");
let activatedRoutes = {};

let routeConfig = {
    "" : {
        show : () => {
            utils.showView(login);
            utils.hideAllView([main, info]);
        },
        init : () => {
            let model = new LoginModel;
            let view = new LoginView;
            new LoginController(model, view)
        }
    },
    "gallery" : {
        show : () => {
            utils.showView(main);
            utils.hideAllView([login, info]);
            console.log("Main route is loaded")
        },
        init : () => {
            let observer = new Observer;
            let model = new GalleryModel;
            let view = new GalleryView;
            new GalleryController(model, view, observer)
        }
    },
    "info" : {
        show : () => {
            utils.showView(info);
            utils.hideAllView([main, login]);
            console.log("Info route is loaded")
        },
        init : () => {
            //implement Controller, View and Model for this Route
        }
    }
}

export function updateRoute() {
    let routeName = document.location.hash.replace(/^#/, '');
    if (activatedRoutes[routeName]) {
        activatedRoutes[routeName]();
    } else {
        let route = routeConfig[routeName];
        if (route) {
            route.init();
            route.show();
            activatedRoutes[routeName] = route.show;
        }
    }
}
*/