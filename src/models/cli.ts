import { Pace } from '../views/Pace';

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
    console.log('showing setup');
  }
}
