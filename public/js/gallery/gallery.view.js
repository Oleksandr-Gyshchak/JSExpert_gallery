export default class GalleryView {
    constructor(galleryService) {
        this.galleryService = galleryService;

        this.DOMElements = {
            galleryDetailBlock: document.querySelector('#count'),
            resultBlock: document.querySelector('#result'),
            modalBodyValue: document.getElementById('modal_body_value'),
            imgBlock: document.getElementById("create_img_block"),
            galleryBlock: document.getElementById("galleryBlock"),
            sortFilterType: document.getElementById("sort-selector"),
            inputName: document.getElementById("inputName"),
            inputDescription: document.getElementById("inputDescription"),
            inputUrl: document.getElementById("inputUrl"),
            btnShowGalleryBlock: document.getElementById("buttonReturnToGalleryBlock"),
            btnCreateImgInfo: document.getElementById("createImg"),

            btnAddImg: document.getElementById("add"),
            btnCreateUpdateInfo: document.getElementById("btnCreateUpdateInfo"),
            btnExit: document.querySelector("#btnSignOut")
        };

        this.imagesArrData = null;
        this.imagesCount = null;
        this.filterType = 0;
        this.showedImages = [];
        this.updateID = null;
        this.btnClicked = null;
    }

    saveData(data) {
        this.imagesArrData = data;
        this.imagesCount = data.length + this.showedImages.length;
    }

    setShowedImages(data) {
        if (data != undefined) {
            data.forEach(element => {
                this.showedImages.push(element);
            });
        }
    }

    pushToShowedImg(element) {
        this.showedImages.push(element);
    }

    setFilterType(filter) {
        this.filterType = filter;
        this.DOMElements.sortFilterType.value = filter;
    }

    getShowedImages() {
        return this.showedImages;
    }

    getFilterType() {
        return this.filterType;
    }

    getUpdateId() {
        return this.updateID;
    }

    getInputFieldsValues() {
        return {
            urlImg: this.DOMElements.inputUrl.value,
            name: this.DOMElements.inputName.value,
            description: this.DOMElements.inputDescription.value
        }
    }

    clearResultBlock() {
        this.showedImages = [];
        this.DOMElements.resultBlock.innerHTML = "";
    }

    getbtnClicked() {
        return this.btnClicked;
    }

    showImgForm() {
        this.clearInputFields();
        this.galleryService.showElement(this.DOMElements.imgBlock);
        this.galleryService.hideElement(this.DOMElements.galleryBlock);
    }

    showGalleryForm() {
        this.galleryService.showElement(this.DOMElements.galleryBlock);
        this.galleryService.hideElement(this.DOMElements.imgBlock);
    }

    clearInputFields() {
        this.DOMElements.inputUrl.value = ""
        this.DOMElements.inputName.value = ""
        this.DOMElements.inputDescription.value = ""
    }

    showModal(msg) {
        this.DOMElements.modalBodyValue.innerHTML = msg;
        $('#myModal').modal('show');
    }

    showGalleryDetail(showedImages) {
        let stillIMG = this.imagesCount - showedImages;
        this.DOMElements.galleryDetailBlock.innerHTML = `Добавленно изображений: ${showedImages}  /  Осталось изображений: ${stillIMG}`;
    }

    changeButtonColour() {
        if (this.showedImages.length == this.imagesCount) {
            this.DOMElements.btnAddImg.classList.remove("btn-default")
            this.DOMElements.btnAddImg.classList.add("btn-danger");
        } else {
            this.DOMElements.btnAddImg.classList.remove("btn-danger");
            this.DOMElements.btnAddImg.classList.add("btn-default")
        }
    }

    showImgInfo(id) {
        this.showedImages.forEach((item, index) => {
            if (item.id == id) {
                this.DOMElements.inputUrl.value = item.url;
                this.DOMElements.inputName.value = item.name;
                this.DOMElements.inputDescription.value = item.description;
            }
        });
    }


    showViewUpdateForm(btnClicked, id) {
        this.showImgForm();

        if (btnClicked == "editImg") {
            this.updateID = id;
            this.showImgInfo(id)
        } else if (btnClicked == "viewImg") {
            this.showImgInfo(id)
        }

        this.showCorrectBtnName(btnClicked);
    }

    showCorrectBtnName(btnClicked) {
        this.btnClicked = btnClicked;

        this.galleryService.showElement(this.DOMElements.btnCreateUpdateInfo);

        if (btnClicked == "editImg") {
            this.DOMElements.btnCreateUpdateInfo.innerText = 'Обновить';
        } else if (btnClicked == "viewImg") {
            this.galleryService.hideElement(this.DOMElements.btnCreateUpdateInfo);
        } else if (btnClicked == "createImg") {
            this.DOMElements.btnCreateUpdateInfo.innerText = 'Создать';
        }

    }

    buildGallery() {
        this.filterType = this.DOMElements.sortFilterType.value;
        this.galleryService.sortMethod(this.filterType, this.showedImages)

        let result = "";
        this.showedImages.forEach((item, index) => {
            result += this.galleryService.showOneImg(item);
        });
        this.DOMElements.resultBlock.innerHTML = result;

        this.changeButtonColour();
        this.showGalleryDetail(this.showedImages.length);
    }

    addImage() {
        if (this.imagesArrData.length === 0) {
            this.showModal("Sorry, no more elements...");
        } else {
            this.showedImages.push(this.imagesArrData.shift());
            this.buildGallery();
        }
    }

    removeElement(id) {
        this.delete1(id, this.showedImages);
    }

    delete1(id, showedImages) {
        showedImages.forEach((item, index) => {
            if (item.id == id) {
                showedImages.splice(index, 1);
            }
        });
    }

}