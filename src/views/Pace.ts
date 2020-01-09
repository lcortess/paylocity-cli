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
    this.table = new Table({
      head: ['Pace', 'Hours', 'Diff', 'Leave by'],
    });

    this.setRow(7);
    this.setRow(8);
    this.setRow(9);
  }

  public getTable(): string {
    return this.table.toString();
  }

  private setRow(hoursPerDay: number): void {
    const hoursPerWeek = hoursPerDay * 5;

    this.table.push([
      `Minimum (${hoursPerDay})`,
      `${this.totalHours} of ${hoursPerWeek}`,
      this.difference(this.totalHours, hoursPerWeek),
      this.getLeavingHour(this.currentHours, hoursPerDay),
    ]);
  }

  private difference(hours: number, comparison: number): string {
    let differenceOut: string = '';
    let difference = Number((hours - comparison).toFixed(2));

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
    if (m === '0') m = '00';
    if (Number(m) < 10 && Number(m) > 0) m = `0${m}`;
    return `${h}:${m}`;
  }

  private getLeavingHour(current: number, total: number) {
    const date = moment();
    date.add(total - current, 'hours');

    return date.format('HH:mm');
  }
}
