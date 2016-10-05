// @flow
// import execa from 'execa';
import {exec} from 'child_process';
import React from 'react';
import {ipcRenderer as ipc} from 'electron';
import CommandList from './components/command-list';
import RunButton from './components/run-button';
import type {CommandRun, CommandState} from './types';

type State = {|
  cwd: string,
  commands: CommandRun[],
|};

export default React.createClass({
  componentDidMount() {
    ipc.on('selected-directory', (event, path) => {
      this.setState({...this.state, cwd: path});
    });
  },
  getInitialState(): State {
    return {
      cwd: process.cwd(),
      commands: [
        {command: 'ls', state: 'pending'},
        {command: '', state: 'pending'},
      ],
    };
  },

  onCommandChange(index: number, value: string) {
    const commands = [...this.state.commands];
    commands[index] = {...commands[index], command: value};
    if (commands[commands.length - 1].command) {
      commands.push({command: '', state: 'pending'});
    }
    this.setState({...this.state, commands});
  },

  onCwdChange(event: any) {
    this.setState({...this.state, cwd: event.target.value});
  },

  onRun() {
    this.runCommand(0);
  },

  onFolderSelect() {
    ipc.send('open-file-dialog');
  },

  setCommandAs(index: number, commandState: CommandState) {
    const commands = [...this.state.commands];
    commands[index] = {...commands[index], state: commandState};
    this.setState({...this.state, commands});
  },

  runCommand(index: number) {
    const commandItem: CommandRun = this.state.commands.filter(c => c.command)[index];
    if (!commandItem) {
      console.log('All run!');
      return;
    }
    this.setCommandAs(index, 'running');
    exec(commandItem.command, {cwd: this.state.cwd}, (error, stdout, stderr) => {
      if (error) {
        this.setCommandAs(index, 'failed');
        console.error(stderr);
        return console.error('Aborting', error);
      }
      this.setCommandAs(index, 'succeeded');
      console.log(stdout);
      this.runCommand(index + 1);
    });
  },

  render() {
    return (
      <div>
        <RunButton onClick={this.onRun}/>
        <button onClick={this.onFolderSelect}>Select folder</button>
        <label htmlFor="cwd"/>
        <input id="#cwd" type="input" onChange={this.onCwdChange} value={this.state.cwd}/>
        <CommandList commands={this.state.commands} onChange={this.onCommandChange}/>
      </div>
    );
  },
});
