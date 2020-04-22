import React, { useState } from 'react';
import { Input } from 'reactstrap';

export default props => {
  const [keycode, setKeycode] = useState();
  const { value = '', action = console.log, limit = 100, ...rest } = props;

  return <>
  <Input
    value={value}
    onKeyDown={e => setKeycode(e.keyCode)}
    onChange={e => (value.length < limit ? true : [46, 8].includes(keycode)) && action(e.target.value)}
    {...rest}
  />
  <small
    style={{ color: '#626262'}}
    className={`input-char-count ${
      value.length < parseInt(limit * 0.9)
        ? ""
        : value.length < limit ? "bg-warning" : "bg-danger"
    }`}
  >
    {`${value.length}/${limit}`}
  </small>
  </>
};
