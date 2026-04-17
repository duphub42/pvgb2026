"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@smithy+util-config-provider@4.2.2";
exports.ids = ["vendor-chunks/@smithy+util-config-provider@4.2.2"];
exports.modules = {

/***/ "(rsc)/./node_modules/.pnpm/@smithy+util-config-provider@4.2.2/node_modules/@smithy/util-config-provider/dist-es/booleanSelector.js":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@smithy+util-config-provider@4.2.2/node_modules/@smithy/util-config-provider/dist-es/booleanSelector.js ***!
  \************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   booleanSelector: () => (/* binding */ booleanSelector)\n/* harmony export */ });\nconst booleanSelector = (obj, key, type) => {\n    if (!(key in obj))\n        return undefined;\n    if (obj[key] === \"true\")\n        return true;\n    if (obj[key] === \"false\")\n        return false;\n    throw new Error(`Cannot load ${type} \"${key}\". Expected \"true\" or \"false\", got ${obj[key]}.`);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vQHNtaXRoeSt1dGlsLWNvbmZpZy1wcm92aWRlckA0LjIuMi9ub2RlX21vZHVsZXMvQHNtaXRoeS91dGlsLWNvbmZpZy1wcm92aWRlci9kaXN0LWVzL2Jvb2xlYW5TZWxlY3Rvci5qcyIsIm1hcHBpbmdzIjoiOzs7O0FBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsTUFBTSxHQUFHLElBQUkscUNBQXFDLFNBQVM7QUFDOUYiLCJzb3VyY2VzIjpbIi9Vc2Vycy9ob3J1cy9EZXNrdG9wL3B2Z2IyMDI2L3B2Z2IyMDI2L25vZGVfbW9kdWxlcy8ucG5wbS9Ac21pdGh5K3V0aWwtY29uZmlnLXByb3ZpZGVyQDQuMi4yL25vZGVfbW9kdWxlcy9Ac21pdGh5L3V0aWwtY29uZmlnLXByb3ZpZGVyL2Rpc3QtZXMvYm9vbGVhblNlbGVjdG9yLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBib29sZWFuU2VsZWN0b3IgPSAob2JqLCBrZXksIHR5cGUpID0+IHtcbiAgICBpZiAoIShrZXkgaW4gb2JqKSlcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBpZiAob2JqW2tleV0gPT09IFwidHJ1ZVwiKVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICBpZiAob2JqW2tleV0gPT09IFwiZmFsc2VcIilcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGxvYWQgJHt0eXBlfSBcIiR7a2V5fVwiLiBFeHBlY3RlZCBcInRydWVcIiBvciBcImZhbHNlXCIsIGdvdCAke29ialtrZXldfS5gKTtcbn07XG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/@smithy+util-config-provider@4.2.2/node_modules/@smithy/util-config-provider/dist-es/booleanSelector.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/@smithy+util-config-provider@4.2.2/node_modules/@smithy/util-config-provider/dist-es/index.js":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@smithy+util-config-provider@4.2.2/node_modules/@smithy/util-config-provider/dist-es/index.js ***!
  \**************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SelectorType: () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_2__.SelectorType),\n/* harmony export */   booleanSelector: () => (/* reexport safe */ _booleanSelector__WEBPACK_IMPORTED_MODULE_0__.booleanSelector),\n/* harmony export */   numberSelector: () => (/* reexport safe */ _numberSelector__WEBPACK_IMPORTED_MODULE_1__.numberSelector)\n/* harmony export */ });\n/* harmony import */ var _booleanSelector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./booleanSelector */ \"(rsc)/./node_modules/.pnpm/@smithy+util-config-provider@4.2.2/node_modules/@smithy/util-config-provider/dist-es/booleanSelector.js\");\n/* harmony import */ var _numberSelector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./numberSelector */ \"(rsc)/./node_modules/.pnpm/@smithy+util-config-provider@4.2.2/node_modules/@smithy/util-config-provider/dist-es/numberSelector.js\");\n/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types */ \"(rsc)/./node_modules/.pnpm/@smithy+util-config-provider@4.2.2/node_modules/@smithy/util-config-provider/dist-es/types.js\");\n\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vQHNtaXRoeSt1dGlsLWNvbmZpZy1wcm92aWRlckA0LjIuMi9ub2RlX21vZHVsZXMvQHNtaXRoeS91dGlsLWNvbmZpZy1wcm92aWRlci9kaXN0LWVzL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFrQztBQUNEO0FBQ1QiLCJzb3VyY2VzIjpbIi9Vc2Vycy9ob3J1cy9EZXNrdG9wL3B2Z2IyMDI2L3B2Z2IyMDI2L25vZGVfbW9kdWxlcy8ucG5wbS9Ac21pdGh5K3V0aWwtY29uZmlnLXByb3ZpZGVyQDQuMi4yL25vZGVfbW9kdWxlcy9Ac21pdGh5L3V0aWwtY29uZmlnLXByb3ZpZGVyL2Rpc3QtZXMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0ICogZnJvbSBcIi4vYm9vbGVhblNlbGVjdG9yXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9udW1iZXJTZWxlY3RvclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vdHlwZXNcIjtcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/@smithy+util-config-provider@4.2.2/node_modules/@smithy/util-config-provider/dist-es/index.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/@smithy+util-config-provider@4.2.2/node_modules/@smithy/util-config-provider/dist-es/numberSelector.js":
/*!***********************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@smithy+util-config-provider@4.2.2/node_modules/@smithy/util-config-provider/dist-es/numberSelector.js ***!
  \***********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   numberSelector: () => (/* binding */ numberSelector)\n/* harmony export */ });\nconst numberSelector = (obj, key, type) => {\n    if (!(key in obj))\n        return undefined;\n    const numberValue = parseInt(obj[key], 10);\n    if (Number.isNaN(numberValue)) {\n        throw new TypeError(`Cannot load ${type} '${key}'. Expected number, got '${obj[key]}'.`);\n    }\n    return numberValue;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vQHNtaXRoeSt1dGlsLWNvbmZpZy1wcm92aWRlckA0LjIuMi9ub2RlX21vZHVsZXMvQHNtaXRoeS91dGlsLWNvbmZpZy1wcm92aWRlci9kaXN0LWVzL251bWJlclNlbGVjdG9yLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLE1BQU0sR0FBRyxJQUFJLDJCQUEyQixTQUFTO0FBQzVGO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsiL1VzZXJzL2hvcnVzL0Rlc2t0b3AvcHZnYjIwMjYvcHZnYjIwMjYvbm9kZV9tb2R1bGVzLy5wbnBtL0BzbWl0aHkrdXRpbC1jb25maWctcHJvdmlkZXJANC4yLjIvbm9kZV9tb2R1bGVzL0BzbWl0aHkvdXRpbC1jb25maWctcHJvdmlkZXIvZGlzdC1lcy9udW1iZXJTZWxlY3Rvci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgbnVtYmVyU2VsZWN0b3IgPSAob2JqLCBrZXksIHR5cGUpID0+IHtcbiAgICBpZiAoIShrZXkgaW4gb2JqKSlcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBjb25zdCBudW1iZXJWYWx1ZSA9IHBhcnNlSW50KG9ialtrZXldLCAxMCk7XG4gICAgaWYgKE51bWJlci5pc05hTihudW1iZXJWYWx1ZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgQ2Fubm90IGxvYWQgJHt0eXBlfSAnJHtrZXl9Jy4gRXhwZWN0ZWQgbnVtYmVyLCBnb3QgJyR7b2JqW2tleV19Jy5gKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bWJlclZhbHVlO1xufTtcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/@smithy+util-config-provider@4.2.2/node_modules/@smithy/util-config-provider/dist-es/numberSelector.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/.pnpm/@smithy+util-config-provider@4.2.2/node_modules/@smithy/util-config-provider/dist-es/types.js":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@smithy+util-config-provider@4.2.2/node_modules/@smithy/util-config-provider/dist-es/types.js ***!
  \**************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   SelectorType: () => (/* binding */ SelectorType)\n/* harmony export */ });\nvar SelectorType;\n(function (SelectorType) {\n    SelectorType[\"ENV\"] = \"env\";\n    SelectorType[\"CONFIG\"] = \"shared config entry\";\n})(SelectorType || (SelectorType = {}));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vQHNtaXRoeSt1dGlsLWNvbmZpZy1wcm92aWRlckA0LjIuMi9ub2RlX21vZHVsZXMvQHNtaXRoeS91dGlsLWNvbmZpZy1wcm92aWRlci9kaXN0LWVzL3R5cGVzLmpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLENBQUMsb0NBQW9DIiwic291cmNlcyI6WyIvVXNlcnMvaG9ydXMvRGVza3RvcC9wdmdiMjAyNi9wdmdiMjAyNi9ub2RlX21vZHVsZXMvLnBucG0vQHNtaXRoeSt1dGlsLWNvbmZpZy1wcm92aWRlckA0LjIuMi9ub2RlX21vZHVsZXMvQHNtaXRoeS91dGlsLWNvbmZpZy1wcm92aWRlci9kaXN0LWVzL3R5cGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB2YXIgU2VsZWN0b3JUeXBlO1xuKGZ1bmN0aW9uIChTZWxlY3RvclR5cGUpIHtcbiAgICBTZWxlY3RvclR5cGVbXCJFTlZcIl0gPSBcImVudlwiO1xuICAgIFNlbGVjdG9yVHlwZVtcIkNPTkZJR1wiXSA9IFwic2hhcmVkIGNvbmZpZyBlbnRyeVwiO1xufSkoU2VsZWN0b3JUeXBlIHx8IChTZWxlY3RvclR5cGUgPSB7fSkpO1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/@smithy+util-config-provider@4.2.2/node_modules/@smithy/util-config-provider/dist-es/types.js\n");

/***/ })

};
;