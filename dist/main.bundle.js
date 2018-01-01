webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app-main/input/input.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".example-form {\n  min-width: 150px;\n  max-width: 500px;\n  width: 100%;\n}\n\n.example-full-width {\n  width: 100%;\n}\n\n.submit { float: right}\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app-main/input/input.component.html":
/***/ (function(module, exports) {

module.exports = "<form class=\"example-form\">\n  <mat-form-field class=\"example-full-width\">\n    <input matInput placeholder=\"Title\" [(ngModel)] = \"title\" name = \"title\">\n  </mat-form-field>\n\n  <mat-form-field class=\"example-full-width\">\n    <textarea matInput placeholder=\"Description\" [(ngModel)] = \"description\" name = \"description\"></textarea>\n  </mat-form-field>\n</form>\n\n<mat-form-field class=\"example-full-width\">\n  <mat-select placeholder=\"Select a category\" (change)=\"changeShape($event)\">\n    <mat-option *ngFor=\"let category of categories\" [value]=\"category.value\">\n      {{ category.viewValue }}\n    </mat-option>\n  </mat-select>\n</mat-form-field>\n\n<mat-form-field class=\"example-full-width\">\n  <input matInput placeholder=\"Price\" type=\"number\" class=\"example-right-align\" [(ngModel)] = \"price\">\n  <span matPrefix>$&nbsp;</span>\n  <span matSuffix>.00</span>\n</mat-form-field>\n\n<button mat-icon-button color=\"primary\" class=\"mat-elevation-z1\" (click)=\"imgFileInput.click()\">\n  <mat-icon >\n    <i class=\"material-icons\">photo_camera</i>\n  </mat-icon></button>\n<input hidden type=\"file\" #imgFileInput (change)=\"selectFile($event)\"/>\n\n<button mat-icon-button color=\"primary\" (click)=\"pushMe()\" class=\"submit mat-elevation-z1\">\n  <mat-icon>\n    <i class=\"material-icons\">send</i>\n  </mat-icon>\n</button>\n\n<div *ngIf=\"fileUploaded.data.length > 0\" class=\"photo-upload\">\n\n  <mat-grid-list style=\"padding:10px\" [cols]=\"(fileUploaded.data.length > 3) ? 3 : fileUploaded.data.length\" rowHeight=\"1:1\" dnd-sortable-container [sortableData]=\"fileUploaded.data\">\n    <mat-grid-tile *ngFor=\"let data of fileUploaded.data; let i = index\" class=\"list-group-item\" dnd-sortable [sortableIndex]=\"i\">\n\n      <div *ngIf=\"data.complete\" >\n\n        <img mat-card-image [src]=\"data.url\" />\n        <button mat-icon-button class=\"mat-elevation-z2\" style=\"margin: 1%;position: absolute;top:0;left:0;\">\n          <mat-icon (click)=\"deleteUploaded(data)\">\n            <i class=\"material-icons\">clear</i>\n          </mat-icon>\n        </button>\n      </div>\n\n      <div *ngIf=\"!data.complete\">\n        <mat-progress-spinner diameter=\"60\" strokeWidth=\"5\" color=\"warn\" mode=\"indeterminate\"></mat-progress-spinner>\n      </div>\n\n    </mat-grid-tile>\n\n  </mat-grid-list>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/app-main/input/input.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InputComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utility_upload_fileupload_service__ = __webpack_require__("../../../../../src/app/utility/upload/fileupload.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utility_upload_fileupload__ = __webpack_require__("../../../../../src/app/utility/upload/fileupload.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__firestore_cfg_firestore_insertion__ = __webpack_require__("../../../../../src/app/firestore-cfg/firestore.insertion.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__("../../../../angularfire2/auth/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_firestore__ = __webpack_require__("../../../../angularfire2/firestore/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var InputComponent = (function () {
    function InputComponent(upload, auth, firestore) {
        var _this = this;
        this.upload = upload;
        this.auth = auth;
        this.firestore = firestore;
        this.selectedCategory = '';
        this.description = '';
        this.title = '';
        this.price = '';
        this.fileUploaded = { data: [] };
        this.progress = { percentage: 0 };
        this.fInsertion = new __WEBPACK_IMPORTED_MODULE_3__firestore_cfg_firestore_insertion__["a" /* FirestoreInsertion */]();
        this.user = null;
        this.categories = [
            { value: '0', viewValue: 'Computers & Mobile Phone' },
            { value: '1', viewValue: 'Clothing' },
            { value: '2', viewValue: 'Sports equipment' },
            { value: '3', viewValue: 'Kitchen utensils' },
            { value: '4', viewValue: 'House & Garden' },
            { value: '5', viewValue: 'Animals & Accessories' },
            { value: '6', viewValue: 'Comics and Newspapers' },
            { value: '7', viewValue: 'Collectibles' },
            { value: '8', viewValue: 'Other Categories' },
        ];
        this.iCollection = this.firestore.collection('insertions');
        this.auth.authState.subscribe(function (user) {
            if (user) {
                _this.user = user;
            }
        });
    }
    InputComponent.prototype.ngOnInit = function () {
    };
    InputComponent.prototype.selectFile = function (event) {
        var f = event.target.files.item(0);
        if (f.type.match('image/*')) {
            this.upload.pushFileToStorage(new __WEBPACK_IMPORTED_MODULE_2__utility_upload_fileupload__["a" /* FileUpload */](f), 'images', this.progress, this.fileUploaded);
        }
        else {
            alert('invalid format!');
        }
    };
    InputComponent.prototype.deleteUploaded = function (f) {
        this.upload.deleteFileUpload(f, 'images');
        this.fileUploaded.data.splice(this.fileUploaded.data.indexOf(f), 1);
    };
    InputComponent.prototype.changeShape = function (shape) {
        this.selectedCategory = shape.value;
    };
    InputComponent.prototype.pushMe = function () {
        var _this = this;
        if (this.title || this.description || this.selectedCategory || this.fileUploaded.data.length > 0) {
            this.fInsertion.setParams(this.user.uid, new Date(), this.title, this.description, this.selectedCategory, this.price, this.fileUploaded.data[0].url);
            this.iCollection.add(this.fInsertion.getParams()).then(function (item) {
                _this.resetPost();
            }).catch(function (error) { return console.log(error); });
        }
        else {
            alert('Some informations missed!');
        }
    };
    InputComponent.prototype.resetPost = function () {
        this.title = '';
        this.description = '';
        this.price = '';
        this.fileUploaded.data = [];
    };
    return InputComponent;
}());
InputComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-input',
        template: __webpack_require__("../../../../../src/app/app-main/input/input.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app-main/input/input.component.css")],
        providers: [__WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */]]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__utility_upload_fileupload_service__["a" /* UploadFileService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__utility_upload_fileupload_service__["a" /* UploadFileService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5_angularfire2_firestore__["a" /* AngularFirestore */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_angularfire2_firestore__["a" /* AngularFirestore */]) === "function" && _c || Object])
], InputComponent);

var _a, _b, _c;
//# sourceMappingURL=input.component.js.map

/***/ }),

/***/ "../../../../../src/app/app-main/item/item.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".example-card {\n\n}\n\n.example-header-image {\n  background-image: url('https://material.angular.io/assets/img/examples/shiba1.jpg');\n  background-size: cover;\n}\n\n.mat-card-image {\n  margin: 10px;\n  max-height: 400px;\n  max-width: 400px;\n}\n.mat-card-footer {margin-left: 10px; margin-bottom: 35px;}\n\nmat-chip {\n  max-width: 200px;\n}\n\nmat-card {\n  margin-bottom: 5%;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app-main/item/item.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-card class=\"example-card\">\n  <mat-chip-list style=\"float: right\">\n    <mat-chip>\n      <mat-icon>phone</mat-icon>\n      34----------\n    </mat-chip>\n    <mat-chip color=\"accent\" selected=\"true\">\n      <mat-icon>attach_money</mat-icon>\n      {{ insertion.price }}\n    </mat-chip>\n  </mat-chip-list>\n  <mat-card-header>\n    <img mat-card-avatar [src]=\"userProfileImage\">\n    <mat-card-title>{{ userName }}</mat-card-title>\n    <mat-card-subtitle>{{ insertion.datetime  | amCalendar}}</mat-card-subtitle>\n  </mat-card-header>\n\n  <mat-card-title>{{ insertion.title }}</mat-card-title>\n  <div style=\"text-align: center\">\n  <img mat-card-image [src]=\"insertion.image_url\" alt=\"Photo of a Shiba Inu\">\n  </div>\n  <mat-card-content>\n    <p>\n      {{ insertion.description }}\n    </p>\n  </mat-card-content>\n  <mat-card-actions>\n    <mat-card-footer>\n    <mat-chip-list class=\"mat-chip-list-stacked\" style=\"float: left\">\n      <mat-chip selected=\"true\" color=\"primary\">\n        {{ getCategoryName(insertion.category) }}\n      </mat-chip>\n\n    </mat-chip-list>\n    </mat-card-footer>\n\n  </mat-card-actions>\n</mat-card>\n"

/***/ }),

/***/ "../../../../../src/app/app-main/item/item.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ItemComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__firestore_cfg_firestore_insertion__ = __webpack_require__("../../../../../src/app/firestore-cfg/firestore.insertion.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__firestore_cfg_firestoreQueryManager__ = __webpack_require__("../../../../../src/app/firestore-cfg/firestoreQueryManager.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ItemComponent = (function () {
    function ItemComponent() {
        this.qm = new __WEBPACK_IMPORTED_MODULE_2__firestore_cfg_firestoreQueryManager__["a" /* FirestoreQM */]();
    }
    ItemComponent.prototype.ngOnInit = function () {
        var self = this;
        var query = this.qm.getRefQuery('users', new Array({
            filter: 'uid',
            comparison: '==',
            value: self.insertion.uid
        }));
        query.get()
            .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                self.userProfileImage = doc.data()['photoURL'];
                self.userFirstName = doc.data()['firstName'];
                self.userLastName = doc.data()['lastName'];
                self.userName = self.userFirstName + ' ' + self.userLastName;
                self.userPhone = doc.data()['phoneNumber'];
            });
        });
    };
    ItemComponent.prototype.getCategoryName = function (id) {
        switch (id) {
            case '0':
                return 'Computers & Mobile Phone';
            case '1':
                return 'Clothing';
            case '2':
                return 'Sports equipment';
            case '3':
                return 'Kitchen utensils';
            case '4':
                return 'House & Garden';
            case '5':
                return 'Animals & Accessories';
            case '6':
                return 'Comics and Newspapers';
            case '7':
                return 'Collectibles';
            case '8':
                return 'Other Categories';
        }
        return 'Other Categories';
    };
    return ItemComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__firestore_cfg_firestore_insertion__["a" /* FirestoreInsertion */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__firestore_cfg_firestore_insertion__["a" /* FirestoreInsertion */]) === "function" && _a || Object)
], ItemComponent.prototype, "insertion", void 0);
ItemComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-item',
        template: __webpack_require__("../../../../../src/app/app-main/item/item.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app-main/item/item.component.css")]
    }),
    __metadata("design:paramtypes", [])
], ItemComponent);

var _a;
//# sourceMappingURL=item.component.js.map

/***/ }),

/***/ "../../../../../src/app/app-main/main-view/main-view.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".main {\n  position: relative;\n  display: -ms-flex;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.main-creator {\n  margin: 20px 50px 20px 50px;\n  width: 35%;\n}\n\n\n.main-content {\n  margin: 20px 50px 20px 50px;\n  width: 65%;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app-main/main-view/main-view.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"main\">\n  <div class=\"main-creator\">\n\n    <mat-card>\n      <h3>\n        Create a new insertion!\n      </h3>\n      <app-input></app-input>\n    </mat-card>\n  </div>\n\n  <div class=\"main-content\">\n    <app-showcase></app-showcase>\n  </div>\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/app-main/main-view/main-view.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainViewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MainViewComponent = (function () {
    function MainViewComponent() {
    }
    MainViewComponent.prototype.ngOnInit = function () { };
    return MainViewComponent;
}());
MainViewComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-main-view',
        template: __webpack_require__("../../../../../src/app/app-main/main-view/main-view.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app-main/main-view/main-view.component.css")]
    }),
    __metadata("design:paramtypes", [])
], MainViewComponent);

//# sourceMappingURL=main-view.component.js.map

/***/ }),

/***/ "../../../../../src/app/app-main/showcase/showcase.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app-main/showcase/showcase.component.html":
/***/ (function(module, exports) {

module.exports = "<app-item *ngFor=\"let insertion of insertions | async\" [insertion]=\"insertion\"></app-item>\n"

/***/ }),

/***/ "../../../../../src/app/app-main/showcase/showcase.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShowcaseComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_firestore__ = __webpack_require__("../../../../angularfire2/firestore/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ShowcaseComponent = (function () {
    function ShowcaseComponent(firestore) {
        this.firestore = firestore;
        this.iCollection = this.firestore.collection('insertions', function (ref) { return ref.orderBy('datetime', 'desc'); });
        this.insertions = this.iCollection.valueChanges();
    }
    ShowcaseComponent.prototype.ngOnInit = function () {
    };
    return ShowcaseComponent;
}());
ShowcaseComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-showcase',
        template: __webpack_require__("../../../../../src/app/app-main/showcase/showcase.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app-main/showcase/showcase.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_angularfire2_firestore__["a" /* AngularFirestore */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angularfire2_firestore__["a" /* AngularFirestore */]) === "function" && _a || Object])
], ShowcaseComponent);

var _a;
//# sourceMappingURL=showcase.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<div style=\"text-align:center\">\n  <h1>\n    Welcome to {{title}}!\n  </h1>\n  <img width=\"300\" src=\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==\">\n</div>\n<h2>Here are some links to help you start: </h2>\n<ul>\n  <li>\n    <h2><a target=\"_blank\" rel=\"noopener\" href=\"https://angular.io/tutorial\">Tour of Heroes</a></h2>\n  </li>\n  <li>\n    <h2><a target=\"_blank\" rel=\"noopener\" href=\"https://github.com/angular/angular-cli/wiki\">CLI Documentation</a></h2>\n  </li>\n  <li>\n    <h2><a target=\"_blank\" rel=\"noopener\" href=\"https://blog.angular.io/\">Angular blog</a></h2>\n  </li>\n</ul>\n\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__material_dependencies_material_dependencies_module__ = __webpack_require__("../../../../../src/app/material-dependencies/material-dependencies.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_file_upload_file_upload_service__ = __webpack_require__("../../../../../src/app/services/file-upload/file-upload.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_error_handler_messages_handler_service__ = __webpack_require__("../../../../../src/app/services/error-handler/messages-handler.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__registration_stepper_registration_stepper_component__ = __webpack_require__("../../../../../src/app/registration-stepper/registration-stepper.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/@angular/platform-browser/animations.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__toolbar_toolbar_component__ = __webpack_require__("../../../../../src/app/toolbar/toolbar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__registration_dialog_registration_dialog_component__ = __webpack_require__("../../../../../src/app/registration-dialog/registration-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2_database__ = __webpack_require__("../../../../angularfire2/database/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angularfire2__ = __webpack_require__("../../../../angularfire2/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_angularfire2_firestore__ = __webpack_require__("../../../../angularfire2/firestore/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__utility_upload_fileupload_service__ = __webpack_require__("../../../../../src/app/utility/upload/fileupload.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_angular2_moment__ = __webpack_require__("../../../../angular2-moment/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_angular2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_angular2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__app_main_main_view_main_view_component__ = __webpack_require__("../../../../../src/app/app-main/main-view/main-view.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_event_emitter_service_event_emitter_service__ = __webpack_require__("../../../../../src/app/services/event-emitter-service/event-emitter.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_ng2_dnd__ = __webpack_require__("../../../../ng2-dnd/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__login_activate__ = __webpack_require__("../../../../../src/app/login.activate.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__app_route_app_route_module__ = __webpack_require__("../../../../../src/app/app.route/app.route.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__app_route_route_route_component__ = __webpack_require__("../../../../../src/app/app.route/route/route.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__app_main_showcase_showcase_component__ = __webpack_require__("../../../../../src/app/app-main/showcase/showcase.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__app_main_item_item_component__ = __webpack_require__("../../../../../src/app/app-main/item/item.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__app_main_input_input_component__ = __webpack_require__("../../../../../src/app/app-main/input/input.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__environments_firebase__ = __webpack_require__("../../../../../src/environments/firebase.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


/**
 * Material Module
 * This module contains all ngMaterial dependencies. All mat dependencies will be added here.
 */

























var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_6__registration_stepper_registration_stepper_component__["a" /* RegistrationStepperComponent */],
            __WEBPACK_IMPORTED_MODULE_8__toolbar_toolbar_component__["a" /* ToolbarComponent */],
            __WEBPACK_IMPORTED_MODULE_9__registration_dialog_registration_dialog_component__["a" /* RegistrationDialogComponent */],
            __WEBPACK_IMPORTED_MODULE_16__app_main_main_view_main_view_component__["a" /* MainViewComponent */],
            __WEBPACK_IMPORTED_MODULE_23__app_main_showcase_showcase_component__["a" /* ShowcaseComponent */],
            __WEBPACK_IMPORTED_MODULE_24__app_main_item_item_component__["a" /* ItemComponent */],
            __WEBPACK_IMPORTED_MODULE_25__app_main_input_input_component__["a" /* InputComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_20__app_route_app_route_module__["a" /* RoutingModule */],
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */], __WEBPACK_IMPORTED_MODULE_2__material_dependencies_material_dependencies_module__["a" /* MaterialDependenciesModule */], __WEBPACK_IMPORTED_MODULE_7__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */], __WEBPACK_IMPORTED_MODULE_10__angular_http__["b" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_12_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_26__environments_firebase__["a" /* firebase */].firebase),
            __WEBPACK_IMPORTED_MODULE_13_angularfire2_firestore__["b" /* AngularFirestoreModule */],
            __WEBPACK_IMPORTED_MODULE_15_angular2_moment__["MomentModule"],
            __WEBPACK_IMPORTED_MODULE_18_ng2_dnd__["a" /* DndModule */].forRoot()
        ],
        entryComponents: [__WEBPACK_IMPORTED_MODULE_9__registration_dialog_registration_dialog_component__["a" /* RegistrationDialogComponent */],],
        providers: [__WEBPACK_IMPORTED_MODULE_11_angularfire2_database__["a" /* AngularFireDatabaseProvider */], __WEBPACK_IMPORTED_MODULE_17__services_event_emitter_service_event_emitter_service__["a" /* EventEmitterService */], __WEBPACK_IMPORTED_MODULE_19__login_activate__["a" /* LoginActivate */], __WEBPACK_IMPORTED_MODULE_14__utility_upload_fileupload_service__["a" /* UploadFileService */], __WEBPACK_IMPORTED_MODULE_3__services_file_upload_file_upload_service__["a" /* FileUploadService */], __WEBPACK_IMPORTED_MODULE_4__services_error_handler_messages_handler_service__["a" /* MessagesHandlerService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_8__toolbar_toolbar_component__["a" /* ToolbarComponent */], __WEBPACK_IMPORTED_MODULE_21__app_route_route_route_component__["a" /* RouteComponent */]]
    })
], AppModule);

Object(__WEBPACK_IMPORTED_MODULE_22__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(AppModule);
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.route/app.route.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__registration_stepper_registration_stepper_component__ = __webpack_require__("../../../../../src/app/registration-stepper/registration-stepper.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_activate__ = __webpack_require__("../../../../../src/app/login.activate.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_main_main_view_main_view_component__ = __webpack_require__("../../../../../src/app/app-main/main-view/main-view.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__route_route_component__ = __webpack_require__("../../../../../src/app/app.route/route/route.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_4__app_main_main_view_main_view_component__["a" /* MainViewComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_3__login_activate__["a" /* LoginActivate */]]
    },
    {
        path: 'login',
        component: __WEBPACK_IMPORTED_MODULE_2__registration_stepper_registration_stepper_component__["a" /* RegistrationStepperComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_3__login_activate__["a" /* LoginActivate */]]
    }
];
var RoutingModule = (function () {
    function RoutingModule() {
    }
    return RoutingModule;
}());
RoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forRoot(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]],
        declarations: [__WEBPACK_IMPORTED_MODULE_5__route_route_component__["a" /* RouteComponent */]]
    })
], RoutingModule);

//# sourceMappingURL=app.route.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.route/route/route.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.route/route/route.component.html":
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\n"

/***/ }),

/***/ "../../../../../src/app/app.route/route/route.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RouteComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var RouteComponent = (function () {
    function RouteComponent() {
    }
    RouteComponent.prototype.ngOnInit = function () {
    };
    return RouteComponent;
}());
RouteComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-route',
        template: __webpack_require__("../../../../../src/app/app.route/route/route.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.route/route/route.component.css")]
    }),
    __metadata("design:paramtypes", [])
], RouteComponent);

//# sourceMappingURL=route.component.js.map

/***/ }),

/***/ "../../../../../src/app/firestore-cfg/firestore.insertion.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirestoreInsertion; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase_firestore__ = __webpack_require__("../../../../firebase/firestore/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase_firestore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_firebase_firestore__);

var FirestoreInsertion = (function () {
    function FirestoreInsertion() {
        this.uid = '';
        this.title = '';
        this.description = '';
        this.category = '';
        this.price = '';
        this.image_url = '';
    }
    FirestoreInsertion.prototype.getParams = function () {
        return {
            uid: this.uid,
            datetime: this.datetime,
            title: this.title,
            description: this.description,
            category: this.category,
            price: this.price,
            image_url: this.image_url,
        };
    };
    FirestoreInsertion.prototype.setParams = function (uid, dt, t, d, c, p, u) {
        this.uid = uid;
        this.datetime = dt;
        this.title = t;
        this.description = d;
        this.category = c;
        this.price = p;
        this.image_url = u;
    };
    return FirestoreInsertion;
}());
// Export original validator but rename it

//# sourceMappingURL=firestore.insertion.js.map

/***/ }),

/***/ "../../../../../src/app/firestore-cfg/firestore.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Firestore; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase__ = __webpack_require__("../../../../firebase/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase_firestore__ = __webpack_require__("../../../../firebase/firestore/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase_firestore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase_firestore__);


var Firestore = (function () {
    function Firestore() {
        // Singleton pattern: init db if not initialized yet
        if (!Firestore.db)
            Firestore.init();
    }
    /**
     * Initialize firebase app. Meanwhile, invoke firestore method and
     * set db static variable.
     */
    Firestore.init = function () {
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyDbSul24AYIRgTbJWMcHe8Z3bo8lU9RUzo",
            authDomain: "applicazioni-web-63d92.firebaseapp.com",
            databaseURL: "https://applicazioni-web-63d92.firebaseio.com",
            projectId: "applicazioni-web-63d92",
            storageBucket: "applicazioni-web-63d92.appspot.com",
            messagingSenderId: "1098101396959"
        };
        // Initialize firebase App
        Firestore.fb = __WEBPACK_IMPORTED_MODULE_0_firebase__["initializeApp"](config);
        // Initialize Cloud Firestore through Firebase
        Firestore.db = __WEBPACK_IMPORTED_MODULE_0_firebase__["firestore"]();
        // Get a reference to the storage service, which is used to create references in your storage bucket
        Firestore.storage = __WEBPACK_IMPORTED_MODULE_0_firebase__["storage"]();
        // Create a storage reference from our storage service
        Firestore.storageRef = Firestore.storage.ref();
    };
    Firestore.prototype.getConfiguredFirebase = function () {
        return Firestore.fb;
    };
    Firestore.prototype.getFirestoreDB = function () {
        return Firestore.db;
    };
    Firestore.prototype.getFirestoreStorage = function () {
        return Firestore.storage;
    };
    Firestore.prototype.getFirestoreSorageRef = function () {
        return Firestore.storageRef;
    };
    return Firestore;
}());
// Export original validator but rename it

//# sourceMappingURL=firestore.js.map

/***/ }),

/***/ "../../../../../src/app/firestore-cfg/firestore.users.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirestoreUsers; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase_firestore__ = __webpack_require__("../../../../firebase/firestore/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_firebase_firestore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_firebase_firestore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__firestore__ = __webpack_require__("../../../../../src/app/firestore-cfg/firestore.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__firestoreQueryManager__ = __webpack_require__("../../../../../src/app/firestore-cfg/firestoreQueryManager.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utility_upload_fileupload__ = __webpack_require__("../../../../../src/app/utility/upload/fileupload.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utility_upload_fileupload_service__ = __webpack_require__("../../../../../src/app/utility/upload/fileupload.service.ts");





var FirestoreUsers = (function () {
    function FirestoreUsers() {
        // Initialize a Firestore
        this.fs = new __WEBPACK_IMPORTED_MODULE_1__firestore__["a" /* Firestore */]();
        // Retrieve firebase configured object
        this.fb = this.fs.getConfiguredFirebase();
        // Retrieve Firestore DB
        this.db = this.fs.getFirestoreDB();
        // Creates the QueryManager object
        this.queryManager = new __WEBPACK_IMPORTED_MODULE_2__firestoreQueryManager__["a" /* FirestoreQM */]();
    }
    /**
     * Create a new account by passing the new user's email address and password
     * @param {string} email
     * @param {string} password
     * @returns {Promise<any>}
     */
    FirestoreUsers.prototype.createUser = function (email, password) {
        var _this = this;
        // Wrapper of this object
        var self = this;
        return new Promise(function (resolve, reject) {
            _this.fb.auth().createUserWithEmailAndPassword(email, password)
                .then(function (success) {
                // Add user in users collection
                self.queryManager.addData('users', null, { email: email }).then(function (res) {
                    resolve({ success: true });
                });
            })
                .catch(function (error) {
                reject({
                    success: false,
                    errorCode: error.code,
                    errorMessage: error.message
                });
            });
        });
    };
    FirestoreUsers.prototype.updateUser = function (userParams) {
        if (!userParams)
            return;
        // Wrapper of this object
        var self = this;
        var user = this.getLoggedUser();
        if (userParams.photoURL) {
            this.uploadProfilePhoto(userParams.photoURL)
                .then(function (success) {
                userParams.photoURL = success;
                self.updateProfile(user, userParams);
            });
        }
        else {
            this.updateProfile(user, userParams);
        }
    };
    FirestoreUsers.prototype.getLoggedUser = function () {
        return this.fb.auth().currentUser;
    };
    FirestoreUsers.prototype.isLogged = function () {
        return Boolean(this.getLoggedUser());
    };
    FirestoreUsers.prototype.uploadProfilePhoto = function (file) {
        if (!file)
            return;
        var uploadFileService = new __WEBPACK_IMPORTED_MODULE_4__utility_upload_fileupload_service__["a" /* UploadFileService */](), progress = { percentage: 0 }, fileUploaded = { data: [] };
        return new Promise(function (resolve, reject) {
            uploadFileService.pushFileToStorage(new __WEBPACK_IMPORTED_MODULE_3__utility_upload_fileupload__["a" /* FileUpload */](file), 'profile_photo', progress, fileUploaded).then(function (success) {
                resolve(success.file.url);
            });
        });
    };
    FirestoreUsers.prototype.updateProfile = function (user, userParams) {
        var u = user;
        userParams['uid'] = user.uid;
        u.updateProfile(userParams).then(function () {
        });
        // Update successful.
        var queryManager = new __WEBPACK_IMPORTED_MODULE_2__firestoreQueryManager__["a" /* FirestoreQM */]();
        var ref = queryManager.getRefQuery('users', new Array({
            filter: 'email',
            comparison: '==',
            value: u.email
        }));
        ref.get()
            .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                queryManager.addData('users', doc.id, userParams);
            });
        })
            .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
    };
    return FirestoreUsers;
}());
// Export original validator but rename it

//# sourceMappingURL=firestore.users.js.map

/***/ }),

/***/ "../../../../../src/app/firestore-cfg/firestoreQueryManager.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirestoreQueryManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__firestore__ = __webpack_require__("../../../../../src/app/firestore-cfg/firestore.ts");

var FirestoreQueryManager = (function () {
    function FirestoreQueryManager() {
        this.fs = new __WEBPACK_IMPORTED_MODULE_0__firestore__["a" /* Firestore */]();
        this.db = this.fs.getFirestoreDB();
    }
    /**
     * Get a collection object
     * @param {string} collection name of collection
     * @returns {firebase.firestore.CollectionReference}
     */
    FirestoreQueryManager.prototype.getCollection = function (collection) {
        if (!collection)
            return null;
        return this.db.collection(collection);
    };
    /**
     * Retrieve the reference of query
     * @param {string} collection
     * @param {Array<any>} queryConditions
     * @returns {Query}
     */
    FirestoreQueryManager.prototype.getRefQuery = function (collection, queryConditions) {
        if (!collection || !queryConditions)
            return null;
        // Create a reference to the collection
        var ref = this.getCollection(collection);
        if (!ref)
            return null;
        // Create a query against the collection. Iterate and assign result for
        // complex query.
        // ie: ref.where("state", ">=", "CA")
        //        .where("state", "<=", "IN")
        // Remove from array the first item
        var params = queryConditions.shift();
        // Performs the query
        var query = ref.where(params.filter, params.comparison, params.value);
        // Iterate over remaining params
        for (var _i = 0, queryConditions_1 = queryConditions; _i < queryConditions_1.length; _i++) {
            var queryParams = queryConditions_1[_i];
            query = query.where(queryParams.filter, queryParams.comparison, queryParams.value);
        }
        return query;
    };
    /**
     * Add some data in a specified collection. Document is not required. If you don't specified doc parameter,
     * it get the first document found.
     * @param {string} collection
     * @param {string} [doc]
     * @param data
     * @returns {Promise<any>}
     */
    FirestoreQueryManager.prototype.addData = function (collection, doc, data) {
        if (!collection || !data)
            return;
        // Use self instead this in inner function
        var ref = this.db.collection(collection);
        // If document is not defined, generate it with uuid
        return new Promise(function (resolve, reject) {
            if (!doc) {
                // Add a new document with a generated id.
                ref
                    .doc()
                    .set(data)
                    .then(function (docRef) {
                    resolve({ success: true, docRef: docRef });
                })
                    .catch(function (error) {
                    reject({ success: false, error: error });
                });
            }
            else {
                ref
                    .doc(doc)
                    .set(data)
                    .then(function (docRef) {
                    resolve({ success: true, docRef: docRef });
                })
                    .catch(function (error) {
                    reject({ success: false, error: error });
                });
            }
        });
    };
    return FirestoreQueryManager;
}());
// Export original validator but rename it

//# sourceMappingURL=firestoreQueryManager.js.map

/***/ }),

/***/ "../../../../../src/app/login.activate.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginActivate; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__firestore_cfg_firestore__ = __webpack_require__("../../../../../src/app/firestore-cfg/firestore.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginActivate = (function () {
    function LoginActivate(router) {
        this.router = router;
        /**
         * Route
         * @type {{root: string; showcase: string; login: string}}
         */
        this.ROUTE = {
            // Root
            root: '/',
            // Showcase page
            showcase: '',
            // Login Page
            login: 'login'
        };
        this.fs = new __WEBPACK_IMPORTED_MODULE_2__firestore_cfg_firestore__["a" /* Firestore */]();
    }
    LoginActivate.prototype.canActivate = function (route, state) {
        // Wrapper of this object
        var self = this;
        // Current firebase cfg
        var fb = this.fs.getConfiguredFirebase();
        // On user auth change select correct page
        fb.auth().onAuthStateChanged(function (user) {
            if (Boolean(user) && self.router.url !== self.ROUTE.root) {
                self.router.navigate([self.ROUTE.showcase]);
            }
            else if (!Boolean(user)) {
                self.router.navigate([self.ROUTE.login]);
            }
        });
        return true;
    };
    return LoginActivate;
}());
LoginActivate = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _a || Object])
], LoginActivate);

var _a;
//# sourceMappingURL=login.activate.js.map

/***/ }),

/***/ "../../../../../src/app/material-dependencies/material-dependencies-button-indicators.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaterialGeneralModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/** Angular Material Generic import */




var MaterialGeneralModule = (function () {
    function MaterialGeneralModule() {
    }
    return MaterialGeneralModule;
}());
MaterialGeneralModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MatCardModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["b" /* MatButtonModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["m" /* MatIconModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MatCheckboxModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["u" /* MatProgressSpinnerModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["t" /* MatProgressBarModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["e" /* MatChipsModule */]],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MatCardModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["b" /* MatButtonModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["m" /* MatIconModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["d" /* MatCheckboxModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["u" /* MatProgressSpinnerModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["t" /* MatProgressBarModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["e" /* MatChipsModule */]]
    })
], MaterialGeneralModule);

//# sourceMappingURL=material-dependencies-button-indicators.module.js.map

/***/ }),

/***/ "../../../../../src/app/material-dependencies/material-dependencies-data-table.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaterialDataTableModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/** Angular Material Generic import */

var MaterialDataTableModule = (function () {
    function MaterialDataTableModule() {
    }
    return MaterialDataTableModule;
}());
MaterialDataTableModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_material__["s" /* MatPaginatorModule */]],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_material__["s" /* MatPaginatorModule */]]
    })
], MaterialDataTableModule);

//# sourceMappingURL=material-dependencies-data-table.module.js.map

/***/ }),

/***/ "../../../../../src/app/material-dependencies/material-dependencies-form-controls.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaterialFormControlsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

// Input imports




var MaterialFormControlsModule = (function () {
    function MaterialFormControlsModule() {
    }
    return MaterialFormControlsModule;
}());
MaterialFormControlsModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_material__["n" /* MatInputModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["k" /* MatFormFieldModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["v" /* MatRadioModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MatDatepickerModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["r" /* MatNativeDateModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["w" /* MatSelectModule */]],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_material__["n" /* MatInputModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["k" /* MatFormFieldModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["v" /* MatRadioModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MatDatepickerModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["r" /* MatNativeDateModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["w" /* MatSelectModule */]]
    })
], MaterialFormControlsModule);

//# sourceMappingURL=material-dependencies-form-controls.module.js.map

/***/ }),

/***/ "../../../../../src/app/material-dependencies/material-dependencies-layout.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaterialLayoutModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/** Angular Material Form import */

/** Angular Material Stepper */

/** Angular Material Grid List layout */

var MaterialLayoutModule = (function () {
    function MaterialLayoutModule() {
    }
    return MaterialLayoutModule;
}());
MaterialLayoutModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormsModule */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["i" /* ReactiveFormsModule */], __WEBPACK_IMPORTED_MODULE_2__angular_material__["z" /* MatStepperModule */], __WEBPACK_IMPORTED_MODULE_2__angular_material__["l" /* MatGridListModule */], __WEBPACK_IMPORTED_MODULE_2__angular_material__["j" /* MatExpansionModule */], __WEBPACK_IMPORTED_MODULE_2__angular_material__["p" /* MatListModule */], __WEBPACK_IMPORTED_MODULE_2__angular_material__["o" /* MatLineModule */]],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* FormsModule */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["i" /* ReactiveFormsModule */], __WEBPACK_IMPORTED_MODULE_2__angular_material__["z" /* MatStepperModule */], __WEBPACK_IMPORTED_MODULE_2__angular_material__["l" /* MatGridListModule */], __WEBPACK_IMPORTED_MODULE_2__angular_material__["j" /* MatExpansionModule */], __WEBPACK_IMPORTED_MODULE_2__angular_material__["p" /* MatListModule */], __WEBPACK_IMPORTED_MODULE_2__angular_material__["o" /* MatLineModule */]]
    })
], MaterialLayoutModule);

//# sourceMappingURL=material-dependencies-layout.module.js.map

/***/ }),

/***/ "../../../../../src/app/material-dependencies/material-dependencies-navigation.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaterialNavigationModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

// Input imports


var MaterialNavigationModule = (function () {
    function MaterialNavigationModule() {
    }
    return MaterialNavigationModule;
}());
MaterialNavigationModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_material__["A" /* MatToolbarModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["q" /* MatMenuModule */]],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_material__["A" /* MatToolbarModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["q" /* MatMenuModule */]]
    })
], MaterialNavigationModule);

//# sourceMappingURL=material-dependencies-navigation.module.js.map

/***/ }),

/***/ "../../../../../src/app/material-dependencies/material-dependencies-popup-modals.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaterialPopupModalModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/** Angular Material Generic import */



var MaterialPopupModalModule = (function () {
    function MaterialPopupModalModule() {
    }
    return MaterialPopupModalModule;
}());
MaterialPopupModalModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_material__["B" /* MatTooltipModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["h" /* MatDialogModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["y" /* MatSnackBarModule */]],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_material__["B" /* MatTooltipModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["h" /* MatDialogModule */], __WEBPACK_IMPORTED_MODULE_1__angular_material__["y" /* MatSnackBarModule */]]
    })
], MaterialPopupModalModule);

//# sourceMappingURL=material-dependencies-popup-modals.module.js.map

/***/ }),

/***/ "../../../../../src/app/material-dependencies/material-dependencies.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MaterialDependenciesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__material_dependencies_button_indicators_module__ = __webpack_require__("../../../../../src/app/material-dependencies/material-dependencies-button-indicators.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__material_dependencies_form_controls_module__ = __webpack_require__("../../../../../src/app/material-dependencies/material-dependencies-form-controls.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__material_dependencies_layout_module__ = __webpack_require__("../../../../../src/app/material-dependencies/material-dependencies-layout.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__material_dependencies_navigation_module__ = __webpack_require__("../../../../../src/app/material-dependencies/material-dependencies-navigation.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__material_dependencies_popup_modals_module__ = __webpack_require__("../../../../../src/app/material-dependencies/material-dependencies-popup-modals.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__material_dependencies_data_table_module__ = __webpack_require__("../../../../../src/app/material-dependencies/material-dependencies-data-table.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/** Includes sub material components dependencies */






var MaterialDependenciesModule = (function () {
    function MaterialDependenciesModule() {
    }
    return MaterialDependenciesModule;
}());
MaterialDependenciesModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__material_dependencies_button_indicators_module__["a" /* MaterialGeneralModule */], __WEBPACK_IMPORTED_MODULE_2__material_dependencies_form_controls_module__["a" /* MaterialFormControlsModule */], __WEBPACK_IMPORTED_MODULE_3__material_dependencies_layout_module__["a" /* MaterialLayoutModule */], __WEBPACK_IMPORTED_MODULE_4__material_dependencies_navigation_module__["a" /* MaterialNavigationModule */], __WEBPACK_IMPORTED_MODULE_5__material_dependencies_popup_modals_module__["a" /* MaterialPopupModalModule */], __WEBPACK_IMPORTED_MODULE_6__material_dependencies_data_table_module__["a" /* MaterialDataTableModule */]],
        exports: [__WEBPACK_IMPORTED_MODULE_1__material_dependencies_button_indicators_module__["a" /* MaterialGeneralModule */], __WEBPACK_IMPORTED_MODULE_2__material_dependencies_form_controls_module__["a" /* MaterialFormControlsModule */], __WEBPACK_IMPORTED_MODULE_3__material_dependencies_layout_module__["a" /* MaterialLayoutModule */], __WEBPACK_IMPORTED_MODULE_4__material_dependencies_navigation_module__["a" /* MaterialNavigationModule */], __WEBPACK_IMPORTED_MODULE_5__material_dependencies_popup_modals_module__["a" /* MaterialPopupModalModule */], __WEBPACK_IMPORTED_MODULE_6__material_dependencies_data_table_module__["a" /* MaterialDataTableModule */]]
    })
], MaterialDependenciesModule);

//# sourceMappingURL=material-dependencies.module.js.map

/***/ }),

/***/ "../../../../../src/app/registration-dialog/registration-dialog.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".btn-login-google {\n  width: 100%;\n}\n\n.mat-separator {\n  border-bottom: 1px solid #ededed;\n  padding: 10px 0;\n  margin-bottom: 15px;\n}\n\n.input-login {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.input-login .input-left {\n  margin-right: 10px;\n}\n\n.input-login .input-right {\n  margin-left: 10px;\n}\n\n.submit-login button{\n  float: right;\n  width: 47%;\n  margin-top: 20px;\n}\n\n@media only screen and (max-width: 767px) {\n  .input-login {\n    display: block;\n  }\n\n  .input-login .input-left {\n    margin-right: auto;\n    width: 100%;\n  }\n  .input-login .input-right {\n    margin-left: auto;\n    width: 100%;\n  }\n\n  .submit-login button{\n    float: none;\n    width: 100%;\n    margin-top: 5px;\n  }\n}\n\n\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/registration-dialog/registration-dialog.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"LoginDialog\" class=\"mat-dialog-login\">\n  <form [formGroup]=\"FormGroup\">\n    <div class=\"input-login\">\n      <mat-form-field class=\"input-left\">\n        <input matInput placeholder=\"Email\" formControlName=\"email\" required>\n        <mat-error>\n          <strong>Required</strong> a valid email address\n        </mat-error>\n      </mat-form-field>\n\n      <mat-form-field class=\"input-right\">\n        <input matInput placeholder=\"Enter your password\" [type]=\"hide ? 'password' : 'text'\" formControlName=\"password\" required>\n        <mat-icon matSuffix class=\"material-icons\" (click)=\"hide = !hide\">{{hide ? 'visibility' : 'visibility_off'}}</mat-icon>\n        <mat-error>\n          Enter a password of at least <strong>six</strong> characters\n        </mat-error>\n      </mat-form-field>\n    </div>\n\n    <div class=\"submit-login\">\n      <button mat-raised-button color=\"primary\" (click)=\"logIn()\">\n        <small>Log In</small>\n      </button>\n    </div>\n  </form>\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/registration-dialog/registration-dialog.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistrationDialogComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__firestore_cfg_firestore__ = __webpack_require__("../../../../../src/app/firestore-cfg/firestore.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_event_emitter_service_event_emitter_service__ = __webpack_require__("../../../../../src/app/services/event-emitter-service/event-emitter.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var PWD_MIN_LENGTH = 6;
var RegistrationDialogComponent = (function () {
    function RegistrationDialogComponent(dialogRef, _formBuilder, eventEmitter, data) {
        this.dialogRef = dialogRef;
        this._formBuilder = _formBuilder;
        this.eventEmitter = eventEmitter;
        this.data = data;
        // Declare property of password input type
        this.hide = true;
        // Initialize a Firestore object
        this.fs = new __WEBPACK_IMPORTED_MODULE_3__firestore_cfg_firestore__["a" /* Firestore */]();
        this.db = this.fs.getFirestoreDB();
    }
    RegistrationDialogComponent.prototype.ngOnInit = function () {
        this.FormGroup = this._formBuilder.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* Validators */].pattern(EMAIL_REGEX)],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["j" /* Validators */].minLength(PWD_MIN_LENGTH)]
        });
    };
    RegistrationDialogComponent.prototype.logIn = function () {
        var self = this;
        var email = this.FormGroup.controls['email'].value, password = this.FormGroup.controls['password'].value;
        this.fs.getConfiguredFirebase()
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(function (success) {
            self.logged();
        })
            .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        });
    };
    RegistrationDialogComponent.prototype.logged = function () {
        this.eventEmitter.emitEventEmitter({
            logged: true
        });
        this.dialogRef.close();
    };
    RegistrationDialogComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    return RegistrationDialogComponent;
}());
RegistrationDialogComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-registration-dialog',
        template: __webpack_require__("../../../../../src/app/registration-dialog/registration-dialog.component.html"),
        styles: [__webpack_require__("../../../../../src/app/registration-dialog/registration-dialog.component.css")]
    }),
    __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MAT_DIALOG_DATA */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["i" /* MatDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["i" /* MatDialogRef */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormBuilder */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__services_event_emitter_service_event_emitter_service__["a" /* EventEmitterService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_event_emitter_service_event_emitter_service__["a" /* EventEmitterService */]) === "function" && _c || Object, Object])
], RegistrationDialogComponent);

var _a, _b, _c;
//# sourceMappingURL=registration-dialog.component.js.map

/***/ }),

/***/ "../../../../../src/app/registration-stepper/registration-stepper.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "[readonly] {\n  color: #aaa;\n}\n\n[hidden] {\n  display: none!important;\n}\n\n/* Registration form */\n.registration-cards {\n  display: -ms-flex;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n/* Registration description */\n.registration-description-card {\n  margin: 20px 20px 20px 50px;\n  width: 30%;\n}\n\n.registration-stepper-card .login {\n  height: 100%;\n  width: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  position: absolute;\n  background-color: rgba(255,255,255,.85);\n  z-index: 1;\n  top: 0;\n  left: 0;\n}\n\n.registration-stepper-card .login mat-spinner {\n  width: 100px;\n  height: 100px;\n\n  left: 50%;\n  top: 50%;\n\n  margin-top: -50px;\n  margin-left: -50px;\n}\n\n.image-content {\n  position: relative;\n}\n\n.image-content .profile-image {\n  width: 250px;\n  height: 250px;\n\n  border-radius: 2px;\n}\n.image-content .profile-image-upload {\n  position: absolute;\n  bottom: -15px;\n  left: 230px;\n  z-index: 1;\n}\n\n/* information */\n.description-list .registration-block {\n  display: table;\n}\n\n.description-list .registration-text {\n  padding: 10px;\n  display: table-cell;\n}\n\n.description-list .registration-ico {\n  display: table-cell;\n  padding: 0 20px 20px 0;\n  vertical-align: middle;\n}\n\n.description-list .registration-ico mat-icon {\n  font-size: 32px;\n}\n\n/* Registration stepper */\n.registration-stepper-card {\n  margin: 20px 50px 20px 20px;\n  width: 70%;\n}\n\n.form-2-col-g-xs {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 100%;\n}\n\n.form-input-lt {\n  margin-right: 10px;\n}\n\n.form-input-rt {\n  margin-left: 10px;\n}\n\n@media only screen and (max-width: 768px) {\n  .form-2-col-g-xs {\n    display: inline-block;\n  }\n\n  .form-input-lt, .form-input-rt {\n    margin: 0;\n  }\n\n  .registration-cards {\n    display: block;\n  }\n\n  /* Registration description */\n  .registration-description-card {\n    margin: 20px;\n    width: auto;\n  }\n\n  /* Registration stepper */\n  .registration-stepper-card {\n    margin: 20px;\n    width: auto;\n  }\n}\n\n.form-2-col-g-xs mat-form-field {\n  width: 100%;\n}\n\n/* User Information - Second step */\n.user-info {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-bottom: 15px;\n}\n\n.user-info .user-addons {\n  margin-left: 35px;\n  width: 100%;\n}\n\n.user-info .user-addons h5.no-margin-bottom {\n  margin-bottom: 0;\n}\n\n.user-info .user-addons .radio-group-gender {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n\n.user-info .user-addons .radio-group-gender mat-radio-button{\n  margin: 5px 0;\n}\n\n.user-info .user-addons .user-date {\n  width: 100%;\n}\n\n@media only screen and (max-width: 768px) {\n  .user-info {\n    display: block;\n  }\n\n  .user-info .user-addons {\n    margin-left: unset;\n  }\n}\n\n@media only screen and (min-width: 769px) and (max-width: 1281px) {\n  .registration-description-card {\n    margin: 20px 10px 20px 20px;\n    width: 40%;\n  }\n\n  .registration-stepper-card {\n    margin: 20px 10px 20px 20px;\n    width: 60%;\n  }\n}\n\n.full-width {\n  width: 100%;\n}\n.btn-right {\n  float: right;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/registration-stepper/registration-stepper.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"registration-cards\">\n  <mat-card class=\"registration-description-card\">\n    <mat-card-title-group>Uninsubria</mat-card-title-group>\n    <mat-card-subtitle>Course: Web-Application </mat-card-subtitle>\n    <mat-card-subtitle>Project name: Showcase </mat-card-subtitle>\n    <mat-card-subtitle>Compiler: Simone Magetta </mat-card-subtitle>\n    <mat-card-subtitle>Date: 30/12/2017 </mat-card-subtitle>\n\n  </mat-card>\n\n  <mat-card class=\"registration-stepper-card\">\n    <mat-horizontal-stepper class=\"registration-stepper\" [linear]=\"isLinear\" (selectionChange)=\"register($event)\">\n      <mat-step [stepControl]=\"firstFormGroup\">\n        <form [formGroup]=\"firstFormGroup\">\n          <ng-template matStepLabel>Fill out general information</ng-template>\n\n          <div class=\"form-2-col-g-xs\">\n            <mat-form-field class=\"form-input-lt\">\n              <input matInput placeholder=\"First name\" formControlName=\"name\" required>\n              <mat-error>\n                First name <strong>required</strong>\n              </mat-error>\n            </mat-form-field>\n\n            <mat-form-field class=\"form-input-rt\">\n              <input matInput placeholder=\"Last name\" formControlName=\"lastname\" required>\n              <mat-error>\n                Last name <strong>required</strong>\n              </mat-error>\n            </mat-form-field>\n          </div>\n\n          <div class=\"form-2-col-g-xs\">\n            <mat-form-field class=\"form-input-lt\">\n              <input matInput autocomplete=\"email\" placeholder=\"Email\" formControlName=\"email\" required>\n              <mat-error>\n                <strong>Required</strong> a valid email address\n              </mat-error>\n            </mat-form-field>\n\n            <mat-form-field class=\"form-input-rt\">\n              <input matInput autocomplete=\"current-password\" placeholder=\"Enter your password\" [type]=\"hide ? 'password' : 'text'\" formControlName=\"password\" required>\n              <mat-icon matSuffix class=\"material-icons\" (click)=\"hide = !hide\">{{hide ? 'visibility' : 'visibility_off'}}</mat-icon>\n              <mat-error>\n                Enter a password of at least <strong>six</strong> characters\n              </mat-error>\n            </mat-form-field>\n          </div>\n\n          <mat-form-field class=\"full-width\">\n            <span matPrefix>+&nbsp;</span>\n            <input type=\"tel\" matInput formControlName=\"telephone\" placeholder=\"Telephone\">\n            <mat-icon matSuffix class=\"material-icons\">mode_edit</mat-icon>\n            <mat-hint align=\"start\">\n              <strong>Enter your number to be contactable</strong>\n            </mat-hint>\n          </mat-form-field>\n\n          <div>\n            <button class=\"btn-right\" mat-raised-button matStepperNext color=\"primary\">Next</button>\n          </div>\n        </form>\n      </mat-step>\n\n      <mat-step [stepControl]=\"secondFormGroup\">\n        <form [formGroup]=\"secondFormGroup\">\n          <ng-template matStepLabel>Fill out additional information</ng-template>\n\n          <div class=\"user-info\">\n            <div class=\"image-content\">\n              <img class=\"profile-image\" id=\"profilePhoto\" [src]=\"imagePath || '/assets/other/default-profile.png'\" alt=\"Profile image\">\n\n              <button class=\"profile-image-upload\" mat-mini-fab color=\"primary\" (click)=\"uploadPhoto.click()\">\n                <mat-icon>file_upload</mat-icon>\n              </button>\n\n              <input #uploadPhoto name=\"profilePhoto\" type=\"file\" accept=\"image/*\" (change)=\"setSrcUrl( $event )\" hidden>\n            </div>\n\n            <mat-card class=\"user-addons\">\n              <h5>Enter your gender</h5>\n              <mat-radio-group class=\"radio-group-gender\" formControlName=\"gender\" required>\n                <mat-radio-button aria-label=\"Male gender\" value=\"male\" [checked]=\"'true'\" >Male</mat-radio-button>\n                <mat-radio-button aria-label=\"Female gender\" value=\"female\">Female</mat-radio-button>\n              </mat-radio-group>\n\n              <h5 class=\"no-margin-bottom\">Enter your date of birth</h5>\n              <mat-form-field class=\"user-date\">\n                <input matInput [matDatepicker]=\"picker\" placeholder=\"Choose a date\">\n                <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n                <mat-datepicker #picker></mat-datepicker>\n              </mat-form-field>\n            </mat-card>\n          </div>\n\n          <div>\n            <button mat-raised-button matStepperPrevious color=\"primary\">Back</button>\n            <button class=\"btn-right\" mat-raised-button matStepperNext color=\"primary\">Finish</button>\n          </div>\n        </form>\n      </mat-step>\n\n      <mat-step #registrationStep>\n        <ng-template matStepLabel>Done</ng-template>\n        You are now done.\n        <div>\n          <button mat-raised-button matStepperPrevious color=\"primary\">Back</button>\n        </div>\n      </mat-step>\n    </mat-horizontal-stepper>\n  </mat-card>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/registration-stepper/registration-stepper.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegistrationStepperComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__firestore_cfg_firestore__ = __webpack_require__("../../../../../src/app/firestore-cfg/firestore.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__firestore_cfg_firestoreQueryManager__ = __webpack_require__("../../../../../src/app/firestore-cfg/firestoreQueryManager.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_file_upload_file_upload_service__ = __webpack_require__("../../../../../src/app/services/file-upload/file-upload.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_error_handler_messages_handler_service__ = __webpack_require__("../../../../../src/app/services/error-handler/messages-handler.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utility_string_utils__ = __webpack_require__("../../../../../src/app/utility/string.utils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__firestore_cfg_firestore_users__ = __webpack_require__("../../../../../src/app/firestore-cfg/firestore.users.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var PWD_MIN_LENGTH = 6;
/**
 * @title Stepper overview
 */
var RegistrationStepperComponent = (function () {
    function RegistrationStepperComponent(_formBuilder, _fileUploadService, _messagesHandler) {
        this._formBuilder = _formBuilder;
        this._fileUploadService = _fileUploadService;
        this._messagesHandler = _messagesHandler;
        //
        this.MESSAGE = 'Ooops!! Unable to upload the photo with that format';
        this.REGISTER = 2;
        // Indicates that stepper is in linear mode
        this.isLinear = true;
        // Declare property of password input type
        this.hide = true;
        // Initialize a Firestore and FirestoreQueryManager objects
        this.fs = new __WEBPACK_IMPORTED_MODULE_2__firestore_cfg_firestore__["a" /* Firestore */]();
        this.fsQM = new __WEBPACK_IMPORTED_MODULE_3__firestore_cfg_firestoreQueryManager__["a" /* FirestoreQM */]();
        this.fb = this.fs.getConfiguredFirebase();
    }
    RegistrationStepperComponent.prototype.ngOnInit = function () {
        /**
         * First block of registration module
         * @type {FormGroup}
         */
        this.firstFormGroup = this._formBuilder.group({
            name: [__WEBPACK_IMPORTED_MODULE_6__utility_string_utils__["a" /* StringUtils */].EMPTY, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["j" /* Validators */].required],
            lastname: [__WEBPACK_IMPORTED_MODULE_6__utility_string_utils__["a" /* StringUtils */].EMPTY, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["j" /* Validators */].required],
            email: [__WEBPACK_IMPORTED_MODULE_6__utility_string_utils__["a" /* StringUtils */].EMPTY, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["j" /* Validators */].pattern(EMAIL_REGEX)],
            password: [__WEBPACK_IMPORTED_MODULE_6__utility_string_utils__["a" /* StringUtils */].EMPTY, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["j" /* Validators */].minLength(PWD_MIN_LENGTH)],
            telephone: [__WEBPACK_IMPORTED_MODULE_6__utility_string_utils__["a" /* StringUtils */].EMPTY]
        });
        /**
         * Second block of registration module
         * @type {FormGroup}
         */
        this.secondFormGroup = this._formBuilder.group({
            profilePhoto: [__WEBPACK_IMPORTED_MODULE_6__utility_string_utils__["a" /* StringUtils */].EMPTY, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["j" /* Validators */].required],
            gender: ['male', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["j" /* Validators */].required]
        });
    };
    RegistrationStepperComponent.prototype.setSrcUrl = function (evt) {
        var self = this;
        // Retrieve File object
        var fileResponse = this._fileUploadService.getFile(evt, 'image/*');
        if (fileResponse.success) {
            // Validate profilePhoto form control
            this.secondFormGroup.controls['profilePhoto'].setValue(true);
            // Update profile image file
            this.imageBlob = fileResponse.file;
            // Use getBase64 to generate a background image path
            this._fileUploadService.getBase64(fileResponse.file)
                .then(function (res) {
                // Set image background
                self.imagePath = res.toString();
            });
        }
        else if (!fileResponse.success && fileResponse.error === this._fileUploadService.UNSUPPORTED_EXTENSION) {
            this._messagesHandler.openSnackBar(self.MESSAGE);
        }
    };
    RegistrationStepperComponent.prototype.fillUserProperties = function () {
        return {
            firstName: this.firstFormGroup.controls['name'].value,
            lastName: this.firstFormGroup.controls['lastname'].value,
            phoneNumber: this.firstFormGroup.controls['telephone'].value,
            photoURL: this.imageBlob,
            gender: this.secondFormGroup.controls['gender'].value
        };
    };
    RegistrationStepperComponent.prototype.register = function (evt) {
        if (evt['selectedIndex'] !== this.REGISTER)
            return;
        // Wrapper of this object
        var self = this;
        var fsU = new __WEBPACK_IMPORTED_MODULE_7__firestore_cfg_firestore_users__["a" /* FirestoreUsers */]();
        // Creates new user
        fsU.createUser(this.firstFormGroup.controls['email'].value, this.firstFormGroup.controls['password'].value).then(function (res) {
            fsU.updateUser(self.fillUserProperties());
        });
    };
    return RegistrationStepperComponent;
}());
RegistrationStepperComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-registration-stepper',
        template: __webpack_require__("../../../../../src/app/registration-stepper/registration-stepper.component.html"),
        styles: [__webpack_require__("../../../../../src/app/registration-stepper/registration-stepper.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormBuilder */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__services_file_upload_file_upload_service__["a" /* FileUploadService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_file_upload_file_upload_service__["a" /* FileUploadService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__services_error_handler_messages_handler_service__["a" /* MessagesHandlerService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__services_error_handler_messages_handler_service__["a" /* MessagesHandlerService */]) === "function" && _c || Object])
], RegistrationStepperComponent);

var _a, _b, _c;
//# sourceMappingURL=registration-stepper.component.js.map

/***/ }),

/***/ "../../../../../src/app/services/error-handler/messages-handler.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagesHandlerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MessagesHandlerService = (function () {
    function MessagesHandlerService(snackBar) {
        this.snackBar = snackBar;
    }
    /**
     * Opens a snackbar with a message and an optional action.
     * @param {string} message The message to show in the snackbar
     * @param {string} action The label for the snackbar action [optional]
     * @param {number} duration Additional duration configuration options for the snackbar
     */
    MessagesHandlerService.prototype.openSnackBar = function (message, action, duration) {
        this.snackBar.open(message, action, {
            duration: duration || 2000
        });
    };
    return MessagesHandlerService;
}());
MessagesHandlerService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["x" /* MatSnackBar */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["x" /* MatSnackBar */]) === "function" && _a || Object])
], MessagesHandlerService);

var _a;
//# sourceMappingURL=messages-handler.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/event-emitter-service/event-emitter.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventEmitterService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EventEmitterService = (function () {
    function EventEmitterService() {
        this.eventEmitter = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    /**
     *
     * @param data
     */
    EventEmitterService.prototype.emitEventEmitter = function (data) {
        this.eventEmitter.emit(data);
    };
    /**
     *
     * @returns {EventEmitter<any>}
     */
    EventEmitterService.prototype.getEventEmitter = function () {
        return this.eventEmitter;
    };
    return EventEmitterService;
}());
EventEmitterService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], EventEmitterService);

//# sourceMappingURL=event-emitter.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/file-upload/file-upload.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileUploadService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FileUploadService = (function () {
    function FileUploadService() {
        this.UNSUPPORTED_EXTENSION = 1;
        this.NO_FILE_SELECTED = 2;
    }
    /**
     *
     * @param evt
     * @param {string} fileType
     * @returns {any}
     */
    FileUploadService.prototype.getFile = function (evt, fileType) {
        var tgt = evt.target || window.event.srcElement, files = tgt.files, fileTypeMatch;
        // Check mimeType
        fileTypeMatch = Boolean(files && files.length &&
            files[0].type.match(fileType));
        // If file type mismatch, advice current user with MatSnackBar
        if (!fileTypeMatch)
            return { success: false, error: this.UNSUPPORTED_EXTENSION };
        // Check file object
        if (files && files.length)
            return { success: true, file: files[0] };
        return { success: false, error: this.NO_FILE_SELECTED };
    };
    /**
     *
     * @param {File} file
     * @returns {Promise<string | number>}
     */
    FileUploadService.prototype.getBase64 = function (file) {
        // Wrap of this object
        var self = this;
        // FileReader support
        if (FileReader && file) {
            var fr_1 = new FileReader();
            fr_1.readAsDataURL(file);
            return new Promise(function (resolve) {
                fr_1.onload = function () {
                    resolve(fr_1.result);
                };
            });
        }
        else {
            // fallback -- perhaps submit the input to an iframe and temporarily store
            // them on the server until the user's session ends.
            return new Promise(function (resolve, reject) {
                reject(self.NO_FILE_SELECTED);
            });
        }
    };
    return FileUploadService;
}());
FileUploadService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], FileUploadService);

//# sourceMappingURL=file-upload.service.js.map

/***/ }),

/***/ "../../../../../src/app/toolbar/toolbar.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".toolbar {\n  position: fixed;\n  z-index: 10;\n}\n\n.icon {\n  padding: 0 14px;\n}\n\n.spacer {\n  -webkit-box-flex: 1;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n}\n\n.user-photo {\n  background-size: cover;\n  border-radius: 15px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/toolbar/toolbar.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-toolbar color=\"primary\" class=\"toolbar mat-elevation-z3\">\n  <span>Project Showcase</span>\n  <span class=\"spacer\"></span>\n\n  <span *ngIf=\"!logged\">\n    <button mat-raised-button color=\"primary\" (click)=\"openDialog()\">\n      <mat-icon aria-label=\"Log In\">account_circle</mat-icon>\n      <small>Log In</small>\n    </button>\n  </span>\n\n  <span *ngIf=\"logged\">\n    <button mat-raised-button color=\"primary\" (click)=\"logOut()\">\n      <mat-icon aria-label=\"Log Out\" class=\"user-photo\" [style.backgroundImage]=\"'url(' + getUserPhoto() + ')'\"></mat-icon>\n      <small>Log Out</small>\n    </button>\n  </span>\n</mat-toolbar>\n"

/***/ }),

/***/ "../../../../../src/app/toolbar/toolbar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToolbarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__registration_dialog_registration_dialog_component__ = __webpack_require__("../../../../../src/app/registration-dialog/registration-dialog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__firestore_cfg_firestore__ = __webpack_require__("../../../../../src/app/firestore-cfg/firestore.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utility_utils__ = __webpack_require__("../../../../../src/app/utility/utils.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__firestore_cfg_firestore_users__ = __webpack_require__("../../../../../src/app/firestore-cfg/firestore.users.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// Custom Library




var ToolbarComponent = (function () {
    function ToolbarComponent(dialog) {
        this.dialog = dialog;
        // Initialize a Firestore and FirestoreQueryManager objects
        this.fs = new __WEBPACK_IMPORTED_MODULE_3__firestore_cfg_firestore__["a" /* Firestore */]();
        this.fb = this.fs.getConfiguredFirebase();
        this.fsU = new __WEBPACK_IMPORTED_MODULE_5__firestore_cfg_firestore_users__["a" /* FirestoreUsers */]();
        // Current logged state
        this.logged = false;
    }
    /**
     * On init component, check if user is logged or not.
     */
    ToolbarComponent.prototype.ngOnInit = function () {
        var self = this;
        this.fb.auth().onAuthStateChanged(function (user) {
            self.logged = Boolean(user);
            // Refresh view
            __WEBPACK_IMPORTED_MODULE_4__utility_utils__["a" /* Utils */].refreshView();
        });
    };
    /**
     * Retrieve the variable value
     * @returns {boolean}
     */
    ToolbarComponent.prototype.getUserPhoto = function () {
        return this.fsU.getLoggedUser().photoURL || '';
    };
    ToolbarComponent.prototype.logOut = function () {
        this.fb.auth().signOut().then(function () {
            // Sign-out successful.
        }).catch(function (error) {
            // An error happened.
        });
    };
    ToolbarComponent.prototype.openDialog = function () {
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_2__registration_dialog_registration_dialog_component__["a" /* RegistrationDialogComponent */], {});
        dialogRef.afterClosed().subscribe(function (result) {
            //console.log( 'The dialog was closed' );
        });
    };
    return ToolbarComponent;
}());
ToolbarComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-toolbar',
        template: __webpack_require__("../../../../../src/app/toolbar/toolbar.component.html"),
        styles: [__webpack_require__("../../../../../src/app/toolbar/toolbar.component.css")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["g" /* MatDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["g" /* MatDialog */]) === "function" && _a || Object])
], ToolbarComponent);

var _a;
//# sourceMappingURL=toolbar.component.js.map

/***/ }),

/***/ "../../../../../src/app/utility/string.utils.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StringUtils; });
/**
 * Contains UTILS functions
 */
var StringUtils = (function () {
    function StringUtils() {
    }
    /**
     * Checks if a String is empty ("") or null.
     * @param {string} str the String to check, may be null
     * @returns {boolean} true if the String is empty or null
     */
    StringUtils.isEmpty = function (str) {
        return str === null || str === '';
    };
    return StringUtils;
}());

/**
 * The empty String "".
 * @type {string}
 */
StringUtils.EMPTY = '';
/**
 * The space String
 * @type {string}
 */
StringUtils.SPACE = ' ';
//# sourceMappingURL=string.utils.js.map

/***/ }),

/***/ "../../../../../src/app/utility/upload/fileupload.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UploadFileService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase__ = __webpack_require__("../../../../firebase/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var UploadFileService = (function () {
    function UploadFileService() {
    }
    UploadFileService.prototype.pushFileToStorage = function (fileUpload, basePath, progress, fileUploaded) {
        var storageRef = __WEBPACK_IMPORTED_MODULE_1_firebase__["storage"]().ref();
        var uploadTask = storageRef.child(basePath + "/" + fileUpload.file.name).put(fileUpload.file);
        fileUploaded.data.push(fileUpload);
        return new Promise(function (resolve, reject) {
            uploadTask.on(__WEBPACK_IMPORTED_MODULE_1_firebase__["storage"].TaskEvent.STATE_CHANGED, function (snapshot) {
                // in progress
                var snap = snapshot;
                progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
                fileUpload.progress = progress.percentage;
            }, function (error) {
                // fail
                console.log(error);
                reject({ success: false, error: error });
            }, function () {
                // success
                fileUpload.url = uploadTask.snapshot.downloadURL;
                fileUpload.name = fileUpload.file.name;
                fileUpload.complete = true;
                resolve({ success: true, file: fileUpload });
            });
        });
    };
    UploadFileService.prototype.deleteFileUpload = function (fu, basePath) {
        this.deleteFileStorage(fu.name, basePath);
    };
    UploadFileService.prototype.deleteFileStorage = function (name, basePath) {
        var storageRef = __WEBPACK_IMPORTED_MODULE_1_firebase__["storage"]().ref();
        storageRef.child(basePath + "/" + name).delete()
            .catch(function (error) { return console.error(error); });
    };
    return UploadFileService;
}());
UploadFileService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], UploadFileService);

//# sourceMappingURL=fileupload.service.js.map

/***/ }),

/***/ "../../../../../src/app/utility/upload/fileupload.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FileUpload; });
var FileUpload = (function () {
    function FileUpload(file) {
        this.file = file;
        this.complete = false;
    }
    return FileUpload;
}());

//# sourceMappingURL=fileupload.js.map

/***/ }),

/***/ "../../../../../src/app/utility/utils.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Utils; });
/**
 * Contains UTILS functions
 */
var Utils = (function () {
    function Utils() {
    }
    /**
     * Dispatch 'resize' event in order to refreshing ngView
     */
    Utils.refreshView = function () {
        window.dispatchEvent(new Event('resize'));
    };
    /**
     * Wrapper of querySelectorAll js method
     * @param {string} query is a group of selectors to match on or elements of the DOM
     * @returns {any} a non-live node list [ NodeList[elements] ] of element objects
     */
    Utils.find = function (query) {
        if (!document || !query)
            return null;
        return document.querySelectorAll(query);
    };
    return Utils;
}());

//# sourceMappingURL=utils.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: true,
    firebase: {
        apiKey: "AIzaSyDbSul24AYIRgTbJWMcHe8Z3bo8lU9RUzo",
        authDomain: "applicazioni-web-63d92.firebaseapp.com",
        databaseURL: "https://applicazioni-web-63d92.firebaseio.com",
        projectId: "applicazioni-web-63d92",
        storageBucket: "applicazioni-web-63d92.appspot.com",
        messagingSenderId: "1098101396959"
    }
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/environments/firebase.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return firebase; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var firebase = {
    production: true,
    firebase: {
        apiKey: "AIzaSyDbSul24AYIRgTbJWMcHe8Z3bo8lU9RUzo",
        authDomain: "applicazioni-web-63d92.firebaseapp.com",
        databaseURL: "https://applicazioni-web-63d92.firebaseio.com",
        projectId: "applicazioni-web-63d92",
        storageBucket: "applicazioni-web-63d92.appspot.com",
        messagingSenderId: "1098101396959"
    }
};
//# sourceMappingURL=firebase.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=main.js.map

/***/ }),

/***/ "../../../../moment/locale recursive ^\\.\\/.*$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "../../../../moment/locale/af.js",
	"./af.js": "../../../../moment/locale/af.js",
	"./ar": "../../../../moment/locale/ar.js",
	"./ar-dz": "../../../../moment/locale/ar-dz.js",
	"./ar-dz.js": "../../../../moment/locale/ar-dz.js",
	"./ar-kw": "../../../../moment/locale/ar-kw.js",
	"./ar-kw.js": "../../../../moment/locale/ar-kw.js",
	"./ar-ly": "../../../../moment/locale/ar-ly.js",
	"./ar-ly.js": "../../../../moment/locale/ar-ly.js",
	"./ar-ma": "../../../../moment/locale/ar-ma.js",
	"./ar-ma.js": "../../../../moment/locale/ar-ma.js",
	"./ar-sa": "../../../../moment/locale/ar-sa.js",
	"./ar-sa.js": "../../../../moment/locale/ar-sa.js",
	"./ar-tn": "../../../../moment/locale/ar-tn.js",
	"./ar-tn.js": "../../../../moment/locale/ar-tn.js",
	"./ar.js": "../../../../moment/locale/ar.js",
	"./az": "../../../../moment/locale/az.js",
	"./az.js": "../../../../moment/locale/az.js",
	"./be": "../../../../moment/locale/be.js",
	"./be.js": "../../../../moment/locale/be.js",
	"./bg": "../../../../moment/locale/bg.js",
	"./bg.js": "../../../../moment/locale/bg.js",
	"./bm": "../../../../moment/locale/bm.js",
	"./bm.js": "../../../../moment/locale/bm.js",
	"./bn": "../../../../moment/locale/bn.js",
	"./bn.js": "../../../../moment/locale/bn.js",
	"./bo": "../../../../moment/locale/bo.js",
	"./bo.js": "../../../../moment/locale/bo.js",
	"./br": "../../../../moment/locale/br.js",
	"./br.js": "../../../../moment/locale/br.js",
	"./bs": "../../../../moment/locale/bs.js",
	"./bs.js": "../../../../moment/locale/bs.js",
	"./ca": "../../../../moment/locale/ca.js",
	"./ca.js": "../../../../moment/locale/ca.js",
	"./cs": "../../../../moment/locale/cs.js",
	"./cs.js": "../../../../moment/locale/cs.js",
	"./cv": "../../../../moment/locale/cv.js",
	"./cv.js": "../../../../moment/locale/cv.js",
	"./cy": "../../../../moment/locale/cy.js",
	"./cy.js": "../../../../moment/locale/cy.js",
	"./da": "../../../../moment/locale/da.js",
	"./da.js": "../../../../moment/locale/da.js",
	"./de": "../../../../moment/locale/de.js",
	"./de-at": "../../../../moment/locale/de-at.js",
	"./de-at.js": "../../../../moment/locale/de-at.js",
	"./de-ch": "../../../../moment/locale/de-ch.js",
	"./de-ch.js": "../../../../moment/locale/de-ch.js",
	"./de.js": "../../../../moment/locale/de.js",
	"./dv": "../../../../moment/locale/dv.js",
	"./dv.js": "../../../../moment/locale/dv.js",
	"./el": "../../../../moment/locale/el.js",
	"./el.js": "../../../../moment/locale/el.js",
	"./en-au": "../../../../moment/locale/en-au.js",
	"./en-au.js": "../../../../moment/locale/en-au.js",
	"./en-ca": "../../../../moment/locale/en-ca.js",
	"./en-ca.js": "../../../../moment/locale/en-ca.js",
	"./en-gb": "../../../../moment/locale/en-gb.js",
	"./en-gb.js": "../../../../moment/locale/en-gb.js",
	"./en-ie": "../../../../moment/locale/en-ie.js",
	"./en-ie.js": "../../../../moment/locale/en-ie.js",
	"./en-nz": "../../../../moment/locale/en-nz.js",
	"./en-nz.js": "../../../../moment/locale/en-nz.js",
	"./eo": "../../../../moment/locale/eo.js",
	"./eo.js": "../../../../moment/locale/eo.js",
	"./es": "../../../../moment/locale/es.js",
	"./es-do": "../../../../moment/locale/es-do.js",
	"./es-do.js": "../../../../moment/locale/es-do.js",
	"./es-us": "../../../../moment/locale/es-us.js",
	"./es-us.js": "../../../../moment/locale/es-us.js",
	"./es.js": "../../../../moment/locale/es.js",
	"./et": "../../../../moment/locale/et.js",
	"./et.js": "../../../../moment/locale/et.js",
	"./eu": "../../../../moment/locale/eu.js",
	"./eu.js": "../../../../moment/locale/eu.js",
	"./fa": "../../../../moment/locale/fa.js",
	"./fa.js": "../../../../moment/locale/fa.js",
	"./fi": "../../../../moment/locale/fi.js",
	"./fi.js": "../../../../moment/locale/fi.js",
	"./fo": "../../../../moment/locale/fo.js",
	"./fo.js": "../../../../moment/locale/fo.js",
	"./fr": "../../../../moment/locale/fr.js",
	"./fr-ca": "../../../../moment/locale/fr-ca.js",
	"./fr-ca.js": "../../../../moment/locale/fr-ca.js",
	"./fr-ch": "../../../../moment/locale/fr-ch.js",
	"./fr-ch.js": "../../../../moment/locale/fr-ch.js",
	"./fr.js": "../../../../moment/locale/fr.js",
	"./fy": "../../../../moment/locale/fy.js",
	"./fy.js": "../../../../moment/locale/fy.js",
	"./gd": "../../../../moment/locale/gd.js",
	"./gd.js": "../../../../moment/locale/gd.js",
	"./gl": "../../../../moment/locale/gl.js",
	"./gl.js": "../../../../moment/locale/gl.js",
	"./gom-latn": "../../../../moment/locale/gom-latn.js",
	"./gom-latn.js": "../../../../moment/locale/gom-latn.js",
	"./gu": "../../../../moment/locale/gu.js",
	"./gu.js": "../../../../moment/locale/gu.js",
	"./he": "../../../../moment/locale/he.js",
	"./he.js": "../../../../moment/locale/he.js",
	"./hi": "../../../../moment/locale/hi.js",
	"./hi.js": "../../../../moment/locale/hi.js",
	"./hr": "../../../../moment/locale/hr.js",
	"./hr.js": "../../../../moment/locale/hr.js",
	"./hu": "../../../../moment/locale/hu.js",
	"./hu.js": "../../../../moment/locale/hu.js",
	"./hy-am": "../../../../moment/locale/hy-am.js",
	"./hy-am.js": "../../../../moment/locale/hy-am.js",
	"./id": "../../../../moment/locale/id.js",
	"./id.js": "../../../../moment/locale/id.js",
	"./is": "../../../../moment/locale/is.js",
	"./is.js": "../../../../moment/locale/is.js",
	"./it": "../../../../moment/locale/it.js",
	"./it.js": "../../../../moment/locale/it.js",
	"./ja": "../../../../moment/locale/ja.js",
	"./ja.js": "../../../../moment/locale/ja.js",
	"./jv": "../../../../moment/locale/jv.js",
	"./jv.js": "../../../../moment/locale/jv.js",
	"./ka": "../../../../moment/locale/ka.js",
	"./ka.js": "../../../../moment/locale/ka.js",
	"./kk": "../../../../moment/locale/kk.js",
	"./kk.js": "../../../../moment/locale/kk.js",
	"./km": "../../../../moment/locale/km.js",
	"./km.js": "../../../../moment/locale/km.js",
	"./kn": "../../../../moment/locale/kn.js",
	"./kn.js": "../../../../moment/locale/kn.js",
	"./ko": "../../../../moment/locale/ko.js",
	"./ko.js": "../../../../moment/locale/ko.js",
	"./ky": "../../../../moment/locale/ky.js",
	"./ky.js": "../../../../moment/locale/ky.js",
	"./lb": "../../../../moment/locale/lb.js",
	"./lb.js": "../../../../moment/locale/lb.js",
	"./lo": "../../../../moment/locale/lo.js",
	"./lo.js": "../../../../moment/locale/lo.js",
	"./lt": "../../../../moment/locale/lt.js",
	"./lt.js": "../../../../moment/locale/lt.js",
	"./lv": "../../../../moment/locale/lv.js",
	"./lv.js": "../../../../moment/locale/lv.js",
	"./me": "../../../../moment/locale/me.js",
	"./me.js": "../../../../moment/locale/me.js",
	"./mi": "../../../../moment/locale/mi.js",
	"./mi.js": "../../../../moment/locale/mi.js",
	"./mk": "../../../../moment/locale/mk.js",
	"./mk.js": "../../../../moment/locale/mk.js",
	"./ml": "../../../../moment/locale/ml.js",
	"./ml.js": "../../../../moment/locale/ml.js",
	"./mr": "../../../../moment/locale/mr.js",
	"./mr.js": "../../../../moment/locale/mr.js",
	"./ms": "../../../../moment/locale/ms.js",
	"./ms-my": "../../../../moment/locale/ms-my.js",
	"./ms-my.js": "../../../../moment/locale/ms-my.js",
	"./ms.js": "../../../../moment/locale/ms.js",
	"./mt": "../../../../moment/locale/mt.js",
	"./mt.js": "../../../../moment/locale/mt.js",
	"./my": "../../../../moment/locale/my.js",
	"./my.js": "../../../../moment/locale/my.js",
	"./nb": "../../../../moment/locale/nb.js",
	"./nb.js": "../../../../moment/locale/nb.js",
	"./ne": "../../../../moment/locale/ne.js",
	"./ne.js": "../../../../moment/locale/ne.js",
	"./nl": "../../../../moment/locale/nl.js",
	"./nl-be": "../../../../moment/locale/nl-be.js",
	"./nl-be.js": "../../../../moment/locale/nl-be.js",
	"./nl.js": "../../../../moment/locale/nl.js",
	"./nn": "../../../../moment/locale/nn.js",
	"./nn.js": "../../../../moment/locale/nn.js",
	"./pa-in": "../../../../moment/locale/pa-in.js",
	"./pa-in.js": "../../../../moment/locale/pa-in.js",
	"./pl": "../../../../moment/locale/pl.js",
	"./pl.js": "../../../../moment/locale/pl.js",
	"./pt": "../../../../moment/locale/pt.js",
	"./pt-br": "../../../../moment/locale/pt-br.js",
	"./pt-br.js": "../../../../moment/locale/pt-br.js",
	"./pt.js": "../../../../moment/locale/pt.js",
	"./ro": "../../../../moment/locale/ro.js",
	"./ro.js": "../../../../moment/locale/ro.js",
	"./ru": "../../../../moment/locale/ru.js",
	"./ru.js": "../../../../moment/locale/ru.js",
	"./sd": "../../../../moment/locale/sd.js",
	"./sd.js": "../../../../moment/locale/sd.js",
	"./se": "../../../../moment/locale/se.js",
	"./se.js": "../../../../moment/locale/se.js",
	"./si": "../../../../moment/locale/si.js",
	"./si.js": "../../../../moment/locale/si.js",
	"./sk": "../../../../moment/locale/sk.js",
	"./sk.js": "../../../../moment/locale/sk.js",
	"./sl": "../../../../moment/locale/sl.js",
	"./sl.js": "../../../../moment/locale/sl.js",
	"./sq": "../../../../moment/locale/sq.js",
	"./sq.js": "../../../../moment/locale/sq.js",
	"./sr": "../../../../moment/locale/sr.js",
	"./sr-cyrl": "../../../../moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "../../../../moment/locale/sr-cyrl.js",
	"./sr.js": "../../../../moment/locale/sr.js",
	"./ss": "../../../../moment/locale/ss.js",
	"./ss.js": "../../../../moment/locale/ss.js",
	"./sv": "../../../../moment/locale/sv.js",
	"./sv.js": "../../../../moment/locale/sv.js",
	"./sw": "../../../../moment/locale/sw.js",
	"./sw.js": "../../../../moment/locale/sw.js",
	"./ta": "../../../../moment/locale/ta.js",
	"./ta.js": "../../../../moment/locale/ta.js",
	"./te": "../../../../moment/locale/te.js",
	"./te.js": "../../../../moment/locale/te.js",
	"./tet": "../../../../moment/locale/tet.js",
	"./tet.js": "../../../../moment/locale/tet.js",
	"./th": "../../../../moment/locale/th.js",
	"./th.js": "../../../../moment/locale/th.js",
	"./tl-ph": "../../../../moment/locale/tl-ph.js",
	"./tl-ph.js": "../../../../moment/locale/tl-ph.js",
	"./tlh": "../../../../moment/locale/tlh.js",
	"./tlh.js": "../../../../moment/locale/tlh.js",
	"./tr": "../../../../moment/locale/tr.js",
	"./tr.js": "../../../../moment/locale/tr.js",
	"./tzl": "../../../../moment/locale/tzl.js",
	"./tzl.js": "../../../../moment/locale/tzl.js",
	"./tzm": "../../../../moment/locale/tzm.js",
	"./tzm-latn": "../../../../moment/locale/tzm-latn.js",
	"./tzm-latn.js": "../../../../moment/locale/tzm-latn.js",
	"./tzm.js": "../../../../moment/locale/tzm.js",
	"./uk": "../../../../moment/locale/uk.js",
	"./uk.js": "../../../../moment/locale/uk.js",
	"./ur": "../../../../moment/locale/ur.js",
	"./ur.js": "../../../../moment/locale/ur.js",
	"./uz": "../../../../moment/locale/uz.js",
	"./uz-latn": "../../../../moment/locale/uz-latn.js",
	"./uz-latn.js": "../../../../moment/locale/uz-latn.js",
	"./uz.js": "../../../../moment/locale/uz.js",
	"./vi": "../../../../moment/locale/vi.js",
	"./vi.js": "../../../../moment/locale/vi.js",
	"./x-pseudo": "../../../../moment/locale/x-pseudo.js",
	"./x-pseudo.js": "../../../../moment/locale/x-pseudo.js",
	"./yo": "../../../../moment/locale/yo.js",
	"./yo.js": "../../../../moment/locale/yo.js",
	"./zh-cn": "../../../../moment/locale/zh-cn.js",
	"./zh-cn.js": "../../../../moment/locale/zh-cn.js",
	"./zh-hk": "../../../../moment/locale/zh-hk.js",
	"./zh-hk.js": "../../../../moment/locale/zh-hk.js",
	"./zh-tw": "../../../../moment/locale/zh-tw.js",
	"./zh-tw.js": "../../../../moment/locale/zh-tw.js"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../../../../moment/locale recursive ^\\.\\/.*$";

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map