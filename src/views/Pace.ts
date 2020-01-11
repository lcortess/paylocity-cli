import * as chalk from 'chalk';
import * as moment from 'moment';
import * as Table from 'cli-table3';
import { Timesheet } from '../models/timesheet';

export class Pace {
  private table: any;
  private totalHours: number;
  private currentHours: number;

  constructor() {
    this.totalHours = 0;
    this.currentHours = 0;
  }

  public loadTable(): Promise<Pace> {
    return new Promise((resolve, reject) => {
      const time: Timesheet = new Timesheet();

      time
        .start()
        .then(() => {
          console.log('ClockIn: ', time.today.getClockInHour());
          console.log('Total hours: ', time.totalHours);
          console.log('Today Hours: ', time.today.getCurrentHours());

          this.totalHours = time.totalHours;
          this.currentHours = time.today.getCurrentHours();
          time.closePage();
          this.createTable();
          resolve(this);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  public getTable(): string {
    return this.table.toString();
  }

  private createTable(): void {
    this.table = new Table({
      head: ['Pace', 'Hours', 'Diff', 'Leave by'],
    });

    this.setRow(7);
    this.setRow(8);
    this.setRow(9);
  }

  private setRow(hoursPerDay: number): void {
    const hoursPerWeek = hoursPerDay * 5;

    this.table.push([
      `Minimum (${hoursPerDay})`,
      `${this.totalHours} of ${hoursPerWeek}`,
      this.difference(this.totalHours, hoursPerWeek),
      this.getLeavingHour(this.totalHours, hoursPerDay),
    ]);
  }

  private difference(hours: number, comparison: number): string {
    let differenceOut: string = '';
    const difference = Number((hours - comparison).toFixed(2));

    switch (true) {
      case difference > 0:
        differenceOut = chalk.green(`+${this.formathours(difference)}`);
        break;
      case difference == 0:
        differenceOut = ` ${chalk.yellow(this.formathours(0))}`;
        break;
      case difference < 0:
        differenceOut = chalk.red(`-${this.formathours(Math.abs(difference))}`);
      default:
        difference;
    }

    return differenceOut;
  }

  private formathours(hours: number) {
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

  private getLeavingHour(current: number, total: number) {
    const date = moment();
    const targetToday = total * new Date().getDay();
    const diff = Number((targetToday - current).toFixed(2));

    date.add(diff, 'hours');

    return date.format('HH:mm');
  }
}
