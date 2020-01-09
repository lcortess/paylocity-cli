import { Timesheet } from './models/timesheet';

const time: Timesheet = new Timesheet();
time
  .start()
  .then(() => {
    console.log(time.totalHours, time.today.getClockInHour());
    time.closePage();
  })
  .catch(error => {
    console.log(error);
  });
