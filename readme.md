[![dev by JamesHsu](https://img.shields.io/badge/Dev%20by-Jameshsu1125-green)](https://github.com/jameshsu1125/) [![made in Taiwan](https://img.shields.io/badge/Made%20in-Taiwan-orange)](https://github.com/jameshsu1125/)

# Installation

```sh
$ npm install lesca-sensor-orientation --save
```

# Usage

```javascript
import Orientation from 'lesca-sensor-orientation';

const orientation = new Orientation();
function require_permission() {
	orientation.init(
		() => {
			console.log('permission granted');
			orientation.addListener((LR, FB, Dir) => {
				console.log(LR, FB, Dir);
			});
		},
		() => {
			console.log('permission deined');
		}
	);
}
<button onClick={require_permission}>require permission</button>;
```

# Methods

| method                | options  |         description          | default |
| :-------------------- | :------: | :--------------------------: | ------: |
| init(granted, deined) | granted  | call when permission granted |         |
|                       |  deined  | call when permission deined  |         |
| addListener(callback) | callback |  get 3 axis value each time  |         |
| destory()             |          |         remove event         |         |

# Properties

| Properties |  type   |         description          | default |
| :--------- | :-----: | :--------------------------: | ------: |
| disable    | boolean | stop / continue event listen |    true |
| isSuppord  | boolean | permission granted or deined |   false |
