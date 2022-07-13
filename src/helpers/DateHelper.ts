import {
  eachWeekOfInterval,
  lastDayOfWeek,
  differenceInDays,
  addDays,
  addMonths,
  format,
  addYears,
} from 'date-fns';
import locale from 'date-fns/locale/pt-BR';

export interface IDate {
  isShow: boolean;
  date: Date;
}

export interface IMonth {
  label: string;
  date: Date;
  days: IDate[];
}

export interface IYear {
  label: string;
  date: Date;
  months: [
    Date,
    Date,
    Date,
    Date,
    Date,
    Date,
    Date,
    Date,
    Date,
    Date,
    Date,
    Date,
  ];
}

class DateHelper {
  public getToday(): Date {
    const today = new Date();

    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);

    return today;
  }

  public getYesterday(): Date {
    const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);

    yesterday.setHours(0);
    yesterday.setMinutes(0);
    yesterday.setSeconds(0);
    yesterday.setMilliseconds(0);

    return yesterday;
  }

  public getStartOfWeek(date: Date, workingDays = true): Date {
    const first = date.getDate() - date.getDay();

    const diff = first + (date.getDay() === 0 ? -6 : 1);

    const startOfWeek = new Date(date.setDate(workingDays ? diff : diff - 1));

    return startOfWeek;
  }

  public getEndOfWeek(date: Date, workingDays = true): Date {
    const first = date.getDate() - date.getDay();
    const last = workingDays ? first + 5 : first + 6;

    const endOfWeek = new Date(date.setDate(last));

    return endOfWeek;
  }

  public getThisWeek(workingDays = true): [Date, Date] {
    const today = this.getToday();

    const startOfWeek = this.getStartOfWeek(today, workingDays);
    const endOfWeek = this.getEndOfWeek(today, workingDays);

    return [startOfWeek, endOfWeek];
  }

  public getLastSevenDays(): [Date, Date] {
    const today = this.getToday();

    const init = new Date();

    init.setDate(today.getDate() - 6);

    return [init, today];
  }

  public getLastWeek(workingDays = true): [Date, Date] {
    const today = this.getToday();

    const lastDayOfLastWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7,
    );

    const startDayOfLastWeek = this.getStartOfWeek(
      lastDayOfLastWeek,
      workingDays,
    );

    const endDayOfLastWeek = this.getEndOfWeek(lastDayOfLastWeek, workingDays);

    return [startDayOfLastWeek, endDayOfLastWeek];
  }

  public getLastFourteenDays(): [Date, Date] {
    const today = this.getToday();

    const init = new Date();

    init.setDate(today.getDate() - 6 * 2 - 1);

    return [init, today];
  }

  public getThisMonth(): [Date, Date] {
    const today = this.getToday();

    const first = new Date(today.getFullYear(), today.getMonth(), 1);
    const last = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    return [first, last];
  }

  public getLastThirtyDays(): [Date, Date] {
    const today = this.getToday();

    const init = new Date();

    init.setDate(today.getDate() - 29);

    return [init, today];
  }

  public getLastMonth(): [Date, Date] {
    const today = this.getToday();

    const first = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const last = new Date(today.getFullYear(), today.getMonth(), 0);

    return [first, last];
  }

  public getFirstAndLastDatesFromDate(date: Date): [Date, Date] {
    const first = new Date(date.getFullYear(), date.getMonth(), 1);
    const last = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    return [first, last];
  }

  public getCalendarDates(day: Date) {
    const array: IDate[] = [];

    const [first, last] = this.getFirstAndLastDatesFromDate(day);

    const weeks = eachWeekOfInterval({
      start: new Date(first.getFullYear(), first.getMonth(), first.getDate()),
      end: new Date(last.getFullYear(), last.getMonth(), last.getDate()),
    });

    const from = weeks[0];
    const to = lastDayOfWeek(weeks[weeks.length - 1]);
    const diff = differenceInDays(to, from);

    for (let i = 0; i <= diff; i++) {
      const date = addDays(from, i);

      if (date.getMonth() === first.getMonth()) {
        array.push({ isShow: true, date });
      } else {
        array.push({ isShow: false, date });
      }
    }

    return array;
  }

  public getMonths(start: Date, quantity = 3): IMonth[] {
    const months: IMonth[] = [];

    for (let i = 0; i < quantity; i++) {
      const date = addMonths(start, i);

      months.push({
        label: format(date, 'MMMM yyyy', { locale }),
        date,
        days: this.getCalendarDates(date),
      });
    }

    return months;
  }

  public getYears(start: Date, quantity = 3): IYear[] {
    const years: IYear[] = [];

    for (let i = 0; i <= quantity; i++) {
      const date = addYears(start, i);

      years.push({
        label: format(date, 'yyyy', { locale }),
        date,
        months: [
          new Date(date.getFullYear(), 0, date.getDate()),
          new Date(date.getFullYear(), 1, date.getDate()),
          new Date(date.getFullYear(), 2, date.getDate()),
          new Date(date.getFullYear(), 3, date.getDate()),
          new Date(date.getFullYear(), 4, date.getDate()),
          new Date(date.getFullYear(), 5, date.getDate()),
          new Date(date.getFullYear(), 6, date.getDate()),
          new Date(date.getFullYear(), 7, date.getDate()),
          new Date(date.getFullYear(), 8, date.getDate()),
          new Date(date.getFullYear(), 9, date.getDate()),
          new Date(date.getFullYear(), 10, date.getDate()),
          new Date(date.getFullYear(), 11, date.getDate()),
        ],
      });
    }

    return years;
  }
}

const INSTANCE = new DateHelper();

export { INSTANCE as DateHelper };
