const maxDate = (month = 0, year = 0) => {
  return !month || [1, 3, 5, 7, 8, 10, 12].includes(month)
    ? 31
    : [4, 6, 9, 11].includes(month)
    ? 30
    : year && ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)
    ? 29
    : 28;
};

export { maxDate };
