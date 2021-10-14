class Group {
  constructor(attendanceDay) {
    if (!/^(vendredi|dimanche)$/i.test(attendanceDay.trim()))
      throw new TypeError(
        `Attendance day must be "vendredi" or "dimanche". ${attendanceDay} given instead.`
      );

    this.attendanceDay = attendanceDay;
  }

  get emails() {
    const emailsSheet = SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName("Emails");

    const emailValues = emailsSheet
      .getRange(`D3:F${emailsSheet.getLastRow()}`)
      .getValues();

    return emailValues
      .reduce((acc, [email, day, active]) => {
        const isSameDay = day === this.attendanceDay;
        const isActive = active === "oui";
        return (isSameDay && isActive) ? acc.concat(email) : acc;
      }, [])
      .join();
  }

  get attendsOnFriday() {
    return this.attendanceDay === "vendredi";
  }

  get startHour() {
    return this.attendsOnFriday ? "20h30" : "10h30";
  }

  get endHour() {
    return this.attendsOnFriday ? "22h00" : "12h00";
  }

  get weekDay() {
    return this.attendsOnFriday ? 5 : 0;
  }

  get attendanceDate() {
    return new Date2().getNextWeekDay(this.weekDay);
  }

  get year() {
    return this.attendanceDate.year;
  }

  get dateInFrench() {
    return this.attendanceDate.toFrench();
  }

  notify() {
    const email = new Email(this);

    MailApp.sendEmail({
      to: this.emails,
      cc: "thionvilleechecs@gmail.com",
      subject: `cours ${this.attendanceDay}`,
      body: email.getAltBody(),
      htmlBody: email.getHTMLBody()
    });
  }
}