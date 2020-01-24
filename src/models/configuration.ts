const pkg = require('../../package.json');
import * as Configstore from 'configstore';

export class Configuration {
  private config: Configstore;

  constructor() {
    this.config = new Configstore(pkg.name, {});
  }

  get password(): string {
    return this.decode(this.config.get('password'));
  }

  get username(): string {
    return this.decode(this.config.get('username'));
  }

  get companyId(): string {
    return this.decode(this.config.get('companyId'));
  }

  get fingerprint(): string {
    return this.decode(this.config.get('fingerprint'));
  }

  get hourFormat(): string {
    return this.decode(this.config.get('hourFormat'));
  }

  get path(): string {
    return this.config.path;
  }

  set password(value: string) {
    this.config.set('password', this.encode(value));
  }

  set username(value: string) {
    this.config.set('username', this.encode(value));
  }

  set companyId(value: string) {
    this.config.set('companyId', this.encode(value));
  }

  set fingerprint(value: string) {
    this.config.set('fingerprint', this.encode(value));
  }

  set hourFormat(value: string) {
    this.config.set('hourFormat', this.encode(value));
  }

  private encode(value: string): string {
    return Buffer.from(value, 'ascii').toString('base64');
  }

  private decode(value: string = ''): string {
    return Buffer.from(value, 'base64').toString('ascii');
  }
}
