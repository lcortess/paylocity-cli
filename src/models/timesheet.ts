import * as puppeteer from 'puppeteer';
import { Login } from './login';

export class Timesheet {
  public clockIn: string = '';
  public totalHours: string = '';

  private login: Login;
  private timesheetUri: string;
  private page: puppeteer.Page | undefined;
  private browser: puppeteer.Browser | undefined;

  constructor() {
    this.login = new Login();
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
    if (!this.browser) return Promise.reject('Browser does not exist');
    return this.browser.close();
  }

  private loadHours(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      if (!this.page) return reject('Page does not exist');

      try {
        const data = await this.page.evaluate(() => {
          const today = new Date();

          return {
            clockIn: document
              .querySelector(`#TimesheetContainer #Timesheet > tbody > #TimeSheet_${today.getDay() - 1}_`)!
              .querySelector('table tr')!
              .children[2]!.children[0]!.textContent!.trim()
              .replace(' AM', ''),
            totalHours: document
              .querySelector('#GroupTotals')!
              .querySelector('tbody td')!
              .firstChild!.textContent!.trim()
              .replace(' hrs', ''),
          };
        });

        this.clockIn = data.clockIn;
        this.totalHours = data.totalHours;
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
}
