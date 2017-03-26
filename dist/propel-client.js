!function e(t,n,r){function i(s,a){if(!n[s]){if(!t[s]){var u="function"==typeof require&&require;if(!a&&u)return u(s,!0);if(o)return o(s,!0);var c=new Error("Cannot find module '"+s+"'");throw c.code="MODULE_NOT_FOUND",c}var p=n[s]={exports:{}};t[s][0].call(p.exports,function(e){var n=t[s][1][e];return i(n?n:e)},p,p.exports,e,t,n,r)}return n[s].exports}for(var o="function"==typeof require&&require,s=0;s<r.length;s++)i(r[s]);return i}({1:[function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function s(e){for(var t="=".repeat((4-e.length%4)%4),n=(e+t).replace(/\-/g,"+").replace(/_/g,"/"),r=window.atob(n),i=new Uint8Array(r.length),o=0;o<r.length;++o)i[o]=r.charCodeAt(o);return i}function a(e,t){return function(n){"statuschange"===n.type&&u(e,{action:n.isSubscribed?"subscribe":"unsubscribe",subscription:n.currentSubscription,data:t})}}function u(e,t){return fetch(e,{method:"post",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}})}var c=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),p={"not supported":"Your browser doesn't support push messaging.",denied:"The user denied permission to show notifications.","default":"The user dismissed the notification permission dialog.",endpoint:"No endpoint URL specified.",nogcmid:'Please ensure you have a Web App Manifest with a "gcm_sender_id" defined.'},f=function(e){function t(e){r(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return n.message="Subscription failed.",p[e]&&(n.message+=" "+p[e]),n.type=e,n}return o(t,e),t}(Error),h=function b(e,t){var n=this;if(r(this,b),this.type=e,t){var i=Object.keys(t);i.forEach(function(e){n[e]=t[e]})}},d=function(){function e(){r(this,e),this._eventTypes=new Map}return c(e,[{key:"addEventListener",value:function(e,t){this._eventTypes.has(e)||this._eventTypes.set(e,new Set),this._eventTypes.get(e).add(t)}},{key:"removeEventListener",value:function(e,t){this._eventTypes.has(e)&&this._eventTypes.get(e)["delete"](t)}},{key:"dispatchEvent",value:function(e){if(this._eventTypes.has(e.type)){var t=this._eventTypes.get(e.type);t.forEach(function(t){t(e)})}}}]),e}(),l="serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"showNotification"in ServiceWorkerRegistration.prototype,v={"bad factory":"The PushClient.createClient() method expects a service worker path and an option scope string.","bad constructor":"The PushClient constructor expects a service worker registration. Alternatively, you can use PropelClient.createClient() to create a PropelClient with a service worker path string and an optional scope string.","redundant worker":"Worker became redundant"},g=function(e){if(e.active)return Promise.resolve(e);var t=e.installing||e.waiting;return new Promise(function(n,r){if("activated"===t.state)return void n(e);var i=function o(){if("activated"===t.state)n(e);else{if("redundant"!==t.state)return;r(new Error(v["redundant worker"]))}t.removeEventListener("statechange",o)};t.addEventListener("statechange",i)})},w=function(e){function t(e){r(this,t);var n=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));if(!t.isSupported())throw new Error("Your browser does not support the web push API");if(!(e instanceof ServiceWorkerRegistration))throw new Error(v["bad constructor"]);return n._registration=e,n._dispatchStatusUpdate(),n}return o(t,e),c(t,[{key:"_dispatchStatusUpdate",value:function(){var e=this;return Promise.all([this.getSubscription()["catch"](function(){return null}),t.getPermissionState()]).then(function(e){return{isSubscribed:null!==e[0],currentSubscription:e[0],permissionState:e[1]}}).then(function(t){e.dispatchEvent(new h("statuschange",t))})["catch"](function(e){console.warn("Unable to dispatch a status event getSubscription() failed.",e)})}},{key:"subscribe",value:function(e){var t=this;return this.requestPermission(!1).then(function(e){if("granted"!==e)throw t._dispatchStatusUpdate(),new f(e);return t.dispatchEvent(new h("requestingsubscription")),t._registration}).then(g).then(function(n){var r=s(e);return n.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:r})["catch"](function(e){return t._dispatchStatusUpdate().then(function(){throw"Registration failed - no sender id provided"===e.message?new f("nogcmid"):e})})}).then(function(e){return t._dispatchStatusUpdate(),e})}},{key:"unsubscribe",value:function(){var e=this,t=this.getRegistration();return t?t.pushManager.getSubscription().then(function(e){if(e)return e.unsubscribe()}).then(function(){e._dispatchStatusUpdate()})["catch"](function(t){return e._dispatchStatusUpdate().then(function(){throw t})}):this._dispatchStatusUpdate()}},{key:"getRegistration",value:function(){return this._registration}},{key:"getSubscription",value:function(){var e=this.getRegistration();return e?e.pushManager.getSubscription():Promise.resolve(null)}},{key:"requestPermission",value:function(){var e=this,n=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];return t.getPermissionState().then(function(t){return"default"===t&&e.dispatchEvent(new h("requestingpermission")),new Promise(function(e){return Notification.requestPermission(e)}).then(function(t){return n&&e._dispatchStatusUpdate(),t})})}}],[{key:"createClient",value:function(e,n){if(!e||"string"!=typeof e||0===e.length)return Promise.reject(new Error(v["bad factory"]));var r=void 0;return n&&(r={scope:n}),navigator.serviceWorker.register(e,r).then(function(e){return new t(e)})}},{key:"isSupported",value:function(){return l}},{key:"getPermissionState",value:function(){return new Promise(function(e){e(Notification.permission)})}}]),t}(d);window.goog=window.goog||{},window.goog.propel=window.goog.propel||{PropelClient:w,serverUpdater:a}},{}]},{},[1]);
//# sourceMappingURL=propel-client.js.map