function GETWEEK(range: string): number {
  const date = new StudentNotifDate(range);

  if (!date.isValid())
    throw new TypeError(`Invalid date: ${range}`);

  return date.getWeek();
}