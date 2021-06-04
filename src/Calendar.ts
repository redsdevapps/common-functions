const CONSTS = {
  YEAR: 0,
  MONTH: 1,
  DATE: 2,
  HOURS: 3,
  MINUTES: 4,
  SECONDS: 5,
  MILLISECONDS: 6
}

const locale = window.localStorage.getItem('locale');
const DAYNAMES = locale === 'es'
  ? ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
  : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHNAMES = locale === 'es'
  ? ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export class Calendar {
  year: number;
  month: number;
  date: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  localDate: Date;

  constructor(year = 1, month = 1, date = 1, hours = 0, minutes = 0, seconds = 0, milliseconds = 0) {
    this.year = year;
    this.month = month;
    this.date = date;
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
    this.milliseconds = milliseconds;
    this.localDate = Calendar.getLocalDate(this.toISOString().substring(0, 23));
  }

  getTime() {
    return this.localDate.getTime();
  }

  isLeap() {
    return (this.year % 4 === 0) && ((this.year % 100 !== 0) || (this.year % 400 === 0));
  }

  toISOString() {
    return `${this.dateString()}T${this.time()}Z`;
  };

  dateString() {
    return this.format();
  }

  format(format = 'yyyy-MM-dd') {
    let dateString = '';
    const parts = format.match(/(.)\1*/g);
    parts && parts.length && parts.forEach(part => {
      switch (part) {
        case 'yy':
          dateString += ('0000' + this.year).slice(-2);
          break;
        case 'yyyy':
          dateString += ('0000' + this.year).slice(-4);
          break;
        case 'M':
          dateString += this.month;
          break;
        case 'MM':
          dateString += ('00' + this.month).slice(-2);
          break;
        case 'd':
          dateString += this.date;
          break;
        case 'dd':
          dateString += ('00' + this.date).slice(-2);
          break;
        case 'D':
          dateString += this.dayName();
          break;
        case 'DDD':
          dateString += this.dayName().substring(0, 3);
          break;
        case 'M':
          dateString += this.monthName();
          break;
        case 'MMM':
          dateString += this.monthName().substring(0, 3);
          break;
        case 'h':
          dateString += (this.hours % 12) + 1;
          break;
        case 'hh':
          dateString += ('00' + ((this.hours % 12) || 12)).slice(-2);
          break;
        case 'H':
          dateString += this.hours;
          break;
        case 'HH':
          dateString += ('00' + this.hours).slice(-2);
          break;
        case 'a':
          dateString += this.hours < 12 ? 'A' : 'P';
          break;
        case 'aa':
          dateString += this.hours < 12 ? 'AM' : 'PM';
          break;
        case 'm':
          dateString += this.minutes;
          break;
        case 'mm':
          dateString += ('00' + this.minutes).slice(-2);
          break;
        case 's':
          dateString += this.seconds;
          break;
        case 'ss':
          dateString += ('00' + this.seconds).slice(-2);
          break;
        case 'S':
          dateString += this.milliseconds;
          break;
        case 'SSS':
          dateString += ('00' + this.milliseconds).slice(-2);
          break;
        default:
          return dateString += part;
      }
    });
    return dateString;
  }

  dateLocal() {
    return `${this.dayName()}, ${this.date} ${this.monthName()}, ${('0000' + this.year).slice(-4)}`;
  };

  weekDay() {
    return this.localDate.getUTCDay();
  }

  dayName() {
    return DAYNAMES[this.localDate.getUTCDay()];
  }

  monthName() {
    return MONTHNAMES[this.month - 1];
  }

  time(short = false, ampm = false) {
    return short
      ? ampm
        ? `${('00' + (this.hours === 0 ? 12 : this.hours - (this.hours > 12 ? 12 : 0))).slice(-2)}:${('00' + this.minutes).slice(-2)} ${this.hours >= 12 ? 'PM' : 'AM'}`
        : `${('00' + this.hours).slice(-2)}:${('00' + this.minutes).slice(-2)}`
      : `${('00' + this.hours).slice(-2)}:${('00' + this.minutes).slice(-2)}:${('00' + this.seconds).slice(-2)}.${('000' + this.milliseconds).slice(-3)}`;
  };

  add(type: number, intValue: number = 0) {
    switch (type) {
      case (CONSTS.MILLISECONDS):
        if (intValue) {
          const tmp = this.milliseconds + intValue;
          intValue = Math.floor(tmp / 1000);
          this.milliseconds = tmp % 1000;
        }
      case (CONSTS.SECONDS):
        if (intValue) {
          const tmp = this.seconds + intValue;
          intValue = Math.floor(tmp / 60);
          this.seconds = tmp % 60;
        }
      case (CONSTS.MINUTES):
        if (intValue) {
          const tmp = this.minutes + intValue;
          intValue = Math.floor(tmp / 60);
          this.minutes = tmp % 60;
        }
      case (CONSTS.HOURS):
        if (intValue) {
          const tmp = this.hours + intValue;
          intValue = Math.floor(tmp / 24);
          this.hours = tmp % 24;
        }
      case (CONSTS.DATE):
        if (intValue) {
          let MONTHDAYS = [0, 31, this.isLeap() ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
          let tmp = this.date + intValue;
          while (tmp > MONTHDAYS[this.month]) {
            tmp -= MONTHDAYS[this.month];
            if (++this.month > 12) {
              this.year++;
              this.month = 1;
              MONTHDAYS = [0, 31, this.isLeap() ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            }
          }
          while (tmp < 0) {
            this.month--;
            if (this.month < 1) {
              this.year--;
              this.month = 12;
              MONTHDAYS = [0, 31, this.isLeap() ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            }
            tmp = MONTHDAYS[this.month] - Math.abs(tmp);
          }
          this.date = tmp;
          intValue = 0;
        }
      case (CONSTS.MONTH):
        if (intValue) {
          let tmp = this.month + intValue;
          while (tmp > 12) {
            tmp -= 12;
            this.year++;
          }
          this.month = tmp;
          intValue = 0;
        }
      case (CONSTS.YEAR):
        if (intValue) {
          this.year += intValue;
        }
    }
    this.localDate = Calendar.getLocalDate(this.toISOString().substring(0, 23));
    return this;
  }

  static getLocalDate = (date?: number | string) => {
    const today = date ? new Date(date) : new Date();
    const less = today.toString().indexOf('GMT-') > -1;
    return new Date(today.getTime() + (today.getTimezoneOffset() * 60 * 1000 * (less ? -1 : 1)));
  }

  static getInstance = () => {
    return Calendar.parse();
  }

  static calendarAtTime = (hours = 0, minutes = 0, seconds = 0, milliseconds = 0) => {
    const [year = '1', month = '1', date = '1'] = Calendar.getLocalDate().toISOString().split(/[^0-9]/);
    return new Calendar(parseInt(year), parseInt(month), parseInt(date), hours, minutes, seconds, milliseconds);
  }

  static parse = (strDate?: string) => {
    const [year = '1', month = '1', date = '1', hours = '0', minutes = '0', seconds = '0', milliseconds = '0'] = (strDate || Calendar.getLocalDate().toISOString()).split(/[^0-9]/);
    return new Calendar(parseInt(year), parseInt(month), parseInt(date), parseInt(hours), parseInt(minutes), parseInt(seconds), parseInt(milliseconds));
  }

  static parseTimeM = (time: string) => {
    const parts = time.split(/[^0-9APM]+/);
    let hours = parts[1] ? parseInt(parts[0].replace(/^0*/, '') || '0') : 0;
    const minutes = parts[1] ? parseInt(parts[1].replace(/^0*/, '') || '0') : 0;
    if (parts[2]) {
      hours = parts[2] === 'AM' && hours === 12 ? 0 : parts[2] === 'PM' && hours < 12 ? hours + 12 : hours;
    }
    return `${('00' + hours).slice(-2)}:${('00' + minutes).slice(-2)}`
  }

  static clone = (calendar: Calendar) => {
    const { year = 1, month = 1, date = 1, hours = 0, minutes = 0, seconds = 0, milliseconds = 0 } = calendar;
    return new Calendar(year, month, date, hours, minutes, seconds, milliseconds);
  }

  static toISOString = (calendar?: Calendar) => {
    return (calendar)
      ? calendar.toISOString()
      : Calendar.getInstance().toISOString();
  }

  static YEAR = CONSTS.YEAR;
  static MONTH = CONSTS.MONTH;
  static DATE = CONSTS.DATE;
  static HOURS = CONSTS.HOURS;
  static MINUTES = CONSTS.MINUTES;
  static SECONDS = CONSTS.SECONDS;
  static MILLISECONDS = CONSTS.MILLISECONDS;
}