import { Today } from './today';
import { WebPage } from './web-page';

export class Timesheet extends WebPage {
  public today: Today;
  public totalHours: number = 0;

  constructor() {
    super('https://webtime2.paylocity.com/WebTime/Employee/Timesheet', '#GroupTotals');

    this.today = new Today('01:00 AM');
  }

  /**
   * Starts the page and load the hours into the class
   */
  public start(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await this.loadPage();
        await this.loadHours();
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Load global hours from timesheet page
   */
  private loadHours(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (!this.page) {
        return reject('Page does not exist');
      }

      try {
        const data = await this.page.evaluate(() => {
          const today = new Date();

          return {
            clockIn: document
              .querySelector(`#TimesheetContainer #Timesheet > tbody > #TimeSheet_${today.getDay() - 1}_`)!
              .querySelector('table tr')!
              .children[2]!.children[0]!.textContent!.trim(),
            totalHours: document
              .querySelector('#GroupTotals')!
              .querySelector('tbody td')!
              .firstChild!.textContent!.trim()
              .replace(' hrs', ''),
          };
        });

        this.today = new Today(data.clockIn);
        this.totalHours = Number(data.totalHours) + this.today.getCurrentHours();
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}
