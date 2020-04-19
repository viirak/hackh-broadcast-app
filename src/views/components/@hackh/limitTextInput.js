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
    className={`counter-value float-right ${
      value.length > parseInt(limit * 0.9) ? "bg-danger" : ""
    }`}
  >
    {`${value.length}/${limit}`}
  </small>
  </>
};
