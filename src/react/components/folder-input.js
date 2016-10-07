// @flow
import React from 'react';
import type {Folder} from '../types';

type Props = {
  folder: Folder,
  onChange: Function,
};

export default (props: Props) => (
  <div>
    <input
      type="input"
      onChange={props.onChange}
      value={props.folder}/>
  </div>
);
