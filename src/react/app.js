// @flow
import React from 'react';
import CommandList from './components/commandList';

type State = {|
  commands: string[]
|};

export default React.createClass({
  getInitialState(): State {
    return {
      commands: ['npm i', 'npm t'],
    };
  },
  onChange(index: number, value: string) {
    const commands = [...this.state.commands];
    commands[index] = value;
    console.log(commands);
    this.setState({...this.state, commands});
  },

  render() {
    return (
      <div>
        <h1>HERE WE GO</h1>
        <CommandList commands={this.state.commands} onChange={this.onChange}/>
      </div>
    );
  },
});
