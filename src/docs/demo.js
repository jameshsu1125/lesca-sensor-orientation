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
		motion.disable = !motion.disable;
		setMessage(motion.disable ? 'disable' : 'enable');
	};

	useEffect(() => {
		// require permission
		if (state) {
			motion.addListener((e) => {
				// get user shaking gravity value
				setMessage(`detect motion = ${JSON.stringify(e)}`);
			});
		}
		return () => {
			motion.destory();
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