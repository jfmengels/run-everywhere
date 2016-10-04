// @flow
import React from 'react';
import type {CommandRun} from '../types';

type Props = {
  command: CommandRun,
  onChange: Function,
};

export default (props: Props) => (
  <div>
    <label>Command ({props.command.state}): </label>
    <input type="input" onChange={props.onChange} value={props.command.command}/>
  </div>
);
