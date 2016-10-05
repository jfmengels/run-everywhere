// @flow
import React from 'react';
import Command from './command';
import type {CommandRun} from '../types';

type Props = {
  commands: CommandRun[],
  onChange: (index: number, value: string) => void
};

export default (props: Props) => (
  <div>
    {props.commands.map((command, index) =>
      <Command
        key={index}
        command={command}
        onChange={event => props.onChange(index, event.target.value)}/>
    )}
  </div>
);
