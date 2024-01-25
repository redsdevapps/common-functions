enum PARAM {
  YEAR = 0,
  MONTH = 1,
  DATE = 2,
  HOURS = 3,
  MINUTES = 4,
  SECONDS = 5,
  MILLISECONDS = 6,
}

const locale =
  typeof window !== "undefined" ? window.localStorage.getItem("locale") : "es";
const DAYNAMES =
  locale === "es"
    ? ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"]
    : [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
const MONTHNAMES =
  locale === "es"
    ? [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
      ]
    : [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

/**
 * ABCD
 * @class
 * @classdesc Calendar functionalities.
 */
class Calendar {
  static YEAR: PARAM = PARAM.YEAR;
  static MONTH: PARAM = PARAM.MONTH;
  static DATE: PARAM = PARAM.DATE;
  static HOURS: PARAM = PARAM.HOURS;
  static MINUTES: PARAM = PARAM.MINUTES;
  static SECONDS: PARAM = PARAM.SECONDS;
  static MILLISECONDS: PARAM = PARAM.MILLISECONDS;

  year: number;
  month: number;
  date: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
  localDate: Date;

  /**
   * Creates a Calendar instance with the provided parameters.
   * @param  {number} year=1 Calendar Year
   * @param  {number} month=1 Calendar month of the year
   * @param  {number} date=1 Calenadar date of the month
   * @param  {number} hours=0 Calendar hours of the date
   * @param  {number} minutes=0 Calendar minutes of the hour
   * @param  {number} seconds=0 Calendar seconds of the minute
   * @param  {number} milliseconds=0 Calendar milliseconds of the second
   */
  constructor(
    year: number = 1,
    month: number = 1,
    date: number = 1,
    hours: number = 0,
    minutes: number = 0,
    seconds: number = 0,
    milliseconds: number = 0
  ) {
    this.year = year;
    this.month = month;
    this.date = date;
    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
    this.milliseconds = milliseconds;
    this.localDate = Calendar.getLocalDate(this.toISOString().substring(0, 23));
  }

  /**
   * Creates a Calendar instance from current Date
   * @returns Calendar instance
   */
  static getInstance = (): Calendar => {
    return Calendar.parse(Calendar.getLocalDate().toTimeString());
  };

  /**
   * Creates a Calendar instance from current date and the specified time parameters
   * @param  {} hours=0 Hours of the current date
   * @param  {} minutes=0 Minutes of the hour
   * @param  {} seconds=0 Seconds of the minute
   * @param  {} milliseconds=0 Milliseconds of the second
   * @returns Calendar instance
   */
  static calendarAt = (
    hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0
  ): Calendar => {
    const [year = "1", month = "1", date = "1"] = Calendar.getLocalDate()
      .toISOString()
      .split(/[^0-9]/);
    return new Calendar(
      parseInt(year),
      parseInt(month),
      parseInt(date),
      hours,
      minutes,
      seconds,
      milliseconds
    );
  };

  /**
   * Parses the stringDate parameter format ISO-8601 like into a Calendar instance
   * @param  {string} strDate? the String date to parse
   * @returns Calendar instance
   */
  static parse = (strDate: string): Calendar => {
    const [
      year = "1",
      month = "1",
      date = "1",
      hours = "0",
      minutes = "0",
      seconds = "0",
      milliseconds = "0",
    ] = strDate.split(/[^\d]/);
    return new Calendar(
      parseInt(year),
      parseInt(month),
      parseInt(date),
      parseInt(hours),
      parseInt(minutes),
      parseInt(seconds),
      parseInt(milliseconds)
    );
  };

  /**
   * Converts the current date paremeter into a javascript Date instance
   * @param  {number|string} date? millisencods date o string javascript Date, if undefined current Date is assigned
   * @returns Date the javascript Date instance
   */
  static getLocalDate = (date?: number | string): Date => {
    const today = date ? new Date(date) : new Date();
    const less = today.toString().indexOf("GMT-") > -1;
    return new Date(
      today.getTime() + today.getTimezoneOffset() * 60 * 1000 * (less ? -1 : 1)
    );
  };

  /**
   * Get the current Calendar instance time in milliseconds
   * @returns number Milliseconds
   */
  getTime(): number {
    return this.localDate.getTime();
  }

  /**
   * Checks if the current Calendar instance corresponds whit a leap year
   * @returns boolean if the current Calendar instance is a leap year
   */
  isLeap(): boolean {
    return (
      this.year % 4 === 0 && (this.year % 100 !== 0 || this.year % 400 === 0)
    );
  }

  /**
   * Converts the current Calendar instance to ISO-8601 String format yyyy-MM-ddTHH:mm:ss.SSSZ
   * @returns string formated date
   */
  toISOString(): string {
    return `${this.dateString()}T${this.time()}Z`;
  }

  /**
   * Converts the current Calendar instance to ISO-8601 String format yyyy-MM-ddTHH:mm:ss.SSSZ
   * @returns string formated date
   */
  toTimestampString(): string {
    return this.format("yyyy-MM-dd HH:mm:ss.SSSSSS");
  }

  /**
   * Converts the current Calendar instance to String format yyyy-MM-dd
   * @returns string formated date
   */
  dateString(): string {
    return this.format();
  }

  /**
   * Converts the current Calendar instance to String specified format
   * Pattern          | Component     | Examples
   * ---------------- | ------------- | ---------------------------------
   * yy\|yyyy         | Year          | yy=21, yyyy=2021
   * M\|MM\|MMM\|MMMM | Month         | M=6, MM=06, MMM=Jun, MMMM=June
   * d\|dd\|ddd\|dddd | Date          | d=1, dd=01, ddd=Sun, dddd=Sunday
   * h\|hh\|H\|HH     | Hours         | h=1, hh=1, H=13, HH=13 for 13 Hrs
   * a\|aa            | am/pm marker  | a=P, aa=PM for 13 Hrs
   * m\|mm            | Minutes       | m=1, mm=01
   * s\|ss            | Seconds       | s=1, ss=01
   * S\|SSS           | Milliseconds  | S=1, SSS=001
   * SSSSSS           | Microseconds  | SSSSSS=001000
   * other            | Literal       | T=T, Z=Z, -=-
   *
   * @param  {string} format='yyyy-MM-dd' pattern definition
   * @returns string
   */
  format(format: string = "yyyy-MM-dd"): string {
    let dateString = "";
    const parts = format.match(/(.)\1*/g);
    parts &&
      parts.length &&
      parts.forEach((part) => {
        switch (part) {
          case "yy":
            dateString += ("0000" + this.year).slice(-2);
            break;
          case "yyyy":
            dateString += ("0000" + this.year).slice(-4);
            break;
          case "M":
            dateString += this.month;
            break;
          case "MM":
            dateString += ("00" + this.month).slice(-2);
            break;
          case "MMM":
            dateString += this.monthName().substring(0, 3);
            break;
          case "MMMM":
            dateString += this.monthName();
            break;
          case "d":
            dateString += this.date;
            break;
          case "dd":
            dateString += ("00" + this.date).slice(-2);
            break;
          case "ddd":
            dateString += this.dayName().substring(0, 3);
            break;
          case "dddd":
            dateString += this.dayName();
            break;
          case "h":
            dateString += (this.hours % 12) + 1;
            break;
          case "hh":
            dateString += ("00" + (this.hours % 12 || 12)).slice(-2);
            break;
          case "H":
            dateString += this.hours;
            break;
          case "HH":
            dateString += ("00" + this.hours).slice(-2);
            break;
          case "a":
            dateString += this.hours < 12 ? "A" : "P";
            break;
          case "aa":
            dateString += this.hours < 12 ? "AM" : "PM";
            break;
          case "m":
            dateString += this.minutes;
            break;
          case "mm":
            dateString += ("00" + this.minutes).slice(-2);
            break;
          case "s":
            dateString += this.seconds;
            break;
          case "ss":
            dateString += ("00" + this.seconds).slice(-2);
            break;
          case "S":
            dateString += this.milliseconds;
            break;
          case "SSS":
            dateString += ("00" + this.milliseconds).slice(-3);
            break;
          case "SSSSSS":
            console.log(this.milliseconds);

            dateString += ("00" + this.milliseconds).slice(-3) + "000";
            break;
          default:
            dateString += part;
        }
      });
    return dateString;
  }

  /**
   * Returns the day of the week at the current Calendar instance, 0 for Sunday
   * @returns number the day of the week
   */
  weekDay(): number {
    return this.localDate.getUTCDay();
  }

  /**
   * Returns the curren Calendar instance day Name
   * @returns string Day name
   */
  dayName(): string {
    return DAYNAMES[this.localDate.getUTCDay()];
  }

  /**
   * Returns the curren Calendar instance month Name
   * @returns string Month name
   */
  monthName(): string {
    return MONTHNAMES[this.month - 1];
  }
  /**
   * Return the curren Calendar instance time in HH:mm(:ss)?() aa)?
   * @param  {} short=false If true time is HH:mm, else time is HH:mm:ss
   * @param  {} ampm=false If true adds am/pm marker
   * @returns string
   */
  time(short = false, ampm = false): string {
    return this.format(`HH:mm${short ? "" : ":ss"}${ampm ? " aa" : ""}`);
  }

  /**
   * Adds or substracts the indicated parameter to the current Calendar instance
   * @param  {PARAM} param Parameter to add or substract
   * @param  {number} intValue=0 amount to add or substract
   * @returns Calendar current Calendar instance updated.
   */
  add(param: PARAM, intValue: number): Calendar {
    switch (param) {
      case PARAM.MILLISECONDS:
        if (intValue) {
          const tmp = this.milliseconds + intValue;
          intValue = Math.floor(tmp / 1000);
          this.milliseconds = tmp % 1000;
        }
      case PARAM.SECONDS:
        if (intValue) {
          const tmp = this.seconds + intValue;
          intValue = Math.floor(tmp / 60);
          this.seconds = tmp % 60;
        }
      case PARAM.MINUTES:
        if (intValue) {
          const tmp = this.minutes + intValue;
          intValue = Math.floor(tmp / 60);
          this.minutes = tmp % 60;
        }
      case PARAM.HOURS:
        if (intValue) {
          const tmp = this.hours + intValue;
          intValue = Math.floor(tmp / 24);
          this.hours = tmp % 24;
        }
      case PARAM.DATE:
        if (intValue) {
          let MONTHDAYS = [
            0,
            31,
            this.isLeap() ? 29 : 28,
            31,
            30,
            31,
            30,
            31,
            31,
            30,
            31,
            30,
            31,
          ];
          let tmp = this.date + intValue;
          while (tmp > MONTHDAYS[this.month]) {
            tmp -= MONTHDAYS[this.month];
            if (++this.month > 12) {
              this.year++;
              this.month = 1;
              MONTHDAYS = [
                0,
                31,
                this.isLeap() ? 29 : 28,
                31,
                30,
                31,
                30,
                31,
                31,
                30,
                31,
                30,
                31,
              ];
            }
          }
          while (tmp < 0) {
            this.month--;
            if (this.month < 1) {
              this.year--;
              this.month = 12;
              MONTHDAYS = [
                0,
                31,
                this.isLeap() ? 29 : 28,
                31,
                30,
                31,
                30,
                31,
                31,
                30,
                31,
                30,
                31,
              ];
            }
            tmp = MONTHDAYS[this.month] - Math.abs(tmp);
          }
          this.date = tmp;
          intValue = 0;
        }
      case PARAM.MONTH:
        if (intValue) {
          let tmp = this.month + intValue;
          while (tmp > 12) {
            tmp -= 12;
            this.year++;
          }
          this.month = tmp;
          intValue = 0;
        }
      case PARAM.YEAR:
        if (intValue) {
          this.year += intValue;
        }
    }
    this.localDate = Calendar.getLocalDate(this.toISOString().substring(0, 23));
    return this;
  }
  /**
   * Clones the current Calendar instance
   * @returns Calendar instance
   */
  clone(): Calendar {
    return new Calendar(
      this.year,
      this.month,
      this.date,
      this.hours,
      this.minutes,
      this.seconds,
      this.milliseconds
    );
  }
}

export default Calendar;
