// runtime can't be in strict mode because a global variable is assign and maybe created.
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([["instrumentation"],{

/***/ "(instrument)/./src/instrumentation.ts":
/*!********************************!*\
  !*** ./src/instrumentation.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   register: () => (/* binding */ register)\n/* harmony export */ });\n/**\n * Next.js instrumentation hook – läuft einmal beim Start des Servers (Node.js).\n * Bei SQLite: Index-Konflikte (z. B. footer_footer_logo_idx) ggf. mit\n *   pnpm run fix:sqlite-schema\n * beheben. Kein child_process/fs hier, damit das Modul bundler-kompatibel bleibt.\n */ async function register() {\n    if (true) return;\n    if (process.env.DATABASE_URL || process.env.POSTGRES_URL) return;\n// SQLite: Index-Drop o. ä. nur über separate Skripte (fix:sqlite-schema),\n// um \"Module not found: child_process\" in Next/Turbopack zu vermeiden.\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGluc3RydW1lbnQpLy4vc3JjL2luc3RydW1lbnRhdGlvbi50cyIsIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7O0NBS0MsR0FDTSxlQUFlQTtJQUNwQixJQUFJQyxJQUFxQyxFQUFFO0lBQzNDLElBQUlBLFFBQVFDLEdBQUcsQ0FBQ0UsWUFBWSxJQUFJSCxRQUFRQyxHQUFHLENBQUNHLFlBQVksRUFBRTtBQUMxRCwwRUFBMEU7QUFDMUUsdUVBQXVFO0FBQ3pFIiwic291cmNlcyI6WyIvVXNlcnMvaG9ydXMvRGVza3RvcC9wdmdiMjAyNi9wdmdiMjAyNi9zcmMvaW5zdHJ1bWVudGF0aW9uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogTmV4dC5qcyBpbnN0cnVtZW50YXRpb24gaG9vayDigJMgbMOkdWZ0IGVpbm1hbCBiZWltIFN0YXJ0IGRlcyBTZXJ2ZXJzIChOb2RlLmpzKS5cbiAqIEJlaSBTUUxpdGU6IEluZGV4LUtvbmZsaWt0ZSAoei4gQi4gZm9vdGVyX2Zvb3Rlcl9sb2dvX2lkeCkgZ2dmLiBtaXRcbiAqICAgcG5wbSBydW4gZml4OnNxbGl0ZS1zY2hlbWFcbiAqIGJlaGViZW4uIEtlaW4gY2hpbGRfcHJvY2Vzcy9mcyBoaWVyLCBkYW1pdCBkYXMgTW9kdWwgYnVuZGxlci1rb21wYXRpYmVsIGJsZWlidC5cbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlZ2lzdGVyKCkge1xuICBpZiAocHJvY2Vzcy5lbnYuTkVYVF9SVU5USU1FICE9PSAnbm9kZWpzJykgcmV0dXJuXG4gIGlmIChwcm9jZXNzLmVudi5EQVRBQkFTRV9VUkwgfHwgcHJvY2Vzcy5lbnYuUE9TVEdSRVNfVVJMKSByZXR1cm5cbiAgLy8gU1FMaXRlOiBJbmRleC1Ecm9wIG8uIMOkLiBudXIgw7xiZXIgc2VwYXJhdGUgU2tyaXB0ZSAoZml4OnNxbGl0ZS1zY2hlbWEpLFxuICAvLyB1bSBcIk1vZHVsZSBub3QgZm91bmQ6IGNoaWxkX3Byb2Nlc3NcIiBpbiBOZXh0L1R1cmJvcGFjayB6dSB2ZXJtZWlkZW4uXG59XG4iXSwibmFtZXMiOlsicmVnaXN0ZXIiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9SVU5USU1FIiwiREFUQUJBU0VfVVJMIiwiUE9TVEdSRVNfVVJMIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(instrument)/./src/instrumentation.ts\n");

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("(instrument)/./src/instrumentation.ts"));
/******/ (_ENTRIES = typeof _ENTRIES === "undefined" ? {} : _ENTRIES).middleware_instrumentation = __webpack_exports__;
/******/ }
]);