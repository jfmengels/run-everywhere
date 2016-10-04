// @flow
import React from 'react';

type Props = {
  onClick: Function
};

export default (props: Props) => (
  <button onClick={props.onClick}>Run: </button>
);
