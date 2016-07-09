#! /usr/bin/env node

import meow from 'meow';
import gatekeep from './lib/';

const cli = meow({
  help: [
    'Usage',
    '  $ gatekeep [input]',
    '',
    'Options',
    '  --foo  Lorem ipsum. [Default: false]',
    '',
    'Examples',
    '  $ gatekeep',
    '  unicorns & rainbows',
    '  $ gatekeep ponies',
    '  ponies & rainbows'
  ]
});

const input = cli.input || [];
const flags = cli.flags || {};

console.log(cli.help); // eslint-disable-line

gatekeep(input, flags);
