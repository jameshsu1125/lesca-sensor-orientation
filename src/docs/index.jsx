import React from 'react';
import { render } from 'react-dom';
import Orientation from './../lib/index';

import './styles.css';

function require_permission() {
	Orientation.init(
		() => {
			console.log('permission granted');
			Orientation.addEvent((LR, FB, Dir) => {
				console.log(LR, FB, Dir);
			});
		},
		() => {
			console.log('permission deined');
		}
	);
}

function Demo() {
	return (
		<>
			<button onClick={require_permission}>require permission</button>
		</>
	);
}

render(<Demo />, document.getElementById('app'));
