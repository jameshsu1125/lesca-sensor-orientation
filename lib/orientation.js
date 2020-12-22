"use strict";

module.exports = {
  disable: true,
  isSuppord: false,
  init: function init(granted) {
    var _this = this;

    var deined = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

    if (this.get() === 'desktop') {
      //desktop escap all
      this.error();
      return false;
    } // IOS 14+ need permission request.


    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      // ISO need SSL also.
      if (window.location.protocol.indexOf('https') < 0) {
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
  },
  addEvent: function addEvent(callback) {
    this.f = this.call.bind(this);
    this.cb = callback || this.on;
    window.addEventListener('deviceorientation', this.f);
  },
  call: function call(e) {
    if (!this.disable) return;
    var d, h;

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
    this.cb(g, b, a);
  },
  error: function error() {
    console.log('orientation not support!');
  },
  on: function on(LR, FB, Dir) {
    console.log(LR, FB, Dir);
  },
  destory: function destory() {
    window.removeEventListener('deviceorientation', this.f);
  },
  get: function get() {
    var MobileDetect = require('mobile-detect'),
        m = new MobileDetect(window.navigator.userAgent);

    if (m.tablet()) return 'mobile';else if (m.mobile()) return 'mobile';else return 'desktop';
  }
};