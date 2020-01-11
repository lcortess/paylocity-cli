import * as moment from 'moment';

export class Hour {
  private raw: string;
  private hour: number;
  private minutes: number;

  /**
   * Hour must be in the format "hh:mm A" i.e. "10:02 AM", "01:59 PM"
   * @param hour
   */
  constructor(hour: string) {
    this.raw = hour;

    const date = moment(`1984-01-01 ${this.raw}`, 'YYYY-MM-DD LT', true);

    if (!date.isValid()) throw new Error(`Invalid hour ${this.raw}`);

    this.hour = date.get('hours');
    this.minutes = date.get('minutes');
  }

  public getHours(): number {
    return this.hour;
  }

  public getMinutes(): number {
    return this.minutes;
  }
}
