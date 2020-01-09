import * as puppeteer from 'puppeteer';
import { Login } from './login';

export class WebPage {
  private login: Login;
  protected uri: string;
  protected waitFor: string;
  protected page: puppeteer.Page | undefined;
  protected browser: puppeteer.Browser | undefined;

  constructor(uri: string, waitFor: string) {
    this.uri = uri;
    this.waitFor = waitFor;
    this.login = new Login();
  }

  /**
   * Loads the page
   */
  protected loadPage(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.login.loginPage();
        this.page = data.page;
        this.browser = data.browser;
        await this.page.goto(this.uri);
        await this.page.waitForSelector(this.waitFor);
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
}
