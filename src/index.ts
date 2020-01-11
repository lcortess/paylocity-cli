#!/usr/bin/env node

import * as chalk from 'chalk';
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
    .option('-f --config-hour', 'Allows to config the hour format')
    .version(pkg.version);

  program.on('--help', function() {
    console.log(`
      ${chalk.bold('How to get the fingerprint?')}
      
      Go to ${chalk.bold(
        'https://access.paylocity.com/',
      )} make sure the checkbox that says "remember this device" is checked and do login as normal.

      After that do logout and go to the login page again, open a developer console and do: 
      "${chalk.italic("document.getElementById('PaylocityFingerprintData').value")}". 
      Copy the result but remember ${chalk.bold('TO NOT')} copy the first and last quotes
    `);
  });

  program.parse(process.argv);

  if (program.setup) return cli.showSetup();
  if (program.configHour) return cli.doHourConfig();
  if (program.configPath) return cli.showConfigPath();

  // Default option is to show the Pace table
  return cli.showPace();
})();
