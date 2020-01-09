import * as moment from 'moment';
import { Hour } from './hour';

export class Today {
  private clockIn: moment.Moment;

  constructor(clockIn: string) {
    this.clockIn = moment();
    const hour = new Hour(clockIn);
    this.clockIn.hours(hour.getHours());
    this.clockIn.minutes(hour.getMinutes());
  }

  public getClockInHour(): string {
    return this.clockIn.format('HH:mm');
  }
}
