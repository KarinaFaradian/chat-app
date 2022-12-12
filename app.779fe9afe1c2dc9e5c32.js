/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/** *** */ (() => {
  // webpackBootstrap
  /** *** */ 



  /** *** */ const __webpack_modules__ = {
    /***/ "./src/app/app.ts":
      /*! ************************!*\
  !*** ./src/app/app.ts ***!
  \*********************** */
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "addMessages": () => (/* binding */ addMessages),\n/* harmony export */   "filterMessages": () => (/* binding */ filterMessages),\n/* harmony export */   "initApp": () => (/* binding */ initApp),\n/* harmony export */   "sendMessages": () => (/* binding */ sendMessages),\n/* harmony export */   "updateMessages": () => (/* binding */ updateMessages)\n/* harmony export */ });\n/* harmony import */ var _messagesAPI__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./messagesAPI */ "./src/app/messagesAPI.ts");\n/* harmony import */ var _redux_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../redux/store */ "./src/redux/store.ts");\n/* harmony import */ var _redux_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../redux/actions */ "./src/redux/actions.ts");\n/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom */ "./src/app/dom.ts");\n\n\n\n\nfunction addMessages(root, messages) {\n  messages.forEach(message => root.append((0,_dom__WEBPACK_IMPORTED_MODULE_3__.createElMessage)(message)));\n  root.scrollTop = root.scrollHeight; // eslint-disable-line no-param-reassign\n}\n\nfunction isMessage(message) {\n  if (typeof message !== "object" || message === null) {\n    return false;\n  }\n  if (!["name", "message"].every(prop => prop in message && typeof prop === "string")) {\n    return false;\n  }\n  const date = message?.date;\n  if (!date || !(date instanceof Date) || Number.isNaN(Number(date))) {\n    return false;\n  }\n  return true;\n}\nfunction filterMessages(messages) {\n  const res = [];\n  // eslint-disable-next-line no-restricted-syntax\n  for (const message of messages) {\n    if (isMessage(message)) {\n      res.push(message);\n    }\n  }\n  return res;\n}\nfunction handleMessages() {\n  const messages = (0,_redux_store__WEBPACK_IMPORTED_MODULE_1__.getNewMessages)();\n  const filteredMessages = filterMessages(messages);\n  if (filteredMessages.length > 0) {\n    const messageHistoryEl = document.getElementById("message__history");\n    addMessages(messageHistoryEl, filteredMessages);\n  }\n}\nasync function updateMessages() {\n  const curHistoryLength = (0,_redux_store__WEBPACK_IMPORTED_MODULE_1__.getHistoryLength)();\n  const messages = await (0,_messagesAPI__WEBPACK_IMPORTED_MODULE_0__.getMessagesList)();\n  if (messages.length > curHistoryLength) {\n    const newMessagesSlice = messages.slice(curHistoryLength);\n    _redux_store__WEBPACK_IMPORTED_MODULE_1__["default"].dispatch((0,_redux_actions__WEBPACK_IMPORTED_MODULE_2__.newMessage)({\n      messageHistory: messages,\n      newMessage: newMessagesSlice\n    }));\n  }\n}\nfunction initApp(root, initListening = false) {\n  const app = (0,_dom__WEBPACK_IMPORTED_MODULE_3__.createLayout)(root, sendMessages); // eslint-disable-line @typescript-eslint/no-use-before-define\n  if (initListening) {\n    _redux_store__WEBPACK_IMPORTED_MODULE_1__["default"].subscribe(handleMessages);\n    setInterval(() => updateMessages(), 3000);\n    updateMessages();\n  }\n  return app;\n}\nasync function sendMessages(e) {\n  const form = e.target;\n  form.querySelector("#message__send-btn").disabled = true;\n  e.preventDefault();\n  const elNickname = document.getElementById("message__nickname-input");\n  const nickname = elNickname?.value;\n  if (!nickname) {\n    (0,_dom__WEBPACK_IMPORTED_MODULE_3__.addErrorStyle)(elNickname);\n    return;\n  }\n  const elMessage = document.getElementById("message__text-input");\n  const messageText = elMessage?.value;\n  if (!messageText) {\n    (0,_dom__WEBPACK_IMPORTED_MODULE_3__.addErrorStyle)(elMessage);\n    return;\n  }\n  const message = {\n    name: nickname,\n    message: messageText\n  };\n  await (0,_messagesAPI__WEBPACK_IMPORTED_MODULE_0__.sendMessage)(message).catch(err => {\n    alert(`Oooops! Something happened. ${err.toString()}`);\n  });\n  (0,_dom__WEBPACK_IMPORTED_MODULE_3__.resetForm)(form);\n}\n\n//# sourceURL=webpack:///./src/app/app.ts?'
        );

        /***/
      },

    /***/ "./src/app/dom.ts":
      /*! ************************!*\
  !*** ./src/app/dom.ts ***!
  \*********************** */
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "addErrorStyle": () => (/* binding */ addErrorStyle),\n/* harmony export */   "createElMessage": () => (/* binding */ createElMessage),\n/* harmony export */   "createLayout": () => (/* binding */ createLayout),\n/* harmony export */   "resetForm": () => (/* binding */ resetForm)\n/* harmony export */ });\n/* eslint-disable import/prefer-default-export */\n\nfunction createElMessage(message) {\n  const elMessage = document.createElement("section");\n  elMessage.classList.add("message");\n  const elNickname = document.createElement("div");\n  elNickname.classList.add("message__nickname");\n  elNickname.innerText = message.name;\n  elMessage.append(elNickname);\n  const elText = document.createElement("p");\n  elText.classList.add("message__text");\n  elText.innerText = message.message;\n  elMessage.append(elText);\n  const elDate = document.createElement("time");\n  elDate.classList.add("message__date");\n  elDate.innerText = message.date.toLocaleString();\n  elMessage.append(elDate);\n  return elMessage;\n}\nfunction removeError(button, e) {\n  const el = e.target;\n  el.classList.remove("error");\n  button.disabled = false; // eslint-disable-line no-param-reassign\n}\n\nfunction addErrorStyle(el) {\n  el.classList.add("error");\n  document.getElementById("message__send-btn").disabled = true;\n}\nfunction createLayout(root, onSendMessage) {\n  const configureElement = (el, name) => {\n    el.id = name; // eslint-disable-line no-param-reassign\n    el.classList.add(name);\n    if (name !== "message__container") {\n      form.append(el); // eslint-disable-line @typescript-eslint/no-use-before-define\n    }\n  };\n\n  const form = document.createElement("form");\n  configureElement(form, "message__container");\n  form.addEventListener("submit", onSendMessage);\n  const h1 = document.createElement("h1");\n  h1.classList.add("message__title");\n  h1.innerText = "Chat";\n  form.append(h1);\n  const historySection = document.createElement("section");\n  configureElement(historySection, "message__history");\n  const sendBtn = document.createElement("button");\n  sendBtn.innerText = "Send";\n  configureElement(sendBtn, "message__send-btn");\n  const nicknameInput = document.createElement("input");\n  nicknameInput.setAttribute("type", "text");\n  nicknameInput.setAttribute("placeholder", "Enter your name...");\n  nicknameInput.addEventListener("input", removeError.bind(null, sendBtn));\n  configureElement(nicknameInput, "message__nickname-input");\n  const messageInput = document.createElement("textarea");\n  messageInput.setAttribute("placeholder", "Leave your text here...");\n  messageInput.addEventListener("input", removeError.bind(null, sendBtn));\n  configureElement(messageInput, "message__text-input");\n  const app = document.createElement("div");\n  app.classList.add("app");\n  app.append(form);\n  root.append(app);\n  return app;\n}\nfunction resetForm(form) {\n  /* eslint-disable no-param-reassign */\n  form.querySelector("#message__nickname-input").value = "";\n  form.querySelector("#message__text-input").value = "";\n  form.querySelector("#message__send-btn").disabled = false;\n}\n\n//# sourceURL=webpack:///./src/app/dom.ts?'
        );

        /***/
      },

    /***/ "./src/app/messagesAPI.ts":
      /*! ********************************!*\
  !*** ./src/app/messagesAPI.ts ***!
  \******************************* */
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "getMessagesList": () => (/* binding */ getMessagesList),\n/* harmony export */   "sendMessage": () => (/* binding */ sendMessage)\n/* harmony export */ });\nconst config = {\n  firebaseBaseUrl: "https://otus-js-chat-4ed79-default-rtdb.firebaseio.com",\n  firebaseCollection: "messages.json"\n};\n\n// /**\n//  * @return {Object[]} messagesList\n//  */\nasync function getMessagesList() {\n  return fetch(`${config.firebaseBaseUrl}/${config.firebaseCollection}`, {\n    headers: {\n      Accept: "application/json",\n      "Content-Type": "application/json"\n    }\n  }).then(response => response.json()).then(data => Object.values(data).map(el => ({\n    ...el,\n    date: new Date(el.date)\n  })));\n}\n\n// /**\n//  * @param {Object} data\n//  * @param {string} data.nickname\n//  * @param {string} data.message\n//  * @returns {boolean}\n//  */\n\nasync function sendMessage(data) {\n  return fetch(`${config.firebaseBaseUrl}/${config.firebaseCollection}`, {\n    method: "POST",\n    body: JSON.stringify({\n      ...data,\n      date: new Date()\n    }),\n    headers: {\n      Accept: "application/json",\n      "Content-Type": "application/json"\n    }\n  }).then(response => response.json());\n}\n\n//   function observeWithXHR(cb) {\n//     // https://firebase.google.com/docs/reference/rest/database#section-streaming\n//     const xhr = new XMLHttpRequest();\n//     let lastResponseLength = 0;\n\n//     xhr.addEventListener("progress", () => {\n//       // console.log("xhr body", xhr.response);\n//       const body = xhr.response.substr(lastResponseLength);\n//       lastResponseLength = xhr.response.length;\n\n//       const eventType = body.match(/event: (.+)/)[1];\n//       const data = JSON.parse(body.match(/data: (.+)/)[1]);\n\n//       if (eventType === "put") {\n//         cb(data.data);\n//       }\n//     });\n\n//     xhr.open(\n//       "POST",\n//       `${config.firebaseBaseUrl}/${config.firebaseCollection}`,\n//       true\n//     );\n//     xhr.setRequestHeader("Accept", "text/event-stream");\n\n//     xhr.send();\n//   }\n\n//   function observeWithEventSource(cb) {\n//     // https://developer.mozilla.org/en-US/docs/Web/API/EventSource/EventSource\n//     const evtSource = new EventSource(\n//       `${config.firebaseBaseUrl}/${config.firebaseCollection}`\n//     );\n\n//     evtSource.addEventListener("put", (ev) => cb(JSON.parse(ev.data).data));\n//   }\n\n//   window.sendMessage = sendMessage;\n//   window.getMessagesList = getMessagesList;\n//   window.observeWithXHR = observeWithXHR;\n//   window.observeWithEventSource = observeWithEventSource;\n\n//# sourceURL=webpack:///./src/app/messagesAPI.ts?'
        );

        /***/
      },

    /***/ "./src/index.ts":
      /*! **********************!*\
  !*** ./src/index.ts ***!
  \********************* */
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _app_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app */ "./src/app/app.ts");\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");\n\n\n(0,_app_app__WEBPACK_IMPORTED_MODULE_0__.initApp)(document.body, true);\n\n//# sourceURL=webpack:///./src/index.ts?'
        );

        /***/
      },

    /***/ "./src/redux/actions.ts":
      /*! ******************************!*\
  !*** ./src/redux/actions.ts ***!
  \***************************** */
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "newMessage": () => (/* binding */ newMessage)\n/* harmony export */ });\nconst newMessage = payload => ({\n  type: "RECEIVED_NEW_MESSAGES",\n  payload\n});\n\n//# sourceURL=webpack:///./src/redux/actions.ts?'
        );

        /***/
      },

    /***/ "./src/redux/reducers.ts":
      /*! *******************************!*\
  !*** ./src/redux/reducers.ts ***!
  \****************************** */
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* eslint-disable @typescript-eslint/default-param-last */\n\nconst initialState = {\n  messageHistory: [],\n  newMessage: []\n};\nconst reducer = (state = initialState, action) => {\n  if (action.type === "RECEIVED_NEW_MESSAGES") {\n    const {\n      messageHistory,\n      newMessage\n    } = action.payload;\n    return {\n      ...state,\n      messageHistory,\n      newMessage\n    };\n  }\n  return state;\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reducer);\n\n//# sourceURL=webpack:///./src/redux/reducers.ts?'
        );

        /***/
      },

    /***/ "./src/redux/store.ts":
      /*! ****************************!*\
  !*** ./src/redux/store.ts ***!
  \*************************** */
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   "getHistoryLength": () => (/* binding */ getHistoryLength),\n/* harmony export */   "getNewMessages": () => (/* binding */ getNewMessages)\n/* harmony export */ });\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");\n/* harmony import */ var _reducers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reducers */ "./src/redux/reducers.ts");\n\n\nconst store = (0,redux__WEBPACK_IMPORTED_MODULE_1__.createStore)(_reducers__WEBPACK_IMPORTED_MODULE_0__["default"]);\nfunction getHistoryLength() {\n  return store.getState().messageHistory.length;\n}\nfunction getNewMessages() {\n  return store.getState().newMessage;\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (store);\n\n//# sourceURL=webpack:///./src/redux/store.ts?'
        );

        /***/
      },

    /***/ "./src/style.scss":
      /*! ************************!*\
  !*** ./src/style.scss ***!
  \*********************** */
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          "__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack:///./src/style.scss?"
        );

        /***/
      },

    /***/ "./node_modules/redux/es/redux.js":
      /*! ****************************************!*\
  !*** ./node_modules/redux/es/redux.js ***!
  \*************************************** */
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          "__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"__DO_NOT_USE__ActionTypes\": () => (/* binding */ ActionTypes),\n/* harmony export */   \"applyMiddleware\": () => (/* binding */ applyMiddleware),\n/* harmony export */   \"bindActionCreators\": () => (/* binding */ bindActionCreators),\n/* harmony export */   \"combineReducers\": () => (/* binding */ combineReducers),\n/* harmony export */   \"compose\": () => (/* binding */ compose),\n/* harmony export */   \"createStore\": () => (/* binding */ createStore),\n/* harmony export */   \"legacy_createStore\": () => (/* binding */ legacy_createStore)\n/* harmony export */ });\n/* harmony import */ var _babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/objectSpread2 */ \"./node_modules/@babel/runtime/helpers/esm/objectSpread2.js\");\n\n\n/**\n * Adapted from React: https://github.com/facebook/react/blob/master/packages/shared/formatProdErrorMessage.js\n *\n * Do not require this module directly! Use normal throw error calls. These messages will be replaced with error codes\n * during build.\n * @param {number} code\n */\nfunction formatProdErrorMessage(code) {\n  return \"Minified Redux error #\" + code + \"; visit https://redux.js.org/Errors?code=\" + code + \" for the full message or \" + 'use the non-minified dev environment for full errors. ';\n}\n\n// Inlined version of the `symbol-observable` polyfill\nvar $$observable = (function () {\n  return typeof Symbol === 'function' && Symbol.observable || '@@observable';\n})();\n\n/**\n * These are private action types reserved by Redux.\n * For any unknown actions, you must return the current state.\n * If the current state is undefined, you must return the initial state.\n * Do not reference these action types directly in your code.\n */\nvar randomString = function randomString() {\n  return Math.random().toString(36).substring(7).split('').join('.');\n};\n\nvar ActionTypes = {\n  INIT: \"@@redux/INIT\" + randomString(),\n  REPLACE: \"@@redux/REPLACE\" + randomString(),\n  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {\n    return \"@@redux/PROBE_UNKNOWN_ACTION\" + randomString();\n  }\n};\n\n/**\n * @param {any} obj The object to inspect.\n * @returns {boolean} True if the argument appears to be a plain object.\n */\nfunction isPlainObject(obj) {\n  if (typeof obj !== 'object' || obj === null) return false;\n  var proto = obj;\n\n  while (Object.getPrototypeOf(proto) !== null) {\n    proto = Object.getPrototypeOf(proto);\n  }\n\n  return Object.getPrototypeOf(obj) === proto;\n}\n\n// Inlined / shortened version of `kindOf` from https://github.com/jonschlinkert/kind-of\nfunction miniKindOf(val) {\n  if (val === void 0) return 'undefined';\n  if (val === null) return 'null';\n  var type = typeof val;\n\n  switch (type) {\n    case 'boolean':\n    case 'string':\n    case 'number':\n    case 'symbol':\n    case 'function':\n      {\n        return type;\n      }\n  }\n\n  if (Array.isArray(val)) return 'array';\n  if (isDate(val)) return 'date';\n  if (isError(val)) return 'error';\n  var constructorName = ctorName(val);\n\n  switch (constructorName) {\n    case 'Symbol':\n    case 'Promise':\n    case 'WeakMap':\n    case 'WeakSet':\n    case 'Map':\n    case 'Set':\n      return constructorName;\n  } // other\n\n\n  return type.slice(8, -1).toLowerCase().replace(/\\s/g, '');\n}\n\nfunction ctorName(val) {\n  return typeof val.constructor === 'function' ? val.constructor.name : null;\n}\n\nfunction isError(val) {\n  return val instanceof Error || typeof val.message === 'string' && val.constructor && typeof val.constructor.stackTraceLimit === 'number';\n}\n\nfunction isDate(val) {\n  if (val instanceof Date) return true;\n  return typeof val.toDateString === 'function' && typeof val.getDate === 'function' && typeof val.setDate === 'function';\n}\n\nfunction kindOf(val) {\n  var typeOfVal = typeof val;\n\n  if (true) {\n    typeOfVal = miniKindOf(val);\n  }\n\n  return typeOfVal;\n}\n\n/**\n * @deprecated\n *\n * **We recommend using the `configureStore` method\n * of the `@reduxjs/toolkit` package**, which replaces `createStore`.\n *\n * Redux Toolkit is our recommended approach for writing Redux logic today,\n * including store setup, reducers, data fetching, and more.\n *\n * **For more details, please read this Redux docs page:**\n * **https://redux.js.org/introduction/why-rtk-is-redux-today**\n *\n * `configureStore` from Redux Toolkit is an improved version of `createStore` that\n * simplifies setup and helps avoid common bugs.\n *\n * You should not be using the `redux` core package by itself today, except for learning purposes.\n * The `createStore` method from the core `redux` package will not be removed, but we encourage\n * all users to migrate to using Redux Toolkit for all Redux code.\n *\n * If you want to use `createStore` without this visual deprecation warning, use\n * the `legacy_createStore` import instead:\n *\n * `import { legacy_createStore as createStore} from 'redux'`\n *\n */\n\nfunction createStore(reducer, preloadedState, enhancer) {\n  var _ref2;\n\n  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {\n    throw new Error( false ? 0 : 'It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.');\n  }\n\n  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {\n    enhancer = preloadedState;\n    preloadedState = undefined;\n  }\n\n  if (typeof enhancer !== 'undefined') {\n    if (typeof enhancer !== 'function') {\n      throw new Error( false ? 0 : \"Expected the enhancer to be a function. Instead, received: '\" + kindOf(enhancer) + \"'\");\n    }\n\n    return enhancer(createStore)(reducer, preloadedState);\n  }\n\n  if (typeof reducer !== 'function') {\n    throw new Error( false ? 0 : \"Expected the root reducer to be a function. Instead, received: '\" + kindOf(reducer) + \"'\");\n  }\n\n  var currentReducer = reducer;\n  var currentState = preloadedState;\n  var currentListeners = [];\n  var nextListeners = currentListeners;\n  var isDispatching = false;\n  /**\n   * This makes a shallow copy of currentListeners so we can use\n   * nextListeners as a temporary list while dispatching.\n   *\n   * This prevents any bugs around consumers calling\n   * subscribe/unsubscribe in the middle of a dispatch.\n   */\n\n  function ensureCanMutateNextListeners() {\n    if (nextListeners === currentListeners) {\n      nextListeners = currentListeners.slice();\n    }\n  }\n  /**\n   * Reads the state tree managed by the store.\n   *\n   * @returns {any} The current state tree of your application.\n   */\n\n\n  function getState() {\n    if (isDispatching) {\n      throw new Error( false ? 0 : 'You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');\n    }\n\n    return currentState;\n  }\n  /**\n   * Adds a change listener. It will be called any time an action is dispatched,\n   * and some part of the state tree may potentially have changed. You may then\n   * call `getState()` to read the current state tree inside the callback.\n   *\n   * You may call `dispatch()` from a change listener, with the following\n   * caveats:\n   *\n   * 1. The subscriptions are snapshotted just before every `dispatch()` call.\n   * If you subscribe or unsubscribe while the listeners are being invoked, this\n   * will not have any effect on the `dispatch()` that is currently in progress.\n   * However, the next `dispatch()` call, whether nested or not, will use a more\n   * recent snapshot of the subscription list.\n   *\n   * 2. The listener should not expect to see all state changes, as the state\n   * might have been updated multiple times during a nested `dispatch()` before\n   * the listener is called. It is, however, guaranteed that all subscribers\n   * registered before the `dispatch()` started will be called with the latest\n   * state by the time it exits.\n   *\n   * @param {Function} listener A callback to be invoked on every dispatch.\n   * @returns {Function} A function to remove this change listener.\n   */\n\n\n  function subscribe(listener) {\n    if (typeof listener !== 'function') {\n      throw new Error( false ? 0 : \"Expected the listener to be a function. Instead, received: '\" + kindOf(listener) + \"'\");\n    }\n\n    if (isDispatching) {\n      throw new Error( false ? 0 : 'You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api/store#subscribelistener for more details.');\n    }\n\n    var isSubscribed = true;\n    ensureCanMutateNextListeners();\n    nextListeners.push(listener);\n    return function unsubscribe() {\n      if (!isSubscribed) {\n        return;\n      }\n\n      if (isDispatching) {\n        throw new Error( false ? 0 : 'You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api/store#subscribelistener for more details.');\n      }\n\n      isSubscribed = false;\n      ensureCanMutateNextListeners();\n      var index = nextListeners.indexOf(listener);\n      nextListeners.splice(index, 1);\n      currentListeners = null;\n    };\n  }\n  /**\n   * Dispatches an action. It is the only way to trigger a state change.\n   *\n   * The `reducer` function, used to create the store, will be called with the\n   * current state tree and the given `action`. Its return value will\n   * be considered the **next** state of the tree, and the change listeners\n   * will be notified.\n   *\n   * The base implementation only supports plain object actions. If you want to\n   * dispatch a Promise, an Observable, a thunk, or something else, you need to\n   * wrap your store creating function into the corresponding middleware. For\n   * example, see the documentation for the `redux-thunk` package. Even the\n   * middleware will eventually dispatch plain object actions using this method.\n   *\n   * @param {Object} action A plain object representing “what changed”. It is\n   * a good idea to keep actions serializable so you can record and replay user\n   * sessions, or use the time travelling `redux-devtools`. An action must have\n   * a `type` property which may not be `undefined`. It is a good idea to use\n   * string constants for action types.\n   *\n   * @returns {Object} For convenience, the same action object you dispatched.\n   *\n   * Note that, if you use a custom middleware, it may wrap `dispatch()` to\n   * return something else (for example, a Promise you can await).\n   */\n\n\n  function dispatch(action) {\n    if (!isPlainObject(action)) {\n      throw new Error( false ? 0 : \"Actions must be plain objects. Instead, the actual type was: '\" + kindOf(action) + \"'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.\");\n    }\n\n    if (typeof action.type === 'undefined') {\n      throw new Error( false ? 0 : 'Actions may not have an undefined \"type\" property. You may have misspelled an action type string constant.');\n    }\n\n    if (isDispatching) {\n      throw new Error( false ? 0 : 'Reducers may not dispatch actions.');\n    }\n\n    try {\n      isDispatching = true;\n      currentState = currentReducer(currentState, action);\n    } finally {\n      isDispatching = false;\n    }\n\n    var listeners = currentListeners = nextListeners;\n\n    for (var i = 0; i < listeners.length; i++) {\n      var listener = listeners[i];\n      listener();\n    }\n\n    return action;\n  }\n  /**\n   * Replaces the reducer currently used by the store to calculate the state.\n   *\n   * You might need this if your app implements code splitting and you want to\n   * load some of the reducers dynamically. You might also need this if you\n   * implement a hot reloading mechanism for Redux.\n   *\n   * @param {Function} nextReducer The reducer for the store to use instead.\n   * @returns {void}\n   */\n\n\n  function replaceReducer(nextReducer) {\n    if (typeof nextReducer !== 'function') {\n      throw new Error( false ? 0 : \"Expected the nextReducer to be a function. Instead, received: '\" + kindOf(nextReducer));\n    }\n\n    currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.\n    // Any reducers that existed in both the new and old rootReducer\n    // will receive the previous state. This effectively populates\n    // the new state tree with any relevant data from the old one.\n\n    dispatch({\n      type: ActionTypes.REPLACE\n    });\n  }\n  /**\n   * Interoperability point for observable/reactive libraries.\n   * @returns {observable} A minimal observable of state changes.\n   * For more information, see the observable proposal:\n   * https://github.com/tc39/proposal-observable\n   */\n\n\n  function observable() {\n    var _ref;\n\n    var outerSubscribe = subscribe;\n    return _ref = {\n      /**\n       * The minimal observable subscription method.\n       * @param {Object} observer Any object that can be used as an observer.\n       * The observer object should have a `next` method.\n       * @returns {subscription} An object with an `unsubscribe` method that can\n       * be used to unsubscribe the observable from the store, and prevent further\n       * emission of values from the observable.\n       */\n      subscribe: function subscribe(observer) {\n        if (typeof observer !== 'object' || observer === null) {\n          throw new Error( false ? 0 : \"Expected the observer to be an object. Instead, received: '\" + kindOf(observer) + \"'\");\n        }\n\n        function observeState() {\n          if (observer.next) {\n            observer.next(getState());\n          }\n        }\n\n        observeState();\n        var unsubscribe = outerSubscribe(observeState);\n        return {\n          unsubscribe: unsubscribe\n        };\n      }\n    }, _ref[$$observable] = function () {\n      return this;\n    }, _ref;\n  } // When a store is created, an \"INIT\" action is dispatched so that every\n  // reducer returns their initial state. This effectively populates\n  // the initial state tree.\n\n\n  dispatch({\n    type: ActionTypes.INIT\n  });\n  return _ref2 = {\n    dispatch: dispatch,\n    subscribe: subscribe,\n    getState: getState,\n    replaceReducer: replaceReducer\n  }, _ref2[$$observable] = observable, _ref2;\n}\n/**\n * Creates a Redux store that holds the state tree.\n *\n * **We recommend using `configureStore` from the\n * `@reduxjs/toolkit` package**, which replaces `createStore`:\n * **https://redux.js.org/introduction/why-rtk-is-redux-today**\n *\n * The only way to change the data in the store is to call `dispatch()` on it.\n *\n * There should only be a single store in your app. To specify how different\n * parts of the state tree respond to actions, you may combine several reducers\n * into a single reducer function by using `combineReducers`.\n *\n * @param {Function} reducer A function that returns the next state tree, given\n * the current state tree and the action to handle.\n *\n * @param {any} [preloadedState] The initial state. You may optionally specify it\n * to hydrate the state from the server in universal apps, or to restore a\n * previously serialized user session.\n * If you use `combineReducers` to produce the root reducer function, this must be\n * an object with the same shape as `combineReducers` keys.\n *\n * @param {Function} [enhancer] The store enhancer. You may optionally specify it\n * to enhance the store with third-party capabilities such as middleware,\n * time travel, persistence, etc. The only store enhancer that ships with Redux\n * is `applyMiddleware()`.\n *\n * @returns {Store} A Redux store that lets you read the state, dispatch actions\n * and subscribe to changes.\n */\n\nvar legacy_createStore = createStore;\n\n/**\n * Prints a warning in the console if it exists.\n *\n * @param {String} message The warning message.\n * @returns {void}\n */\nfunction warning(message) {\n  /* eslint-disable no-console */\n  if (typeof console !== 'undefined' && typeof console.error === 'function') {\n    console.error(message);\n  }\n  /* eslint-enable no-console */\n\n\n  try {\n    // This error was thrown as a convenience so that if you enable\n    // \"break on all exceptions\" in your console,\n    // it would pause the execution at this line.\n    throw new Error(message);\n  } catch (e) {} // eslint-disable-line no-empty\n\n}\n\nfunction getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {\n  var reducerKeys = Object.keys(reducers);\n  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';\n\n  if (reducerKeys.length === 0) {\n    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';\n  }\n\n  if (!isPlainObject(inputState)) {\n    return \"The \" + argumentName + \" has unexpected type of \\\"\" + kindOf(inputState) + \"\\\". Expected argument to be an object with the following \" + (\"keys: \\\"\" + reducerKeys.join('\", \"') + \"\\\"\");\n  }\n\n  var unexpectedKeys = Object.keys(inputState).filter(function (key) {\n    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];\n  });\n  unexpectedKeys.forEach(function (key) {\n    unexpectedKeyCache[key] = true;\n  });\n  if (action && action.type === ActionTypes.REPLACE) return;\n\n  if (unexpectedKeys.length > 0) {\n    return \"Unexpected \" + (unexpectedKeys.length > 1 ? 'keys' : 'key') + \" \" + (\"\\\"\" + unexpectedKeys.join('\", \"') + \"\\\" found in \" + argumentName + \". \") + \"Expected to find one of the known reducer keys instead: \" + (\"\\\"\" + reducerKeys.join('\", \"') + \"\\\". Unexpected keys will be ignored.\");\n  }\n}\n\nfunction assertReducerShape(reducers) {\n  Object.keys(reducers).forEach(function (key) {\n    var reducer = reducers[key];\n    var initialState = reducer(undefined, {\n      type: ActionTypes.INIT\n    });\n\n    if (typeof initialState === 'undefined') {\n      throw new Error( false ? 0 : \"The slice reducer for key \\\"\" + key + \"\\\" returned undefined during initialization. \" + \"If the state passed to the reducer is undefined, you must \" + \"explicitly return the initial state. The initial state may \" + \"not be undefined. If you don't want to set a value for this reducer, \" + \"you can use null instead of undefined.\");\n    }\n\n    if (typeof reducer(undefined, {\n      type: ActionTypes.PROBE_UNKNOWN_ACTION()\n    }) === 'undefined') {\n      throw new Error( false ? 0 : \"The slice reducer for key \\\"\" + key + \"\\\" returned undefined when probed with a random type. \" + (\"Don't try to handle '\" + ActionTypes.INIT + \"' or other actions in \\\"redux/*\\\" \") + \"namespace. They are considered private. Instead, you must return the \" + \"current state for any unknown actions, unless it is undefined, \" + \"in which case you must return the initial state, regardless of the \" + \"action type. The initial state may not be undefined, but can be null.\");\n    }\n  });\n}\n/**\n * Turns an object whose values are different reducer functions, into a single\n * reducer function. It will call every child reducer, and gather their results\n * into a single state object, whose keys correspond to the keys of the passed\n * reducer functions.\n *\n * @param {Object} reducers An object whose values correspond to different\n * reducer functions that need to be combined into one. One handy way to obtain\n * it is to use ES6 `import * as reducers` syntax. The reducers may never return\n * undefined for any action. Instead, they should return their initial state\n * if the state passed to them was undefined, and the current state for any\n * unrecognized action.\n *\n * @returns {Function} A reducer function that invokes every reducer inside the\n * passed object, and builds a state object with the same shape.\n */\n\n\nfunction combineReducers(reducers) {\n  var reducerKeys = Object.keys(reducers);\n  var finalReducers = {};\n\n  for (var i = 0; i < reducerKeys.length; i++) {\n    var key = reducerKeys[i];\n\n    if (true) {\n      if (typeof reducers[key] === 'undefined') {\n        warning(\"No reducer provided for key \\\"\" + key + \"\\\"\");\n      }\n    }\n\n    if (typeof reducers[key] === 'function') {\n      finalReducers[key] = reducers[key];\n    }\n  }\n\n  var finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same\n  // keys multiple times.\n\n  var unexpectedKeyCache;\n\n  if (true) {\n    unexpectedKeyCache = {};\n  }\n\n  var shapeAssertionError;\n\n  try {\n    assertReducerShape(finalReducers);\n  } catch (e) {\n    shapeAssertionError = e;\n  }\n\n  return function combination(state, action) {\n    if (state === void 0) {\n      state = {};\n    }\n\n    if (shapeAssertionError) {\n      throw shapeAssertionError;\n    }\n\n    if (true) {\n      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);\n\n      if (warningMessage) {\n        warning(warningMessage);\n      }\n    }\n\n    var hasChanged = false;\n    var nextState = {};\n\n    for (var _i = 0; _i < finalReducerKeys.length; _i++) {\n      var _key = finalReducerKeys[_i];\n      var reducer = finalReducers[_key];\n      var previousStateForKey = state[_key];\n      var nextStateForKey = reducer(previousStateForKey, action);\n\n      if (typeof nextStateForKey === 'undefined') {\n        var actionType = action && action.type;\n        throw new Error( false ? 0 : \"When called with an action of type \" + (actionType ? \"\\\"\" + String(actionType) + \"\\\"\" : '(unknown type)') + \", the slice reducer for key \\\"\" + _key + \"\\\" returned undefined. \" + \"To ignore an action, you must explicitly return the previous state. \" + \"If you want this reducer to hold no value, you can return null instead of undefined.\");\n      }\n\n      nextState[_key] = nextStateForKey;\n      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;\n    }\n\n    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;\n    return hasChanged ? nextState : state;\n  };\n}\n\nfunction bindActionCreator(actionCreator, dispatch) {\n  return function () {\n    return dispatch(actionCreator.apply(this, arguments));\n  };\n}\n/**\n * Turns an object whose values are action creators, into an object with the\n * same keys, but with every function wrapped into a `dispatch` call so they\n * may be invoked directly. This is just a convenience method, as you can call\n * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.\n *\n * For convenience, you can also pass an action creator as the first argument,\n * and get a dispatch wrapped function in return.\n *\n * @param {Function|Object} actionCreators An object whose values are action\n * creator functions. One handy way to obtain it is to use ES6 `import * as`\n * syntax. You may also pass a single function.\n *\n * @param {Function} dispatch The `dispatch` function available on your Redux\n * store.\n *\n * @returns {Function|Object} The object mimicking the original object, but with\n * every action creator wrapped into the `dispatch` call. If you passed a\n * function as `actionCreators`, the return value will also be a single\n * function.\n */\n\n\nfunction bindActionCreators(actionCreators, dispatch) {\n  if (typeof actionCreators === 'function') {\n    return bindActionCreator(actionCreators, dispatch);\n  }\n\n  if (typeof actionCreators !== 'object' || actionCreators === null) {\n    throw new Error( false ? 0 : \"bindActionCreators expected an object or a function, but instead received: '\" + kindOf(actionCreators) + \"'. \" + \"Did you write \\\"import ActionCreators from\\\" instead of \\\"import * as ActionCreators from\\\"?\");\n  }\n\n  var boundActionCreators = {};\n\n  for (var key in actionCreators) {\n    var actionCreator = actionCreators[key];\n\n    if (typeof actionCreator === 'function') {\n      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);\n    }\n  }\n\n  return boundActionCreators;\n}\n\n/**\n * Composes single-argument functions from right to left. The rightmost\n * function can take multiple arguments as it provides the signature for\n * the resulting composite function.\n *\n * @param {...Function} funcs The functions to compose.\n * @returns {Function} A function obtained by composing the argument functions\n * from right to left. For example, compose(f, g, h) is identical to doing\n * (...args) => f(g(h(...args))).\n */\nfunction compose() {\n  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {\n    funcs[_key] = arguments[_key];\n  }\n\n  if (funcs.length === 0) {\n    return function (arg) {\n      return arg;\n    };\n  }\n\n  if (funcs.length === 1) {\n    return funcs[0];\n  }\n\n  return funcs.reduce(function (a, b) {\n    return function () {\n      return a(b.apply(void 0, arguments));\n    };\n  });\n}\n\n/**\n * Creates a store enhancer that applies middleware to the dispatch method\n * of the Redux store. This is handy for a variety of tasks, such as expressing\n * asynchronous actions in a concise manner, or logging every action payload.\n *\n * See `redux-thunk` package as an example of the Redux middleware.\n *\n * Because middleware is potentially asynchronous, this should be the first\n * store enhancer in the composition chain.\n *\n * Note that each middleware will be given the `dispatch` and `getState` functions\n * as named arguments.\n *\n * @param {...Function} middlewares The middleware chain to be applied.\n * @returns {Function} A store enhancer applying the middleware.\n */\n\nfunction applyMiddleware() {\n  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {\n    middlewares[_key] = arguments[_key];\n  }\n\n  return function (createStore) {\n    return function () {\n      var store = createStore.apply(void 0, arguments);\n\n      var _dispatch = function dispatch() {\n        throw new Error( false ? 0 : 'Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.');\n      };\n\n      var middlewareAPI = {\n        getState: store.getState,\n        dispatch: function dispatch() {\n          return _dispatch.apply(void 0, arguments);\n        }\n      };\n      var chain = middlewares.map(function (middleware) {\n        return middleware(middlewareAPI);\n      });\n      _dispatch = compose.apply(void 0, chain)(store.dispatch);\n      return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({}, store), {}, {\n        dispatch: _dispatch\n      });\n    };\n  };\n}\n\n/*\n * This is a dummy function to check if the function name has been altered by minification.\n * If the function has been minified and NODE_ENV !== 'production', warn the user.\n */\n\nfunction isCrushed() {}\n\nif ( true && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {\n  warning('You are currently using minified code outside of NODE_ENV === \"production\". ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' + 'to ensure you have the correct code for your production build.');\n}\n\n\n\n\n//# sourceURL=webpack:///./node_modules/redux/es/redux.js?"
        );

        /***/
      },

    /***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js":
      /*! *******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \****************************************************************** */
      /***/ (
        __unused_webpack___webpack_module__,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ _defineProperty)\n/* harmony export */ });\n/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPropertyKey.js */ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js");\n\nfunction _defineProperty(obj, key, value) {\n  key = (0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__["default"])(key);\n  if (key in obj) {\n    Object.defineProperty(obj, key, {\n      value: value,\n      enumerable: true,\n      configurable: true,\n      writable: true\n    });\n  } else {\n    obj[key] = value;\n  }\n  return obj;\n}\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/esm/defineProperty.js?'
        );

        /***/
      },

    /***/ "./node_modules/@babel/runtime/helpers/esm/objectSpread2.js":
      /*! ******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js ***!
  \***************************************************************** */
      /***/ (
        __unused_webpack___webpack_module__,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ _objectSpread2)\n/* harmony export */ });\n/* harmony import */ var _defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./defineProperty.js */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");\n\nfunction ownKeys(object, enumerableOnly) {\n  var keys = Object.keys(object);\n  if (Object.getOwnPropertySymbols) {\n    var symbols = Object.getOwnPropertySymbols(object);\n    enumerableOnly && (symbols = symbols.filter(function (sym) {\n      return Object.getOwnPropertyDescriptor(object, sym).enumerable;\n    })), keys.push.apply(keys, symbols);\n  }\n  return keys;\n}\nfunction _objectSpread2(target) {\n  for (var i = 1; i < arguments.length; i++) {\n    var source = null != arguments[i] ? arguments[i] : {};\n    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {\n      (0,_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]);\n    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {\n      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));\n    });\n  }\n  return target;\n}\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/esm/objectSpread2.js?'
        );

        /***/
      },

    /***/ "./node_modules/@babel/runtime/helpers/esm/toPrimitive.js":
      /*! ****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toPrimitive.js ***!
  \*************************************************************** */
      /***/ (
        __unused_webpack___webpack_module__,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ _toPrimitive)\n/* harmony export */ });\n/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");\n\nfunction _toPrimitive(input, hint) {\n  if ((0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(input) !== "object" || input === null) return input;\n  var prim = input[Symbol.toPrimitive];\n  if (prim !== undefined) {\n    var res = prim.call(input, hint || "default");\n    if ((0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(res) !== "object") return res;\n    throw new TypeError("@@toPrimitive must return a primitive value.");\n  }\n  return (hint === "string" ? String : Number)(input);\n}\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/esm/toPrimitive.js?'
        );

        /***/
      },

    /***/ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js":
      /*! ******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js ***!
  \***************************************************************** */
      /***/ (
        __unused_webpack___webpack_module__,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ _toPropertyKey)\n/* harmony export */ });\n/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");\n/* harmony import */ var _toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toPrimitive.js */ "./node_modules/@babel/runtime/helpers/esm/toPrimitive.js");\n\n\nfunction _toPropertyKey(arg) {\n  var key = (0,_toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arg, "string");\n  return (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(key) === "symbol" ? key : String(key);\n}\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js?'
        );

        /***/
      },

    /***/ "./node_modules/@babel/runtime/helpers/esm/typeof.js":
      /*! ***********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \********************************************************** */
      /***/ (
        __unused_webpack___webpack_module__,
        __webpack_exports__,
        __webpack_require__
      ) => {
        eval(
          '__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ _typeof)\n/* harmony export */ });\nfunction _typeof(obj) {\n  "@babel/helpers - typeof";\n\n  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {\n    return typeof obj;\n  } : function (obj) {\n    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;\n  }, _typeof(obj);\n}\n\n//# sourceURL=webpack:///./node_modules/@babel/runtime/helpers/esm/typeof.js?'
        );

        /***/
      },

    /** *** */
  };
  /** ********************************************************************* */
  /** *** */ // The module cache
  /** *** */ const __webpack_module_cache__ = {};
  /** *** */
  /** *** */ // The require function
  /** *** */ function __webpack_require__(moduleId) {
    /** *** */ // Check if module is in cache
    /** *** */ const cachedModule = __webpack_module_cache__[moduleId];
    /** *** */ if (cachedModule !== undefined) {
      /** *** */ return cachedModule.exports;
      /** *** */
    }
    /** *** */ // Create a new module (and put it into the cache)
    /** *** */ const module = (__webpack_module_cache__[moduleId] = {
      /** *** */ // no module.id needed
      /** *** */ // no module.loaded needed
      /** *** */ exports: {},
      /** *** */
    });
    /** *** */
    /** *** */ // Execute the module function
    /** *** */ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__
    );
    /** *** */
    /** *** */ // Return the exports of the module
    /** *** */ return module.exports;
    /** *** */
  }
  /** *** */
  /** ********************************************************************* */
  /** *** */ /* webpack/runtime/define property getters */
  /** *** */ (() => {
    /** *** */ // define getter functions for harmony exports
    /** *** */ __webpack_require__.d = (exports, definition) => {
      /** *** */ for (const key in definition) {
        /** *** */ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /** *** */ Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
          /** *** */
        }
        /** *** */
      }
      /** *** */
    };
    /** *** */
  })();
  /** *** */
  /** *** */ /* webpack/runtime/hasOwnProperty shorthand */
  /** *** */ (() => {
    /** *** */ __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
    /** *** */
  })();
  /** *** */
  /** *** */ /* webpack/runtime/make namespace object */
  /** *** */ (() => {
    /** *** */ // define __esModule on exports
    /** *** */ __webpack_require__.r = (exports) => {
      /** *** */ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        /** *** */ Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
        /** *** */
      }
      /** *** */ Object.defineProperty(exports, "__esModule", { value: true });
      /** *** */
    };
    /** *** */
  })();
  /** *** */
  /** ********************************************************************* */
  /** *** */
  /** *** */ // startup
  /** *** */ // Load entry module and return exports
  /** *** */ // This entry module can't be inlined because the eval devtool is used.
  /** *** */ const __webpack_exports__ = __webpack_require__("./src/index.ts");
  /** *** */
  /** *** */
})();
