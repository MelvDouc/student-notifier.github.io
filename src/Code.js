function notifyStudents() {
    const date = new StudentNotifDate();
    if (!date.isSendWeek())
        return;
    const groups = [
        new StudentGroup("vendredi"),
        new StudentGroup("dimanche")
    ];
    groups.forEach(group => group.notify());
}
