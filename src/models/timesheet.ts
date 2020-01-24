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
        const data = await this.page.evaluate(dayNumber => {
          const hours: string[][] = [];
          // The rows with the times on the table
          const timeRows = document
            .querySelector(`#TimesheetContainer #Timesheet > tbody > #TimeSheet_${dayNumber - 1}_`)!
            .querySelectorAll('table .pay-type-description');

          // Return the time by row using the passed index
          const getTime = function(element: Element, index: number) {
            return element.children[index]!.children[0]!.textContent!.trim();
          };

          // Get clockIn and clock out by row, number 2 is for clock in in the row
          // and 3 for clock out
          if (timeRows && timeRows.length > 0) {
            timeRows.forEach(row => {
              hours.push([getTime(row, 2), getTime(row, 3)]);
            });
          }

          return {
            timeRows: hours,
            totalHours: document
              .querySelector('#GroupTotals')!
              .querySelector('tbody td')!
              .firstChild!.textContent!.trim()
              .replace(' hrs', ''),
          };
        }, new Date().getDay());

        this.today = new Today(data.timeRows[0][0], data.timeRows[0][1]);

        // When there is more than 1 clock in/out in the day the times are added
        // To the today object
        if (data.timeRows.length > 1) {
          for (let i = 1; i < data.timeRows.length; i++) {
            this.today.setTimeRow(data.timeRows[i][0], data.timeRows[i][1]);
          }
        }

        this.totalHours = Number(data.totalHours) + this.today.getCurrentHours();
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}
