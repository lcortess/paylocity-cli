import * as puppeteer from 'puppeteer';
import { Configuration } from './configuration';

export class Login {
  private config: Configuration;
  private loginUri = 'https://access.paylocity.com';

  constructor() {
    this.config = new Configuration();
  }

  /**
   * Loads the login page and does login
   */
  public loginPage(): Promise<{
    page: puppeteer.Page;
    browser: puppeteer.Browser;
  }> {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.initPage();
        const page = data.page;
        await page.goto(this.loginUri);
        await page.waitFor('#CompanyId');
        await this.setLoginValues(page);
        await page.click('button[type="submit"]');
        await page.waitForSelector('.unav-main-menu-title');
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Initializes the puppeteer browser page
   */
  private initPage(): Promise<{
    page: puppeteer.Page;
    browser: puppeteer.Browser;
  }> {
    return new Promise(async (resolve, reject) => {
      try {
        const browser = await puppeteer.launch({
          args: ['--no-sandbox', '--headless', '--disable-gpu', '--window-size=1920x1080'],
        });
        const page = await browser.newPage();
        await page.setUserAgent(
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36',
        );

        resolve({
          page: page,
          browser: browser,
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Validates Elements and set login credentials
   */
  private setLoginValues(page: puppeteer.Page): Promise<void> {
    return page.evaluate(
      (company, user, password, fingerprint) => {
        // If validations prevent typescript errors for possible null value
        const u = <any>document.querySelector('#Username');
        if (u) u.value = user;

        const c = <any>document.querySelector('#CompanyId');
        if (c) c.value = company;

        const p = <any>document.querySelector('#Password');
        if (p) p.value = password;

        const f = <any>document.querySelector('#PaylocityFingerprintData');
        if (f) f.value = fingerprint;
      },
      this.config.companyId,
      this.config.username,
      this.config.password,
      this.config.fingerprint,
    );
  }
}
