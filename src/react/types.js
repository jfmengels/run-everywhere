// @flow
export type Command = string;

export type CommandState =
  | 'pending'
  | 'running'
  | 'succeeded'
  | 'failed'
;

export type CommandRun = {
  command: Command,
  state: CommandState
};

export type Folder = string;
