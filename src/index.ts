#!/usr/bin/env node

import { CLI } from './views/cli';
import * as commander from 'commander';
const pkg = require('../package.json');

(() => {
  const cli = new CLI();
  const program = new commander.Command();

  program
    .name('Paylocity CLI')
    .description(pkg.description)
    .option('-s --setup', 'Shows interactive questions to config account.')
    .option('-p --config-path', 'Shows path to the config file.')
    .version(pkg.version)
    .parse(process.argv);

  if (program.setup) return cli.showSetup();
  if (program.configPath) return cli.showConfigPath();

  // Default option is to show the Pace table
  return cli.showPace();
})();
