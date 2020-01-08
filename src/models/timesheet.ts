import * as puppeteer from 'puppeteer';
import { Login } from './login';
import { Today } from './today';

export class Timesheet {
  public today: Today;
  public totalHours: number = 0;

  private login: Login;
  private timesheetUri: string;
  private page: puppeteer.Page | undefined;
  private browser: puppeteer.Browser | undefined;

  constructor() {
    this.login = new Login();
    this.today = new Today('00:00 AM');
    this.timesheetUri = 'https://webtime2.paylocity.com/WebTime/Employee/Timesheet';
  }

  /**
   * Loads the timesheet page
   */
  public loadPage(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.login.loginPage();
        this.page = data.page;
        this.browser = data.browser;
        await this.page.goto(this.timesheetUri);
        await this.page.waitForSelector('#GroupTotals');
        await this.loadHours();
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Closes browser instance
   */
  public closePage(): Promise<void> {
    if (!this.browser) {
      return Promise.reject('Browser does not exist');
    }
    return this.browser.close();
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
        this.totalHours = Number(data.totalHours);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}
