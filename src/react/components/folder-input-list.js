// @flow
import React from 'react';
import FolderInput from './folder-input';
import type {Folder} from '../types';

type Props = {
  folders: Folder[],
  onChange: (index: number, value: string) => void
};

export default (props: Props) => (
  <div>
    {props.folders.map((folder, index) =>
      <FolderInput
        key={index}
        folder={folder}
        onChange={event => props.onChange(index, event.target.value)}/>
    )}
  </div>
);
