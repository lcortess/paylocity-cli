const os = require("os");
const chalk = require("chalk");
const moment = require("moment");
const Table = require("cli-table3");
const puppeteer = require("puppeteer");
require("dotenv").config({path: `${os.homedir()}/.paylocity`});

const URI = "https://webtime2.paylocity.com/WebTime/Employee/Timesheet";

function getPage() {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto("https://access.paylocity.com/");

      await page.waitFor("#CompanyId");
      await page.evaluate(
        (company, user, password, fingerprint) => {
          document.querySelector("#Username").value = user;
          document.querySelector("#CompanyId").value = company;
          document.querySelector("#Password").value = password;
          document.querySelector(
            "#PaylocityFingerprintData"
          ).value = fingerprint;
        },
        process.env.PAYLOCITY_COMPANY,
        process.env.PAYLOCITY_USER,
        process.env.PAYLOCITY_PASSWORD,
        process.env.PAYLOCITY_FINGERPRINT
      );

      await page.click('button[type="submit"]');

      await page.waitForSelector(".unav-main-menu-title");
      await page.click(".unav-main-menu-title");

      const text = await page.evaluate(() => {
        const anchor = document.querySelector(".unav-main-menu-title");
        return anchor.textContent;
      });

      await page.goto(URI);
      await page.waitForSelector("#GroupTotals");
      const data = await page.evaluate(() => {
        const today = new Date();
        return {
          totalHours: document
            .querySelector("#GroupTotals")
            .querySelector("tbody td")
            .firstChild.textContent.trim()
            .replace(" hrs", ""),
          hoursToday: document
            .querySelector(
              `#TimesheetContainer #Timesheet > tbody > #TimeSheet_${today.getDay() -
              1}_`
            )
            .querySelector("table tr")
            .children[2].children[0].textContent.trim()
            .replace(" AM", "")
            .split(":")
        };
      });

      await browser.close();

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

function getLeavingHour(current, total) {
  const date = moment();
  date.add(total - current, "hours");

  return date.format("HH:mm");
}

function formathours(hours) {
  const h = Math.floor(hours);
  let m = String(((hours % 1) * 60).toFixed(0));
  if (m === "0") m = "00";
  if (Number(m) < 10 && Number(m) > 0) m = `0${m}`;
  return `${h}:${m}`;
}

function difference(hours, comparison) {
  let difference = Number((hours - comparison).toFixed(2));
  let differenceOut = "";

  switch (true) {
    case difference > 0:
      differenceOut = chalk.green(`+${formathours(difference)}`);
      break;
    case difference == 0:
      differenceOut = ` ${chalk.yellow(formathours(0))}`;
      break;
    case difference < 0:
      differenceOut = chalk.red(`-${formathours(Math.abs(difference))}`);
    default:
      difference;
  }

  return differenceOut;
}

/**
 * Convert hours and minutes to a string.
 *
 * @param {float} hours
 * @param {float} minutes
 * @returns {string} In format HH:mm
 */
function formatTimeToString(hours, minutes) {
  return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0')
}

async function init() {
  try {
    const today = new Date();
    const data = await getPage();
    let hoursToday = data.hoursToday;
    let totalHours = data.totalHours;

    const clockIn = new Date();
    clockIn.setHours(hoursToday[0]);
    clockIn.setMinutes(hoursToday[1]);
    const currentHours = Math.abs(today - clockIn) / 36e5;
    totalHours = (Number(currentHours) + Number(totalHours)).toFixed(2);

    if ((5 - today.getDay()) > 0) {
      let total_hours_by_now = today.getDay() * 9;
      let pending = total_hours_by_now - currentHours;
      let pending_minutes = parseInt((pending % 1) * 60);
      let pending_hours = parseInt(pending);
      console.log('Today hrs pending: ', formatTimeToString(pending_hours, pending_minutes));
    }

    console.log("TODAY HOURS", currentHours);

    const table = new Table({
      head: ["Pace", "Hours", "Diff", "Leave by"]
    });

    table.push([
      "Minimum (7)",
      `${totalHours} of 35`,
      difference(totalHours, 35),
      getLeavingHour(currentHours, 7)
    ]);

    table.push([
      "Minimum (8)",
      `${totalHours} of 40`,
      difference(totalHours, 40),
      getLeavingHour(currentHours, 8)
    ]);

    table.push([
      "Minimum (9)",
      `${totalHours} of 45`,
      difference(totalHours, 45),
      getLeavingHour(currentHours, 9)
    ]);

    console.log("Total Hours", totalHours);
    console.log(table.toString());
  } catch (error) {
    console.log("ERROR", error);
  }
}

init();
