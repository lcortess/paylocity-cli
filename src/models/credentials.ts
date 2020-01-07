import * as os from 'os';
import { config } from 'dotenv';

config({ path: `${os.homedir()}/.paylocity` });

export class Credentials {
  get password(): string {
    return process.env.PAYLOCITY_PASSWORD || '';
  }

  get username(): string {
    return process.env.PAYLOCITY_USER || '';
  }

  get companyId(): string {
    return process.env.PAYLOCITY_COMPANY || '';
  }

  get fingerprint(): string {
    return process.env.PAYLOCITY_FINGERPRINT || '';
  }
}
