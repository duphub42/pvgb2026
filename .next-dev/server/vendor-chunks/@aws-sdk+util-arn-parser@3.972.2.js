"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/@aws-sdk+util-arn-parser@3.972.2";
exports.ids = ["vendor-chunks/@aws-sdk+util-arn-parser@3.972.2"];
exports.modules = {

/***/ "(rsc)/./node_modules/.pnpm/@aws-sdk+util-arn-parser@3.972.2/node_modules/@aws-sdk/util-arn-parser/dist-es/index.js":
/*!********************************************************************************************************************!*\
  !*** ./node_modules/.pnpm/@aws-sdk+util-arn-parser@3.972.2/node_modules/@aws-sdk/util-arn-parser/dist-es/index.js ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   build: () => (/* binding */ build),\n/* harmony export */   parse: () => (/* binding */ parse),\n/* harmony export */   validate: () => (/* binding */ validate)\n/* harmony export */ });\nconst validate = (str) => typeof str === \"string\" && str.indexOf(\"arn:\") === 0 && str.split(\":\").length >= 6;\nconst parse = (arn) => {\n    const segments = arn.split(\":\");\n    if (segments.length < 6 || segments[0] !== \"arn\")\n        throw new Error(\"Malformed ARN\");\n    const [, partition, service, region, accountId, ...resource] = segments;\n    return {\n        partition,\n        service,\n        region,\n        accountId,\n        resource: resource.join(\":\"),\n    };\n};\nconst build = (arnObject) => {\n    const { partition = \"aws\", service, region, accountId, resource } = arnObject;\n    if ([service, region, accountId, resource].some((segment) => typeof segment !== \"string\")) {\n        throw new Error(\"Input ARN object is invalid\");\n    }\n    return `arn:${partition}:${service}:${region}:${accountId}:${resource}`;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvLnBucG0vQGF3cy1zZGsrdXRpbC1hcm4tcGFyc2VyQDMuOTcyLjIvbm9kZV9tb2R1bGVzL0Bhd3Mtc2RrL3V0aWwtYXJuLXBhcnNlci9kaXN0LWVzL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUFPO0FBQ0E7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQLFlBQVksMERBQTBEO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixVQUFVLEdBQUcsUUFBUSxHQUFHLE9BQU8sR0FBRyxVQUFVLEdBQUcsU0FBUztBQUMxRSIsInNvdXJjZXMiOlsiL1VzZXJzL2hvcnVzL0Rlc2t0b3AvcHZnYjIwMjYvcHZnYjIwMjYvbm9kZV9tb2R1bGVzLy5wbnBtL0Bhd3Mtc2RrK3V0aWwtYXJuLXBhcnNlckAzLjk3Mi4yL25vZGVfbW9kdWxlcy9AYXdzLXNkay91dGlsLWFybi1wYXJzZXIvZGlzdC1lcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgdmFsaWRhdGUgPSAoc3RyKSA9PiB0eXBlb2Ygc3RyID09PSBcInN0cmluZ1wiICYmIHN0ci5pbmRleE9mKFwiYXJuOlwiKSA9PT0gMCAmJiBzdHIuc3BsaXQoXCI6XCIpLmxlbmd0aCA+PSA2O1xuZXhwb3J0IGNvbnN0IHBhcnNlID0gKGFybikgPT4ge1xuICAgIGNvbnN0IHNlZ21lbnRzID0gYXJuLnNwbGl0KFwiOlwiKTtcbiAgICBpZiAoc2VnbWVudHMubGVuZ3RoIDwgNiB8fCBzZWdtZW50c1swXSAhPT0gXCJhcm5cIilcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTWFsZm9ybWVkIEFSTlwiKTtcbiAgICBjb25zdCBbLCBwYXJ0aXRpb24sIHNlcnZpY2UsIHJlZ2lvbiwgYWNjb3VudElkLCAuLi5yZXNvdXJjZV0gPSBzZWdtZW50cztcbiAgICByZXR1cm4ge1xuICAgICAgICBwYXJ0aXRpb24sXG4gICAgICAgIHNlcnZpY2UsXG4gICAgICAgIHJlZ2lvbixcbiAgICAgICAgYWNjb3VudElkLFxuICAgICAgICByZXNvdXJjZTogcmVzb3VyY2Uuam9pbihcIjpcIiksXG4gICAgfTtcbn07XG5leHBvcnQgY29uc3QgYnVpbGQgPSAoYXJuT2JqZWN0KSA9PiB7XG4gICAgY29uc3QgeyBwYXJ0aXRpb24gPSBcImF3c1wiLCBzZXJ2aWNlLCByZWdpb24sIGFjY291bnRJZCwgcmVzb3VyY2UgfSA9IGFybk9iamVjdDtcbiAgICBpZiAoW3NlcnZpY2UsIHJlZ2lvbiwgYWNjb3VudElkLCByZXNvdXJjZV0uc29tZSgoc2VnbWVudCkgPT4gdHlwZW9mIHNlZ21lbnQgIT09IFwic3RyaW5nXCIpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIklucHV0IEFSTiBvYmplY3QgaXMgaW52YWxpZFwiKTtcbiAgICB9XG4gICAgcmV0dXJuIGBhcm46JHtwYXJ0aXRpb259OiR7c2VydmljZX06JHtyZWdpb259OiR7YWNjb3VudElkfToke3Jlc291cmNlfWA7XG59O1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/.pnpm/@aws-sdk+util-arn-parser@3.972.2/node_modules/@aws-sdk/util-arn-parser/dist-es/index.js\n");

/***/ })

};
;