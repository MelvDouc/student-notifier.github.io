class StudentNotifDate extends Date {
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
        const _sheet = SpreadsheetApp
            .getActiveSpreadsheet()
            .getSheetByName("Dates");
        if (!_sheet)
            throw new ReferenceError(`No "Dates" sheet was found.`);
        return _sheet;
    }
    get dates() {
        return this.sheet
            .getRange(`D3:D${this.sheet.getLastRow()}`)
            .getValues()
            .flat()
            .map(date => new StudentNotifDate(date));
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
        return new StudentNotifDate(this.year, this.month, this.monthDay + total);
    }
    getNextWeekDay(nextWeekDay) {
        const difference = nextWeekDay - this.getDay();
        if (difference === 0)
            return this;
        if (difference < 0)
            return this.addDays(7 + difference);
        return this.addDays(difference);
    }
    getWeek() {
        const firstDayOfYear = new StudentNotifDate(this.year, 0, 1);
        const firstMondayOfYear = firstDayOfYear.getNextWeekDay(1);
        let currentDate = firstMondayOfYear;
        let week = 1;
        while (!this.equals(currentDate)) {
            currentDate = currentDate.addDays(1);
            if (currentDate.getDay() === 1)
                week++;
        }
        return week;
    }
    isSendWeek() {
        return this.dates.some(date => {
            return date.getWeek() === this.getWeek();
        });
    }
    toFrench() {
        return new Intl.DateTimeFormat("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long"
        }).format(this);
    }
}
