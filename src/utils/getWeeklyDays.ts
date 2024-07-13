import { CalendarItem } from "./../components/CustomCalendar";
import { WEEK_DAYS } from "../constants/CALENDAR";

export const getWeeklyDays = (d: Date) => {
  let arr: CalendarItem[] = [];
  let index = d.getDay();

  if (index === 0) {
    index = 6;
  } else {
    index = index - 1;
  }

  arr[index] = {
    day: d.getDate(),
    text: WEEK_DAYS[index],
  };

  let bDate = new Date(d);

  for (let i = index - 1; i >= 0; i--) {
    bDate.setDate(bDate.getDate() - 1);
    arr[i] = {
      day: bDate.getDate(),
      text: WEEK_DAYS[i],
    };
  }

  let tDate = new Date(d);

  for (let i = index + 1; i < 7; i++) {
    tDate.setDate(tDate.getDate() + 1);
    arr[i] = {
      day: tDate.getDate(),
      text: WEEK_DAYS[i],
    };
  }

  return arr;
};
