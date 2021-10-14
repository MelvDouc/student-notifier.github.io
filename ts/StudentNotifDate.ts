class StudentNotifDate extends Date {
  get year(): number {
    return this.getFullYear();
  }

  get month(): number {
    return this.getMonth();
  }

  get monthDay(): number {
    return this.getDate();
  }

  get sheet(): GoogleAppsScript.Spreadsheet.Sheet {
    const _sheet = SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName("Dates");
    if (!_sheet)
      throw new ReferenceError(`No "Dates" sheet was found.`);
    return _sheet;
  }

  get dates(): StudentNotifDate[] {
    return this.sheet
      .getRange(`D3:D${this.sheet.getLastRow()}`)
      .getValues()
      .flat()
      .map(date => new StudentNotifDate(date));
  }

  isValid(): boolean {
    return !isNaN(this.getTime());
  }

  equals(compareDate: StudentNotifDate): boolean {
    return this.year === compareDate.year
      && this.month === compareDate.month
      && this.monthDay === compareDate.monthDay;
  }

  addDays(total: number): StudentNotifDate {
    return new StudentNotifDate(this.year, this.month, this.monthDay + total);
  }

  getNextWeekDay(weekDay: number): StudentNotifDate {
    if (this.getDay() === weekDay)
      return this;
    return this.addDays(1).getNextWeekDay(weekDay);
  }

  getFirstMondayOfYear(): StudentNotifDate {
    const firstDayOfYear = new StudentNotifDate(this.year, 0, 1);
    let currentDate = firstDayOfYear;

    while (currentDate.getDay() !== 1)
      currentDate = currentDate.addDays(1);

    return currentDate;
  }

  getWeek(): number {
    let currentDate = this.getFirstMondayOfYear();
    let week = 1;

    while (!this.equals(currentDate)) {
      currentDate = currentDate.addDays(1);
      if (currentDate.getDay() === 1)
        week++;
    }

    return week;
  }

  isSendWeek(): boolean {
    return this.dates.some(date => {
      return date.getWeek() === this.getWeek();
    });
  }

  toFrench(): string {
    return new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long"
    }).format(this);
  }
}