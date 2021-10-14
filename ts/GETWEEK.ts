function GETWEEK(range: string) {
  const date = new StudentNotifDate(range);

  if (!date.isValid())
    throw new TypeError(`Invalid date: ${range}`);

  return date.getWeek();
}