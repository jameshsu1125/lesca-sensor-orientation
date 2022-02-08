import { useEffect, useState, useMemo } from 'react';
import Orientation from '../lib';

const Demo = () => {
	const [state, setState] = useState(false);
	const [message, setMessage] = useState('waitting for permission...');
	const orientation = useMemo(() => new Orientation(), []);

	const require_permission = () => {
		orientation
			.permission()
			.then(() => {
				// permission granted
				setMessage('permission granted');
				setState(true);
			})
			.catch((e) => {
				// permission deined
				console.log(e);
				setMessage('permission deined');
			});
	};

	const disable_switch = () => {
		orientation.disable = !orientation.disable;
		setMessage(orientation.disable ? 'disable' : 'enable');
	};

	useEffect(() => {
		// require permission
		if (state) {
			orientation.addEventListener((e) => {
				console.log(e);
				// get user shaking gravity value
				setMessage(`detect orientation = ${JSON.stringify(e)}`);
			});
		}
		return () => {
			orientation.destory();
		};
	}, [state]);

	return (
		<>
			<pre>
				<code>{message}</code>
			</pre>

			<button onClick={require_permission}>permission require</button>
			{state && (
				<div>
					<button onClick={disable_switch}>permission disable switch</button>
				</div>
			)}
		</>
	);
};
export default Demo;
