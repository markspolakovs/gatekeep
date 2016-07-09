#! /usr/bin/env node
'use strict';

var _meow = require('meow');

var _meow2 = _interopRequireDefault(_meow);

var _init = require('./commands/init');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cli = (0, _meow2.default)({
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
  throw cli.help;
}

switch (input[0].toLowerCase()) {// command
  case 'init':
    {
      (0, _init.init)(input.slice(1), flags); //eslint-disable-line
      break;
    }
  default:
    {
      console.log(cli.help);
    }
}