import * as moment from 'moment';
import { Hour } from './hour';

export class Today {
  private currentHours: number;
  private clockIn: moment.Moment;
  private date: Date = new Date();

  constructor(clockIn: string) {
    this.clockIn = moment();
    this.setClockInHour(clockIn);
    this.currentHours = this.getHoursToday(+this.date, +this.clockIn.toDate());
  }

  public getClockInHour(): string {
    return this.clockIn.format('HH:mm');
  }

  public getCurrentHours(): number {
    return this.currentHours;
  }

  private setClockInHour(clockIn: string) {
    const hour = new Hour(clockIn);
    this.clockIn.hours(hour.getHours());
    this.clockIn.minutes(hour.getMinutes());
  }

  private getHoursToday(now: number, clockIn: number): number {
    return Math.abs(now - clockIn) / 36e5;
  }
}
