import { Timesheet } from './models/timesheet';
import { Pace } from './views/Pace';

const time: Timesheet = new Timesheet();
time
  .start()
  .then(() => {
    console.log('ClockIn: ', time.today.getClockInHour());
    console.log('Total hours: ', time.totalHours);
    console.log('Today Hours: ', time.today.getCurrentHours());

    const pace = new Pace(time.totalHours, time.today.getCurrentHours());
    console.log(pace.getTable());

    time.closePage();
  })
  .catch(error => {
    console.log(error);
  });
