import * as chalk from 'chalk';
import * as moment from 'moment';
import * as Table from 'cli-table3';
import { Configuration } from '../models/configuration';

export class Pace {
  private table: any;
  private totalHours: number;
  private currentHours: number;
  private config: Configuration;
  private clockOut: moment.Moment | null;

  constructor(totalHours: number, currentHours: number, clockOut: moment.Moment | null) {
    this.clockOut = clockOut;
    this.totalHours = totalHours;
    this.currentHours = currentHours;
    this.config = new Configuration();

    this.createTable();
  }

  /**
   * Returns table as string
   */
  public getTable(): string {
    return this.table.toString();
  }

  /**
   * Creates table object with headers and
   * set the rows using class data
   */
  private createTable(): void {
    this.table = new Table({
      head: ['Pace', 'Hours', 'Diff', 'Leave by'].map(text => `${chalk.white.bold(text)}`),
    });

    this.setRow(7, 'Minimum');
    this.setRow(8, 'Standard');
    this.setRow(9, 'Overtime');
  }

  /**
   * Adds a new row to the table
   *
   * @param hoursPerDay The number of hours per day
   */
  private setRow(hoursPerDay: number, type: string): void {
    const goalToday = hoursPerDay * new Date().getDay();

    this.table.push([
      `${type} (${hoursPerDay})`,
      `${this.totalHours.toFixed(2)} of ${goalToday}`,
      this.difference(this.totalHours, goalToday),
      this.getLeavingHour(this.totalHours, hoursPerDay, this.clockOut),
    ]);
  }

  /**
   * Returns the differeence between the total hours and
   * the goal to reach
   *
   * @param hours Total hours
   * @param comparison The hours goal for today
   */
  private difference(hours: number, comparison: number): string {
    let differenceOut: string = '';
    const difference = Number((hours - comparison).toFixed(2));

    switch (true) {
      case difference > 0:
        differenceOut = chalk.green(`+${this.formatHours(difference)}`);
        break;
      case difference == 0:
        differenceOut = chalk.yellow(this.formatHours(0));
        break;
      case difference < 0:
        differenceOut = chalk.red(`-${this.formatHours(Math.abs(difference))}`);
      default:
        difference;
    }

    return differenceOut;
  }

  /**
   * Formats the number of hours to hours/minutes to be more readable
   *
   * @param hours Number of hours
   */
  private formatHours(hours: number): string {
    const h = Math.floor(hours);
    let m = String(((hours % 1) * 60).toFixed(0));
    if (m === '0') {
      m = '00';
    }
    if (Number(m) < 10 && Number(m) > 0) {
      m = `0${m}`;
    }
    return `${h}:${m}`;
  }

  /**
   * Return the leaving time today according to the hours passed
   *
   * @param current Current number of hours
   * @param total Hours to reach
   * @param clockOut When the user already did clockOut this object has the hour
   */
  private getLeavingHour(current: number, total: number, clockOut: moment.Moment | null) {
    const targetToday = total * new Date().getDay();
    const date = clockOut ? clockOut.clone() : moment();
    const diff = Number((targetToday - current).toFixed(2));

    date.add(diff, 'hours');

    return date.format(this.config.hourFormat);
  }
}
