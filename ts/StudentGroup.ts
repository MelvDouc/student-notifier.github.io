type AttendanceDay = "vendredi" | "dimanche";

class StudentGroup {
  private attendanceDay: AttendanceDay;

  constructor(attendanceDay: AttendanceDay) {
    this.attendanceDay = attendanceDay;
  }

  get emails(): string {
    const emailsSheet = SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName("Emails");

    if (!emailsSheet)
      throw new ReferenceError(`No "Emails" sheet was found.`);

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

  get startHour(): string {
    return this.attendsOnFriday ? "20h30" : "10h30";
  }

  get endHour(): string {
    return this.attendsOnFriday ? "22h00" : "12h00";
  }

  get weekDay(): number {
    return this.attendsOnFriday ? 5 : 0;
  }

  get attendanceDate() {
    return new StudentNotifDate().getNextWeekDay(this.weekDay);
  }

  get year() {
    return this.attendanceDate.year;
  }

  get dateInFrench() {
    return this.attendanceDate.toFrench();
  }

  notify() {
    const email = new StudentNotifEmail(this);

    MailApp.sendEmail({
      to: this.emails,
      cc: "thionvilleechecs@gmail.com",
      subject: `cours ${this.attendanceDay}`,
      body: email.getAltBody(),
      htmlBody: email.getHTMLBody()
    });
  }
}