[![dev by JamesHsu](https://img.shields.io/badge/Dev%20by-Jameshsu1125-green)](https://github.com/jameshsu1125/) [![made in Taiwan](https://img.shields.io/badge/Made%20in-Taiwan-orange)](https://github.com/jameshsu1125/) [![npm](https://img.shields.io/badge/npm-Jameshsu1125-red)](https://www.npmjs.com/~jameshsu1125)

# Installation

```sh
$ npm install lesca-sensor-orientation --save
```

# Usage

```javascript
import { useState, useEffect, useMemo } from 'react';
import Orientation from 'lesca-sensor-orientation';

// (1) waiting for permission => Must be user-triggered event and SSL required
// (2) add addEventListener
const Components = () => {
	const [state, setState] = useState(false);
	const orientation = useMemo(() => new Orientation(), []);

	const require_permission = () => {
		orientation
			.permission()
			.then(() => {
				// permission granted
				setState(true);
			})
			.catch(() => {
				// permission deined
			});
	};

	useEffect(() => {
		if (state) {
			orientation.addEventListener((e) => {
				alert(e);
			});
		}
		return () => {
			orientation.destory();
		};
	}, [state]);

	return <button onClick={require_permission}></button>;
};
```

# Methods

| method                     |    options     |        description         | default |
| :------------------------- | :------------: | :------------------------: | ------: |
| .permission()              | return Promise |    ask user permission     |         |
| addEventListener(callback) |    callback    | get 3 axis value each time |         |
| .destory()                 |                |       destory event        |         |

# Properties

| Properties |  type   |         description          | default |
| :--------- | :-----: | :--------------------------: | ------: |
| disable    | boolean | stop / continue event listen |    true |
| isSuppord  | boolean | permission granted or deined |   false |
