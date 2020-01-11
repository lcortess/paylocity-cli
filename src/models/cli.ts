import * as chalk from 'chalk';
import { Pace } from '../views/Pace';
import { Config } from '../views/config';

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
}
