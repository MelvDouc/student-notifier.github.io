class Date2 extends Date {
  get year() {
    return this.getFullYear();
  }

  get month() {
    return this.getMonth();
  }

  get monthDay() {
    return this.getDate();
  }

  get sheet() {
    return SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName("Dates");
  }

  get dates() {
    return this.sheet
      .getRange(`D3:D${datesSheet.getLastRow()}`)
      .getValues()
      .flat()
      .map(date => new Date2(date));
  }

  isValid() {
    return !isNaN(this.getTime());
  }

  equals(compareDate) {
    return this.year === compareDate.year
      && this.month === compareDate.month
      && this.monthDay === compareDate.monthDay;
  }

  addDays(total) {
    return new Date2(this.year, this.month, this.monthDay + total);
  }

  getNextWeekDay(weekDay) {
    if (this.getDay() === weekDay)
      return this;
    return this.addDays(1).getNextWeekDay(weekDay);
  }

  getFirstMondayOfYear() {
    const firstDayOfYear = new Date2(this.year, 0, 1);
    let currentDate = firstDayOfYear;

    while (currentDate.getDay() !== 1)
      currentDate = currentDate.addDays(1);

    return currentDate;
  }

  getWeek() {
    let currentDate = this.getFirstMondayOfYear();
    let week = 1;

    while (!this.equals(currentDate)) {
      currentDate = currentDate.addDays(1);
      if (currentDate.getDay() === 1)
        week++;
    }

    return week;
  }

  isSendWeek() {
    return this.dates.some(date => date.getWeek() === this.getWeek());
  }

  toFrench() {
    return new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long"
    }).format(this);
  }
}