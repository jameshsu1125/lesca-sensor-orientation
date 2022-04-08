import { Button, ButtonGroup } from '@mui/material';
import { useEffect, useState, useMemo } from 'react';
import Orientation from '../../lib/';
import Qrcode from 'lesca-react-qrcode';

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

  useEffect(() => {
    // require permission
    if (state) {
      orientation.addEventListener((e) => {
        // get user shaking gravity value
        setMessage(`detect orientation = ${JSON.stringify(e)}`);
      });
    }
    return () => {
      orientation.destory();
    };
  }, [state]);

  return (
    <div className='Demo'>
      <h2>Demo</h2>
      <h4>test on mobile</h4>
      <Qrcode content={window.location.href} size='300' />
      <pre>
        <code>{message}</code>
      </pre>
      <ButtonGroup variant='contained'>
        <Button
          onClick={() => {
            require_permission();
          }}
        >
          permission require
        </Button>
      </ButtonGroup>
    </div>
  );
};
export default Demo;
