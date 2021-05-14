"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mobileDetect = _interopRequireDefault(require("mobile-detect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _window = window,
    navigator = _window.navigator,
    location = _window.location;
var userAgent = navigator.userAgent;
var protocol = location.protocol;

var Orientation = /*#__PURE__*/function () {
  function Orientation() {
    _classCallCheck(this, Orientation);

    this.disable = true;
    this.isSuppord = false;
  }
  /**
   * initial on click event
   * @param {function} granted permission granted function
   * @param {function} deined permission deined function
   * @returns
   */


  _createClass(Orientation, [{
    key: "init",
    value: function init(granted) {
      var _this = this;

      var deined = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : void 0;

      //desktop escap all
      if (this.get() === 'desktop') {
        this.error();
        return false;
      } // IOS 14+ need permission request.


      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        // ISO need SSL also.
        if (protocol.indexOf('https') < 0) {
          this.error();
          return false;
        }

        DeviceOrientationEvent.requestPermission().then(function (permissionState) {
          if (permissionState === 'granted') {
            _this.isSuppord = true;
            granted();
          } else {
            _this.isSuppord = false;
            deined();
          }
        })["catch"](console.error);
      } else {
        this.isSuppord = true;
        granted();
      }
    }
  }, {
    key: "call",
    value: function call(e) {
      if (!this.disable) return;
      var d, t, h;

      if (typeof e.webkitCompassHeading !== 'undefined') {
        d = e.webkitCompassHeading;
        if (typeof window.orientation !== 'undefined') d += window.orientation;
      } else {
        d = e.alpha;
      }

      t = Math.round(d);
      h = Math.round(d);
      var g, b, a;
      g = Math.round(e.gamma);
      b = Math.round(e.beta);
      a = h;
      this.callback(g, b, a);
    }
    /**
     * add listener
     * @param {function} callback
     */

  }, {
    key: "addListener",
    value: function addListener(callback) {
      var on = function on(LR, FB, Dir) {
        console.log(LR, FB, Dir);
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