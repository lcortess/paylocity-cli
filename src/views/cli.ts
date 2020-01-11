import { Pace } from './Pace';
import * as chalk from 'chalk';
import { Config } from './config';

export class CLI {
  constructor() {}

  /**
   * Logs Pace table
   */
  public showPace(): void {
    const pace: Pace = new Pace();
    pace
      .loadTable()
      .then(table => {
        console.log(table.getTable());
      })
      .catch(error => {
        console.log(error);
      });
  }

  /**
   * Shows interactive shell to setup account
   */
  public showSetup(): void {
    const config = new Config();
    config
      .doSetup()
      .then(() => {
        console.log(chalk.green('Account configured successfully!'));
      })
      .catch(error => {
        console.log(error);
      });
  }

  /**
   * Shows the path to the config file
   */
  public showConfigPath(): void {
    const config = new Config();
    console.log(`Config File: ${config.getConfigPath()}`);
  }
}
