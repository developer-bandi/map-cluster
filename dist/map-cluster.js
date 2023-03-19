/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./lib/dbscanFilter.js":
/*!*****************************!*\
  !*** ./lib/dbscanFilter.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.neighborCheck = exports.makeEpsilon = exports.makeAvgInClusters = exports.gatherCluster = exports[\"default\"] = exports.dbscanClustring = exports.calDist = void 0;\nvar makeEpsilon = function makeEpsilon(mapRange, gridSize) {\n  return (mapRange.northEast.latitude - mapRange.southWest.latitude) / gridSize.width / 4 + (mapRange.northEast.longitude - mapRange.southWest.longitude) / gridSize.height / 4;\n};\nexports.makeEpsilon = makeEpsilon;\nvar calDist = function calDist(x1, x2, y1, y2) {\n  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));\n};\nexports.calDist = calDist;\nvar neighborCheck = function neighborCheck(queue, status, contents, epsilon) {\n  if (queue.length === 0) return 0;\n  var index = queue.shift();\n  for (var j = 0; j < contents.length; j++) {\n    if (status[j] !== -1) continue;\n    var dist = calDist(contents[index].avg.latitude, contents[j].avg.latitude, contents[index].avg.longitude, contents[j].avg.longitude);\n    if (dist <= epsilon) {\n      queue.push(j);\n      status[j] = status[index];\n    }\n  }\n  neighborCheck(queue, status, contents, epsilon);\n};\nexports.neighborCheck = neighborCheck;\nvar dbscanClustring = function dbscanClustring(epsilon, contents) {\n  var queue = [];\n  var clusterLevel = 0;\n  var status = new Array(contents.length).fill(-1);\n  for (var i = 0; i < contents.length; i++) {\n    neighborCheck(queue, status, contents);\n    if (status[i] === -1) {\n      status[i] = clusterLevel;\n      for (var j = 0; j < contents.length; j++) {\n        if (status[j] !== -1) continue;\n        var dist = calDist(contents[i].avg.latitude, contents[j].avg.latitude, contents[i].avg.longitude, contents[j].avg.longitude);\n        if (dist <= epsilon) {\n          queue.push(j);\n          status[j] = clusterLevel;\n        }\n      }\n      clusterLevel += 1;\n    }\n  }\n  return status;\n};\nexports.dbscanClustring = dbscanClustring;\nvar gatherCluster = function gatherCluster(status, contents) {\n  var clusters = [];\n  status.forEach(function (state, index) {\n    if (clusters[state] == undefined) {\n      clusters[state] = [contents[index]];\n    } else {\n      clusters[state].push(contents[index]);\n    }\n  });\n  return clusters;\n};\nexports.gatherCluster = gatherCluster;\nvar makeAvgInClusters = function makeAvgInClusters(clusteredContents) {\n  return clusteredContents.map(function (resultList) {\n    var avg = resultList.reduce(function (prev, cur) {\n      return {\n        latitude: prev.latitude + cur.avg.latitude * cur.list.length,\n        longitude: prev.longitude + cur.avg.longitude * cur.list.length\n      };\n    }, {\n      latitude: 0,\n      longitude: 0\n    });\n    var list = resultList.reduce(function (prev, cur) {\n      prev.push(cur.list);\n      return prev;\n    }, []).flat();\n    avg.latitude /= list.length;\n    avg.longitude /= list.length;\n    return {\n      list: list,\n      avg: avg\n    };\n  });\n};\nexports.makeAvgInClusters = makeAvgInClusters;\nvar dbscanFilter = function dbscanFilter(mapRange, gridSize, contents) {\n  var epsilon = (mapRange.northEast.latitude - mapRange.southWest.latitude) / gridSize.width / 4 + (mapRange.northEast.longitude - mapRange.southWest.longitude) / gridSize.height / 4;\n  var status = dbscanClustring(epsilon, contents);\n  var clusteredContents = gatherCluster(status, contents);\n  return makeAvgInClusters(clusteredContents);\n};\nvar _default = dbscanFilter;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://mapCluster/./lib/dbscanFilter.js?");

/***/ }),

/***/ "./lib/gridBaseFilter.js":
/*!*******************************!*\
  !*** ./lib/gridBaseFilter.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.makeGridAvgPosition = exports[\"default\"] = exports.classifiContentsToGrid = exports.caculateGap = void 0;\nvar caculateGap = function caculateGap(mapRange, gridSize) {\n  var northEast = mapRange.northEast,\n    southWest = mapRange.southWest;\n  var widthGap = (northEast.longitude - southWest.longitude) / gridSize.width;\n  var heightGap = (northEast.latitude - southWest.latitude) / gridSize.height;\n  return {\n    widthGap: widthGap,\n    heightGap: heightGap\n  };\n};\nexports.caculateGap = caculateGap;\nvar classifiContentsToGrid = function classifiContentsToGrid(mapRange, gridSize, widthGap, heightGap, contents) {\n  var grid = new Array(gridSize.height).fill(0).map(function () {\n    return new Array(gridSize.width).fill(0).map(function () {\n      return [];\n    });\n  });\n  contents.forEach(function (content) {\n    var x = Math.min(gridSize.width - 1, Math.floor((content.longitude - mapRange.southWest.longitude) / widthGap));\n    var y = Math.min(gridSize.height - 1, Math.floor((content.latitude - mapRange.southWest.latitude) / heightGap));\n    grid[y][x].push(content);\n  });\n  return grid;\n};\nexports.classifiContentsToGrid = classifiContentsToGrid;\nvar makeGridAvgPosition = function makeGridAvgPosition(markerGrid, sortCondtionFn) {\n  return markerGrid.map(function (row) {\n    return row.filter(function (markers) {\n      return markers.length !== 0;\n    }).map(function (markers) {\n      var avg = markers.reduce(function (prev, cur) {\n        return {\n          latitude: prev.latitude + cur.latitude / markers.length,\n          longitude: prev.longitude + cur.longitude / markers.length\n        };\n      }, {\n        latitude: 0,\n        longitude: 0\n      });\n      markers.sort(sortCondtionFn);\n      return {\n        avg: avg,\n        list: markers\n      };\n    });\n  }).flat();\n};\nexports.makeGridAvgPosition = makeGridAvgPosition;\nvar GridBaseFilter = function GridBaseFilter(mapRange, gridSize, contents, sortCondtionFn) {\n  var _caculateGap = caculateGap(mapRange, gridSize),\n    widthGap = _caculateGap.widthGap,\n    heightGap = _caculateGap.heightGap;\n  var markerGrid = classifiContentsToGrid(mapRange, gridSize, widthGap, heightGap, contents);\n  return makeGridAvgPosition(markerGrid, sortCondtionFn);\n};\nvar _default = GridBaseFilter;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://mapCluster/./lib/gridBaseFilter.js?");

/***/ }),

/***/ "./lib/inMapFilter.js":
/*!****************************!*\
  !*** ./lib/inMapFilter.js ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports[\"default\"] = void 0;\nvar inMapFilter = function inMapFilter(mapRange, contents) {\n  return contents.filter(function (_ref) {\n    var latitude = _ref.latitude,\n      longitude = _ref.longitude;\n    if (latitude >= mapRange.southWest.latitude && latitude <= mapRange.northEast.latitude && longitude >= mapRange.southWest.longitude && longitude <= mapRange.northEast.longitude) {\n      return true;\n    }\n    return false;\n  });\n};\nvar _default = inMapFilter;\nexports[\"default\"] = _default;\n\n//# sourceURL=webpack://mapCluster/./lib/inMapFilter.js?");

/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\n\nObject.defineProperty(exports, \"__esModule\", ({\n  value: true\n}));\nexports.clustering = void 0;\nvar _dbscanFilter = _interopRequireDefault(__webpack_require__(/*! ./dbscanFilter */ \"./lib/dbscanFilter.js\"));\nvar _gridBaseFilter = _interopRequireDefault(__webpack_require__(/*! ./gridBaseFilter */ \"./lib/gridBaseFilter.js\"));\nvar _inMapFilter = _interopRequireDefault(__webpack_require__(/*! ./inMapFilter */ \"./lib/inMapFilter.js\"));\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { \"default\": obj }; }\nvar clustering = function clustering(mapRange, gridSize, contents, sortCondtionFn) {\n  var innterMapData = (0, _inMapFilter[\"default\"])(mapRange, contents);\n  var gridBaseFilteredData = (0, _gridBaseFilter[\"default\"])(mapRange, gridSize, innterMapData, sortCondtionFn);\n  var dbascanResult = (0, _dbscanFilter[\"default\"])(mapRange, gridSize, gridBaseFilteredData);\n  return dbascanResult;\n};\nexports.clustering = clustering;\n\n//# sourceURL=webpack://mapCluster/./lib/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./lib/index.js");
/******/ 	exports.mapCluster = __webpack_exports__;
/******/ 	
/******/ })()
;