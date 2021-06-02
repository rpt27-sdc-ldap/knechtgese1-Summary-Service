(self["webpackChunksummary_service"] = self["webpackChunksummary_service"] || []).push([["client_src_components_BookSummary_jsx-client_src_components_Summary_jsx"],{

/***/ "./client/src/components/BookSummary.jsx":
/*!***********************************************!*\
  !*** ./client/src/components/BookSummary.jsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _Summary_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Summary.jsx */ "./client/src/components/Summary.jsx");




function changeClass() {
  var content = document.getElementById("extra_content");
  var btn = document.getElementById("read_more");
  content.classList.toggle('show');

  if (content.classList.contains("show")) {
    btn.innerHTML = "Show less" + '▴';
    document.getElementById("main").classList.remove("normal");
  } else {
    btn.innerHTML = "Show more" + '▾';
    document.getElementById("main").classList.add("normal");
  }
}

var BookSummary = function BookSummary(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "summary"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", {
    className: "summary-heading"
  }, "Publisher's Summary"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "publisher-summary"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    id: "main",
    className: "summary-detail normal"
  }, props.summary.summary.split('\n').map(function (str, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
      key: index
    }, str);
  }).slice(0, 1)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    id: "extra_content",
    className: "extra_content"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "summary-detail hidden"
  }, props.summary.summary.split('\n').map(function (str, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", {
      key: index
    }, str);
  }).slice(1)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("span", {
    className: "copyright"
  }, props.summary.copyright)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("button", {
    id: "read_more",
    className: "read_more",
    onClick: changeClass
  }, " Show More ")));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BookSummary);

/***/ }),

/***/ "./client/src/components/Summary.jsx":
/*!*******************************************!*\
  !*** ./client/src/components/Summary.jsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _BookSummary_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BookSummary.jsx */ "./client/src/components/BookSummary.jsx");



var Summary = function Summary(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", {
    className: "book-summary"
  }, props.summaries.map(function (summary, index) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_BookSummary_jsx__WEBPACK_IMPORTED_MODULE_1__.default, {
      summary: summary,
      key: index
    });
  }));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Summary);

/***/ })

}]);
//# sourceMappingURL=client_src_components_BookSummary_jsx-client_src_components_Summary_jsx.summary.js.map