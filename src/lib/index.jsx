import MobileDetect from 'mobile-detect';

const { navigator, location } = window;
const { userAgent } = navigator;
const { protocol } = location;

export default class Orientation {
	constructor() {
		this.disable = true;
		this.isSuppord = false;
	}

	init(granted, deined = void 0) {
		//desktop escap all
		if (this.get() === 'desktop') {
			this.error();
			return false;
		}

		// IOS 14+ need permission request.
		if (typeof DeviceOrientationEvent.requestPermission === 'function') {
			// ISO need SSL also.
			if (protocol.indexOf('https') < 0) {
				this.error();
				return false;
			}

			DeviceOrientationEvent.requestPermission()
				.then((permissionState) => {
					if (permissionState === 'granted') {
						this.isSuppord = true;
						granted();
					} else {
						this.isSuppord = false;
						deined();
					}
				})
				.catch(console.error);
		} else {
			this.isSuppord = true;
			granted();
		}
	}

	call(e) {
		if (!this.disable) return;
		let d, t, h;
		if (typeof e.webkitCompassHeading !== 'undefined') {
			d = e.webkitCompassHeading;
			if (typeof window.orientation !== 'undefined') d += window.orientation;
		} else {
			d = e.alpha;
		}

		t = Math.round(d);
		h = Math.round(d);
		let g, b, a;
		g = Math.round(e.gamma);
		b = Math.round(e.beta);
		a = h;
		this.callback(g, b, a);
	}

	addListener(callback) {
		const on = (LR, FB, Dir) => {
			console.log(LR, FB, Dir);
		};
		this.callback = callback || on;
		window.addEventListener('deviceorientation', (e) => this.call(e));
	}

	destory() {
		window.removeEventListener('deviceorientation', this.f);
	}

	error(e) {
		console.log('orientation not support!');
	}

	get() {
		const m = new MobileDetect(userAgent);
		if (m.tablet() || m.mobile()) return 'mobile';
		return 'desktop';
	}
}
