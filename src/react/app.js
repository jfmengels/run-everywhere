// @flow
// import execa from 'execa';
import {exec} from 'child_process';
import React from 'react';
import {ipcRenderer as ipc} from 'electron';
import RunButton from './components/run-button';
import FolderInputList from './components/folder-input-list';
import CommandList from './components/command-list';
import type {CommandRun, CommandState, Folder} from './types';

type State = {|
  folders: Folder[],
  commands: CommandRun[],
|};

export default React.createClass({
  componentDidMount() {
    ipc.on('selected-directory', this.onFolderSelect);
  },
  
  getInitialState(): State {
    return {
      folders: [
        process.cwd(),
        '',
      ],
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

  onFolderChange(index: number, value: string) {
    const folders = [...this.state.folders];
    folders[index] = value;
    if (folders[folders.length - 1]) {
      folders.push('');
    }
    this.setState({...this.state, folders});
  },

  onFolderSelectRequest() {
    ipc.send('open-file-dialog');
  },

  onFolderSelect(event: any, path: string|string[]) {
    const folder = typeof path === 'string' ? path : path[0];
    this.onFolderChange(0, folder);
  },

  setCommandAs(index: number, commandState: CommandState) {
    const commands = [...this.state.commands];
    commands[index] = {...commands[index], state: commandState};
    this.setState({...this.state, commands});
  },

  runCommand(folderIndex: number, commandIndex: number) {
    const folder: Folder = this.state.folders.filter(Boolean)[folderIndex];
    if (!folder) {
      console.log('All run!');
      return;
    }
    const commandItem: CommandRun = this.state.commands.filter(c => c.command)[commandIndex];
    if (!commandItem) {
      return this.runCommand(folderIndex + 1, 0);
    }
    this.setCommandAs(commandIndex, 'running');
    exec(commandItem.command, {cwd: folder}, (error, stdout, stderr) => {
      if (error) {
        this.setCommandAs(commandIndex, 'failed');
        console.error(stderr);
        return console.error('Aborting', error);
      }
      this.setCommandAs(commandIndex, 'succeeded');
      console.log(stdout);
      this.runCommand(folderIndex, commandIndex + 1);
    });
  },

  render() {
    return (
      <div>
        <RunButton
          onClick={() => this.runCommand(0, 0)}/>
        <button
          onClick={this.onFolderSelectRequest}>
          Select folder
        </button>
        <FolderInputList
          onChange={this.onFolderChange}
          folders={this.state.folders} />
        <CommandList
          commands={this.state.commands}
          onChange={this.onCommandChange}/>
      </div>
    );
  },
});
