#! /usr/bin/env node

import meow from 'meow';
import {init} from './commands/init';

const cli = meow({
  help: `
    Usage
      $ gatekeep [command] [input]
    
    Commands
      init
        Initialize a new, default Gatefile
        Options:
          --es6: Output new Gatefile for an ES6 project

    Examples:
    $ gatekeep init
`
});

const input = cli.input || [];
const flags = cli.flags || {};

if (!input[0]) {
  console.log(cli.help);
  process.exit(1); // eslint-disable-line
}

switch (input[0].toLowerCase()) { // command
case 'init':
  {
    init(input.slice(1), flags); //eslint-disable-line
    break;
  }
default:
  {
    console.log(cli.help);
  }
}
