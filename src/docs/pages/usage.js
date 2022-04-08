import { Button, ButtonGroup } from '@mui/material';
import { useEffect } from 'react';
import Code from '../components/code';
import { name } from '../config';

const codes = [
  {
    title: '1. Installation',
    code: `npm install ${name} --save`,
    type: 'text',
  },
  {
    title: '2. require permission',
    code: `const requirePermission = () => {
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
return <button onClick={require_permission}>permission require</button>`,
    type: 'js',
  },
  {
    title: '3. add event listener',
    code: `orientation.addEventListener((e) => {
  // get user shaking gravity value.
  alert(e)
});`,
    type: 'js',
  },
  {
    title: 'full code demonstration[react hook]',
    code: `import { useEffect, useState, useMemo } from 'react';
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
export default Demo;`,
    type: 'js',
  },
];

const Usage = () => {
  useEffect(() => {}, []);
  return (
    <div className='Usage'>
      <h2>Usage</h2>
      {codes.map((e) => (
        <div key={e.title}>
          <h3>{e.title}</h3>
          <Code code={e.code} theme={e.type} />
        </div>
      ))}
    </div>
  );
};
export default Usage;
