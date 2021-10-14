function notifyStudents() {
  const date = new StudentNotifDate();
  if (!date.isSendWeek())
    return;

  const groups: StudentGroup[] = [
    new StudentGroup("vendredi"),
    new StudentGroup("dimanche")
  ];
  groups.forEach(group => group.notify());
}