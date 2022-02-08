import MobileDetect from 'mobile-detect';

const { navigator, location } = window;
const { userAgent } = navigator;
const { protocol } = location;

export default class Orientation {
	constructor() {
		this.disable = true;
		this.isSuppord = false;
	}

	/**
	 * initial on click event
	 * @param {function} granted permission granted function
	 * @param {function} deined permission deined function
	 * @returns
	 */
	permission() {
		return new Promise((res, rej) => {
			//desktop escap all
			if (this.get() === 'desktop') {
				rej('desktop is not support');
			}

			// IOS 14+ need permission request.
			if (typeof DeviceOrientationEvent.requestPermission === 'function') {
				// ISO need SSL also.
				if (protocol.indexOf('https') < 0) {
					rej('https require');
				}

				DeviceOrientationEvent.requestPermission()
					.then((permissionState) => {
						if (permissionState === 'granted') {
							this.isSuppord = true;
							res();
						} else {
							this.isSuppord = false;
							rej('user deined');
						}
					})
					.catch(console.error);
			} else {
				this.isSuppord = true;
				res();
			}
		});
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

	/**
	 * add listener
	 * @param {function} callback
	 */
	addEventListener(callback) {
		const on = (LR, FB, Dir) => {
			console.log(LR, FB, Dir);
		};
		this.callback = callback || on;
		this.f = this.call.bind(this);
		window.addEventListener('deviceorientation', this.f);
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
