import { Pace } from './Pace';
import * as chalk from 'chalk';
import { Config } from './config';
import { Timesheet } from '../models/timesheet';

export class CLI {
  constructor() {}

  /**
   * Logs Pace table
   */
  public showPace(): void {
    const time: Timesheet = new Timesheet();
    time
      .start()
      .then(() => {
        time.closePage();
        const pace: Pace = new Pace(time.totalHours, time.today.getCurrentHours());
        console.log(pace.getTable());
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

  /**
   * Shows interactive shell to setup hour format
   */
  public doHourConfig(): void {
    const config = new Config();
    config
      .doConfigHour()
      .then(() => {
        console.log(chalk.green('Hour format configured successfully!'));
      })
      .catch(error => {
        console.log(error);
      });
  }
}
