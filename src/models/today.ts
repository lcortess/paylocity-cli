import * as moment from 'moment';
import { Hour } from './hour';

export class Today {
  private clockIn: moment.Moment[];
  private clockOut: Array<moment.Moment | null> = [null];

  /**
   * Initializes the first clockIn/out of today
   *
   * @param clockIn
   * @param clockOut
   */
  constructor(clockIn: string, clockOut?: string) {
    this.clockIn = [this.getMomentObject(clockIn)];

    if (clockOut) {
      this.clockOut = [this.getMomentObject(clockOut)];
    }
  }

  /**
   * Returns the first clockIn of the day
   */
  public getClockInHour(): string {
    return this.clockIn[0].format('HH:mm');
  }

  /**
   * Returns the last clockOut time if exists as a new moment object
   */
  public getClockOutHour(): moment.Moment | null {
    const index = this.clockOut.length - 1;
    return this.clockOut[index] ? this.clockOut[index]!.clone() : null;
  }

  /**
   * Returns the calculated current hours using the last clockOut - clockIn hours
   */
  public getCurrentHours(): number {
    const index = this.clockIn.length - 1;

    // When last clock out exist the current hours would be 0
    if (this.clockOut[index]) return 0;

    const clockOut = this.clockOut[index] ? +(<moment.Moment>this.clockOut[index]) : +Date.now();
    return this.getHoursToday(clockOut, +this.clockIn[index]);
  }

  /**
   * Adds a new element in the clock in/out arrays
   * this is useful when a user does clock in/out multiple times
   * in a day
   *
   * @param clockIn
   * @param clockOut
   */
  public setTimeRow(clockIn: string, clockOut?: string): void {
    this.clockIn.push(this.getMomentObject(clockIn));

    if (clockOut) {
      this.clockOut.push(this.getMomentObject(clockOut));
    } else {
      this.clockOut.push(null);
    }
  }

  /**
   * Returns a new moment object with the time of the string passed
   *
   * @param time The string hours to set to the time obj
   * @param timeObj The time object reference, this must be an element from the clock in/out array
   */
  private getMomentObject(time: string): moment.Moment {
    const date = moment();
    const hour = new Hour(time);
    date.hours(hour.getHours());
    date.minutes(hour.getMinutes());

    return date;
  }

  private getHoursToday(clockOut: number, clockIn: number): number {
    return Number((Math.abs(clockOut - clockIn) / 36e5).toFixed(2));
  }
}
