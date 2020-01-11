import * as chalk from 'chalk';
import * as moment from 'moment';
import * as Table from 'cli-table3';

export class Pace {
  private table: any;
  private totalHours: number;
  private currentHours: number;

  constructor(totalHours: number, currentHours: number) {
    this.totalHours = totalHours;
    this.currentHours = currentHours;

    console.log('Total hours: ', totalHours);
    console.log('Today Hours: ', currentHours);
    this.createTable();
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
    const goalToday = hoursPerDay * (new Date().getDay() - 1);

    this.table.push([
      `Minimum (${hoursPerDay})`,
      `${this.totalHours.toFixed(2)} of ${goalToday}`,
      this.difference(this.totalHours, goalToday),
      this.getLeavingHour(this.totalHours, hoursPerDay),
    ]);
  }

  private difference(hours: number, comparison: number): string {
    let differenceOut: string = '';
    const difference = Number((hours - comparison).toFixed(2));

    switch (true) {
      case difference > 0:
        differenceOut = chalk.green(`+${this.formatHours(difference)}`);
        break;
      case difference == 0:
        differenceOut = ` ${chalk.yellow(this.formatHours(0))}`;
        break;
      case difference < 0:
        differenceOut = chalk.red(`-${this.formatHours(Math.abs(difference))}`);
      default:
        difference;
    }

    return differenceOut;
  }

  private formatHours(hours: number) {
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
