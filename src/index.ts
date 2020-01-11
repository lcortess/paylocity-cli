#!/usr/bin/env node

import { CLI } from './models/cli';
import * as commander from 'commander';
const pkg = require('../package.json');

(() => {
  const cli = new CLI();
  const program = new commander.Command();

  program
    .name('Paylocity CLI')
    .description(pkg.description)
    .option('-s --setup', 'Shows interactive questions to config account')
    .version(pkg.version);

  program.parse(process.argv);

  if (program.setup) return cli.showSetup();

  return cli.showPace();
})();
