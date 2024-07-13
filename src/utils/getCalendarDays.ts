import { CalendarItem } from "../components/CustomCalendar";
import { WEEK_DAYS } from "../constants/CALENDAR";

const isFebruary28 = (date: Date) =>
  date.getMonth() === 1 && date.getFullYear() % 4 === 0;

const isFebruary29 = (date: Date) =>
  date.getMonth() === 1 && date.getFullYear() % 4 !== 0;

const isCoupleMonths = (date: Date) =>
  date.getMonth() === 3 ||
  date.getMonth() === 5 ||
  date.getMonth() === 8 ||
  date.getMonth() === 10;

const ad = Date.now();

export const getCalendarDays = (
  year: number,
  month: number
): {
  arr: CalendarItem[][];
  day: number;
  week: number;
} => {
  let date = new Date(ad);
  let week: number = 10;

  if (year) {
    date.setFullYear(year);
  }
  if (month) {
    date.setMonth(month);
  }
  let currentDay = date.getDay();
  let currentDate = date.getDate();
  date.setDate(1);

  let day = date.getDay();

  if (currentDay === 0) {
    currentDay = 6;
  } else {
    currentDay = currentDay - 1;
  }

  if (day === 0) {
    day = 6;
  } else {
    day = day - 1;
  }

  let dayCount = 1;
  let weekLength = 5;
  let monthLength = 31;

  if (isCoupleMonths(date)) {
    monthLength = 30;
  }

  if (isFebruary29(date)) {
    monthLength = 29;
  }

  if (isFebruary28(date)) {
    monthLength = 28;

    if (day === 0) {
      weekLength = 4;
    }
  }

  if ((day === 5 || day === 6) && date.getMonth() !== 1) {
    if (day === 6) {
      weekLength = 6;
    } else {
      if (monthLength === 31) {
        weekLength = 6;
      }
    }
  }

  let arr: CalendarItem[][] = [];

  for (let i = 0; i < weekLength; i++) {
    let daysArr = [];

    for (let j = 0; j < 7; j++) {
      let value: any = {};

      if (dayCount === currentDate) {
        week = i;
      }

      if ((i === 0 && j < day) || dayCount > monthLength) {
        value = null;
      } else {
        value.day = dayCount;
        value.text = WEEK_DAYS[j];

        if (dayCount < currentDate) {
          value.past = true;
        }
        dayCount++;
      }

      daysArr.push(value);
    }

    arr.push(daysArr);
  }

  return { arr, day: currentDay, week };
};
