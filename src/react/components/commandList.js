// @flow
import React from 'react';
import Command from './command';

type Props = {
  commands: string[],
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
