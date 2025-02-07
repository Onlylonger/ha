"use strict";
(self["webpackChunktest_webpack"] = self["webpackChunktest_webpack"] || []).push([["main"],{

/***/ "./src/app/App.tsx":
/*!*************************!*\
  !*** ./src/app/App.tsx ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   App: () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../button */ "./src/button/index.ts");
/* harmony import */ var _dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dialog */ "./src/dialog/index.ts");



function App() {
    return ((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", { children: ["app", (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_button__WEBPACK_IMPORTED_MODULE_1__.Button, {}), (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_dialog__WEBPACK_IMPORTED_MODULE_2__.Dialog, {})] }));
}


/***/ }),

/***/ "./src/app/index.ts":
/*!**************************!*\
  !*** ./src/app/index.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   App: () => (/* reexport safe */ _App__WEBPACK_IMPORTED_MODULE_0__.App)
/* harmony export */ });
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App */ "./src/app/App.tsx");



/***/ }),

/***/ "./src/button/button.tsx":
/*!*******************************!*\
  !*** ./src/button/button.tsx ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Button: () => (/* binding */ Button)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");

function Button() {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", { children: "nihao" });
}


/***/ }),

/***/ "./src/button/index.ts":
/*!*****************************!*\
  !*** ./src/button/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Button: () => (/* reexport safe */ _button__WEBPACK_IMPORTED_MODULE_0__.Button)
/* harmony export */ });
/* harmony import */ var _button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./button */ "./src/button/button.tsx");



/***/ }),

/***/ "./src/dialog/dialog.tsx":
/*!*******************************!*\
  !*** ./src/dialog/dialog.tsx ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Dialog: () => (/* binding */ Dialog)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");

function Dialog() {
    return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h1", { children: "dialog" });
}


/***/ }),

/***/ "./src/dialog/index.ts":
/*!*****************************!*\
  !*** ./src/dialog/index.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Dialog: () => (/* reexport safe */ _dialog__WEBPACK_IMPORTED_MODULE_0__.Dialog)
/* harmony export */ });
/* harmony import */ var _dialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dialog */ "./src/dialog/dialog.tsx");



/***/ }),

/***/ "./src/main.tsx":
/*!**********************!*\
  !*** ./src/main.tsx ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app */ "./src/app/index.ts");



var appEl = document.getElementById("app");
if (appEl) {
    var app = (0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(appEl);
    app.render((0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_app__WEBPACK_IMPORTED_MODULE_2__.App, {}));
}


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors"], () => (__webpack_exec__("./src/main.tsx")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);