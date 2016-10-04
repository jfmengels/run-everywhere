// @flow
import React from 'react';

type Props = {
  command: string,
  onChange: Function,
};

export default (props: Props) => (
  <div>
    <label>Command: </label>
    <input type="input" onChange={props.onChange} value={props.command}/>
  </div>
);
