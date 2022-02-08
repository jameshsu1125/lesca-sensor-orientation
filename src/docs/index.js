import { render } from 'react-dom';
import { Navation, Code } from './components';
import Demo from './demo';
import Qrcode from 'lesca-react-qrcode';
import './styles.less';

const homepage = 'https://github.com/jameshsu1125/lesca-sensor-orientation';
const name = 'lesca-sensor-orientation';
const description =
	'The mobile device orientation. include request permission and return 3 axis value.';

const code1 = `import Orientation from 'lesca-sensor-orientation';
const orientation = new Orientation();
`;

const code2 = `const requirePermission = () => {
	// initialize motion event
	orientation
		.permission()
		.then(() => {
			// permission granted
		})
		.catch(() => {
			// permission deined
		});
}
...
return <button onClick={require_permission}>permission require</button>
`;

const code3 = `orientation.addEventListener((e) => {
	// get user shaking gravity value.
	alert(e)
});`;

const code4 = `import { useEffect, useState, useMemo } from 'react';
import Orientation from 'lesca-sensor-orientation';

const Demo = () => {
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
		// waitting for permission
		if (state) {
			orientation.addEventListener((value) => {
				// get user shaking gravity value
				alert(value);
			});
		}
		return () => {
			motion.destory();
		};
	}, [state]);

	return <button onClick={require_permission}>permission require</button>;
};
export default Demo;`;

const Page = () => {
	return (
		<>
			<Navation />
			<div className='content'>
				<div>
					<h1>{name}</h1>
					<figcaption>{description}</figcaption>
				</div>
				<div>
					<h2>install</h2>
					<Code code={`npm install ${name} --save`} theme='markup' />
				</div>
				<div>
					<h2>test on mobile</h2>
					<Qrcode content={window.location.href} size='300' />
				</div>
				<div>
					<h2>new Orientation class</h2>
					<Code code={code1} />
				</div>
				<div>
					<h2>add permission function on click event</h2>
					<Code code={code2} />
				</div>
				<div>
					<h2>add listener</h2>
					<Code code={code3} />
				</div>
				<div>
					<Demo />
				</div>
				<div>
					<h2>use Reack hooks</h2>
					<Code code={code4} />
				</div>
				<div>
					<h2>Usage</h2>
					<a href={homepage}>Documentation</a>
				</div>
			</div>
		</>
	);
};

render(<Page />, document.getElementById('app'));
