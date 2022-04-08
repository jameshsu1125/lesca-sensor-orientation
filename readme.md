[![NPM](https://img.shields.io/badge/NPM-ba443f?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)
[![React](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/)
[![React](https://img.shields.io/badge/-ReactJs-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://zh-hant.reactjs.org/)
[![React](https://img.shields.io/badge/Less-1d365d?style=for-the-badge&logo=less&logoColor=white)](https://lesscss.org/)
[![React](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://www.w3schools.com/html/)
[![React](https://img.shields.io/badge/-CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://www.w3schools.com/css/)
[![NPM](https://img.shields.io/badge/DEV-Jameshsu1125-9cf?style=for-the-badge)](https://www.npmjs.com/~jameshsu1125)

# Why use it?

full steps for get mobile 3 axis value of mobile orientation.

See <https://developer.mozilla.org/en-US/docs/Web/Events/Detecting_device_orientation> for a demonstration!

#### [Live Demo](https://jameshsu1125.github.io/lesca-sensor-orientation/)

# Installation

```sh
npm install lesca-sensor-orientation --save
```

## Usage

As a Node module:

```JSX
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

## Development

### Methods

# Methods

| method                                    |        description         | return |
| :---------------------------------------- | :------------------------: | -----: |
| .permission()                             |    ask user permission     |   void |
| addEventListener(**callback**:_function_) | get 3 axis value each time |   void |
| .destory()                                |       destory event        |   void |

# Properties

| Properties              |         description          |         default |
| :---------------------- | :--------------------------: | --------------: |
| **disable**:_boolean_   | stop / continue event listen |            true |
| **isSuppord**:_boolean_ | permission granted or deined | (**read only**) |

### Features

- TypeScript
- maintain if necessary
