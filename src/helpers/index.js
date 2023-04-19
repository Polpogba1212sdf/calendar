import moment from "moment/moment";

export const isSelectedMonth = (day, today) => today.isSame(day, 'month')
export const isFirstOrLastDayOfMonth = day => moment().month(day.month()).startOf('month').isSame(day) ||
  moment().month(day.month()).endOf('month').startOf('day').isSame(day)
export const isDayContainCurrentEvent = (event, dayItem) =>
  event.date >= dayItem.format('X') && event.date <= dayItem.clone().endOf('day').format('X')