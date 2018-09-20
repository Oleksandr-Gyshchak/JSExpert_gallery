export default class GalleryController {
    constructor(galleryModel, galleryView, galleryService) {
        this.galleryModel = galleryModel;
        this.galleryView = galleryView;
        this.galleryService = galleryService;
    }

    init() {
        this.bindEvents();
        // this.getDataFromLocalStorage();
        //this.getServerDataAndBuildGallery();
    }

    reBuildGallery() {
        this.galleryView.clearResultBlock();
        this.getDataFromLocalStorage();
        this.getServerDataAndBuildGallery();
    }

    bindEvents() {
        this.galleryView.DOMElements.btnAddImg.addEventListener("click", () => {
            this.galleryView.addImage();
            this.setShowedImgToLocalStorage();
        });
        this.galleryView.DOMElements.btnCreateImgInfo.addEventListener("click", () => {
            this.galleryView.showImgForm()
            this.galleryView.showCorrectBtnName("createImg");
        });
        this.galleryView.DOMElements.btnShowGalleryBlock.addEventListener("click", () => {
            this.galleryView.showGalleryForm()
        });
        this.galleryView.DOMElements.btnExit.addEventListener("click", () => {
            this.galleryModel.clearSessionInfo();
            window.location.href = '/#';
        });
        this.galleryView.DOMElements.sortFilterType.addEventListener("change", () => {
            this.galleryView.buildGallery();
            this.setShowedImgToLocalStorage();
        });
        this.galleryView.DOMElements.btnCreateUpdateInfo.addEventListener("click", () => {
            let clickedBtn = this.galleryView.getbtnClicked();

            if (clickedBtn == "createImg") {
                this.addCreatedImg()
            } else if (clickedBtn == "editImg") {
                this.updateImgInfo()
            }
        });

        this.galleryView.DOMElements.resultBlock.addEventListener("click", this.viewEditDeleteImg.bind(this));
    }

    setShowedImgToLocalStorage() {
        let filtertype = this.galleryView.getFilterType();
        let showedImages = this.galleryView.getShowedImages();
        this.galleryModel.setShowedToLocalStorage(filtertype, showedImages);
    }

    viewEditDeleteImg(event) {
        event.preventDefault();
        let imgID = event.target.getAttribute("item-id");

        if (event.target.classList.contains("viewImg")) {
            this.galleryView.showViewUpdateForm("viewImg", imgID);

        } else if (event.target.classList.contains("editImg")) {
            this.galleryView.showViewUpdateForm("editImg", imgID);

        } else if (event.target.classList.contains("removeImg")) {
            this.deleteImg(imgID)
        }
    }

    getServerDataAndBuildGallery() {
        this.galleryModel.getServerData()
            .then(data => {
                let imgData = data.filter(item => this.getNotShowedIMG(item));
                this.galleryView.saveData(imgData)
                this.galleryView.buildGallery();
                this.setShowedImgToLocalStorage();
                this.galleryView.showGalleryForm()
            })
            .catch((error) => {
                console.log('Request failed', error);
                this.galleryView.showModal("Что - то пошло не так...");
            });
    }

    getNotShowedIMG(item) {
        let showedImages = this.galleryView.getShowedImages();
        if (showedImages) {
            return showedImages.every(elem => elem.id !== item.id);
        } else {
            return item;
        }
    }

    getDataFromLocalStorage() {
        let localStorageData = this.galleryModel.getDataFromLocalStorage();
        if (localStorageData.ShowedImages) {
            this.galleryView.setShowedImages(localStorageData.ShowedImages);
            this.galleryView.setFilterType(localStorageData.Filtertype);
        }
    }

    addCreatedImg() {
        let inputFieldsValues = this.galleryView.getInputFieldsValues();

        if (this.isFieldsNotEmpty(inputFieldsValues)) {
            this.galleryModel.sendData(inputFieldsValues)
                .then(data => {
                    this.galleryView.showModal("Форма успешно отправлена...");
                    this.galleryView.pushToShowedImg(data);
                    this.getServerDataAndBuildGallery();
                })
                .catch(error => {
                    console.log('Request failed', error);
                    this.galleryView.showModal("Что - то пошло не так...");
                });

        } else {
            this.galleryView.showModal("Незаполненные все поля...");
        }
    }

    updateImgInfo() {
        let inputFieldsValues = this.galleryView.getInputFieldsValues();

        if (this.isFieldsNotEmpty(inputFieldsValues)) {
            let updateID = this.galleryView.getUpdateId()

            this.galleryModel.updateData(updateID, inputFieldsValues)
                .then(data => {
                    this.galleryView.removeElement(updateID);
                    this.galleryView.showModal("Форма успешно обновлена...");
                    this.galleryView.pushToShowedImg(data);
                    this.getServerDataAndBuildGallery();
                })
                .catch(error => {
                    console.log('Request failed', error);
                    this.galleryView.showModal("Что - то пошло не так...");
                });
        } else {
            this.galleryView.showModal("Незаполненные все поля...");
        }
    }

    isFieldsNotEmpty(obj) {
        return (obj.urlImg != "") && (obj.name != "") && (obj.description != "")
    }

    deleteImg(imgID) {
        this.galleryView.removeElement(imgID);
        this.setShowedImgToLocalStorage();

        this.galleryModel.deleteImg(imgID)
            .then(data => {
                this.getServerDataAndBuildGallery();
            })
            .catch((error) => {
                console.log('Request failed', error);
                this.galleryView.showModal("Что - то пошло не так...");
            });
    }

}