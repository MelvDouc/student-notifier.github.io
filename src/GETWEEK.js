function GETWEEK(range) {
  const date = new Date2(range);
  
  if (!date.isValid())
    throw new TypeError(`Invalid date: ${range}`);

  return date.getWeek();
}