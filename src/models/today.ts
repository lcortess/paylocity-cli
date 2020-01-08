import * as moment from 'moment';

export class Today {
  private clockIn: moment.Moment;

  constructor(clockIn: string) {
    console.log('CLOCKIN BEFORE', clockIn);
    this.clockIn = moment();
    this.setClockinTime(clockIn);
    console.log('CLOCKIN', this.clockIn.format('DD/MM/YYYY HH:mm'));
  }

  private setClockinTime(clockin: string) {
    const data = clockin.split(' ');
    const time = data[0].split(':');
    let hour = Number(time[0]);
    const minutes = Number(time[1]);

    if (data[1] === 'PM' && hour !== 12) {
      hour = +12;
    }

    this.clockIn.hour(hour);
    this.clockIn.minutes(minutes);
  }
}
