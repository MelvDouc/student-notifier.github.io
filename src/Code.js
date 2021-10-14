function notifyStudents() {
  const date = new Date2();
  if (!date.isSendWeek())
    return;

  const groups = [
    new Group("vendredi"),
    new Group("dimanche")
  ];
  groups.forEach(group => group.notify());
}