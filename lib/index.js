"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _mobileDetect = _interopRequireDefault(require("mobile-detect"));

var _window = window,
    navigator = _window.navigator,
    location = _window.location;
var userAgent = navigator.userAgent;
var protocol = location.protocol;

var Orientation = /*#__PURE__*/function () {
  function Orientation() {
    (0, _classCallCheck2["default"])(this, Orientation);
    this.disable = true;
    this.isSuppord = false;
  }
  /**
   * initial on click event
   * @param {function} granted permission granted function
   * @param {function} deined permission deined function
   * @returns
   */


  (0, _createClass2["default"])(Orientation, [{
    key: "permission",
    value: function permission() {
      var _this = this;

      return new Promise(function (res, rej) {
        //desktop escap all
        if (_this.get() === 'desktop') {
          rej('desktop is not support');
        } // IOS 14+ need permission request.


        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
          // ISO need SSL also.
          if (protocol.indexOf('https') < 0) {
            rej('https require');
          }

          DeviceOrientationEvent.requestPermission().then(function (permissionState) {
            if (permissionState === 'granted') {
              _this.isSuppord = true;
              res();
            } else {
              _this.isSuppord = false;
              rej('user deined');
            }
          })["catch"](console.error);
        } else {
          _this.isSuppord = true;
          res();
        }
      });
    }
  }, {
    key: "call",
    value: function call(e) {
      if (!this.disable) return;
      var alpha;

      if (typeof e.webkitCompassHeading !== 'undefined') {
        alpha = e.webkitCompassHeading;
        if (typeof window.orientation !== 'undefined') alpha += window.orientation;
      } else alpha = e.alpha;

      var gamma = e.gamma,
          beta = e.beta;
      this.callback({
        alpha: alpha,
        beta: beta,
        gamma: gamma
      });
    }
    /**
     * add listener
     * @param {function} callback
     */

  }, {
    key: "addEventListener",
    value: function addEventListener(callback) {
      var on = function on(_ref) {
        var alpha = _ref.alpha,
            beta = _ref.beta,
            gamma = _ref.gamma;
        console.log(alpha, beta, gamma);
      };

      this.callback = callback || on;
      this.f = this.call.bind(this);
      window.addEventListener('deviceorientation', this.f);
    }
  }, {
    key: "destory",
    value: function destory() {
      window.removeEventListener('deviceorientation', this.f);
    }
  }, {
    key: "error",
    value: function error(e) {
      console.log('orientation not support!');
    }
  }, {
    key: "get",
    value: function get() {
      var m = new _mobileDetect["default"](userAgent);
      if (m.tablet() || m.mobile()) return 'mobile';
      return 'desktop';
    }
  }]);
  return Orientation;
}();

exports["default"] = Orientation;