import { Timesheet } from './models/timesheet';

const time: Timesheet = new Timesheet();
time
  .loadPage()
  .then(() => {
    console.log(time.totalHours, time.clockIn);
    time.closePage();
  })
  .catch(error => {
    console.log(error);
  });
